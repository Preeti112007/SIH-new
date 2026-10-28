import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const trusts = await prisma.trust.findMany({
      include: {
        institutions: {
          include: {
            complaints: {
              select: {
                id: true,
                refNo: true,
                bureau: true,
                category: true,
                status: true,
                priorityScore: true,
                priorityLevel: true,
                submissionDate: true,
              },
            },
            feeRecords: {
              select: {
                receiptNo: true,
                differenceAmount: true,
                differencePercent: true,
                reviewStatus: true,
              },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const formatted = trusts.map((t) => {
      const allComplaints = t.institutions.flatMap((i) => i.complaints);
      const openComplaints = allComplaints.filter((c) => c.status !== 'Resolved');
      const resolvedComplaints = allComplaints.filter((c) => c.status === 'Resolved');

      return {
        id: t.id,
        trustId: t.trustId,
        name: t.name,
        registrationNo: t.registrationNo,
        registeredState: t.registeredState,
        registeredCity: t.registeredCity,
        trusteeNames: t.trusteeNames,
        institutionCount: t.institutions.length,
        totalComplaints: allComplaints.length,
        openComplaintsCount: openComplaints.length,
        resolvedComplaintsCount: resolvedComplaints.length,
        hasAnomalies: t.institutions.some((i) => i.feeRecords.some((f) => f.differenceAmount > 0)),
        institutions: t.institutions.map((i) => ({
          id: i.id,
          aicteId: i.aicteId,
          name: i.name,
          category: i.category,
          address: i.address,
          city: i.city,
          state: i.state,
          pinCode: i.pinCode,
          status: i.status,
          annualTuitionFee: i.annualTuitionFee,
          complaints: i.complaints,
          feeRecords: i.feeRecords,
        })),
      };
    });

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error('Error fetching trust knowledge graph data:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
