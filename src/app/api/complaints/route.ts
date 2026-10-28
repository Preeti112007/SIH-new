import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAuditEvent } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bureau = searchParams.get('bureau');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');
    const refNo = searchParams.get('refNo');

    const where: any = {};
    if (bureau && bureau !== 'ALL') where.bureau = bureau;
    if (status && status !== 'ALL') where.status = status;
    if (priority && priority !== 'ALL') where.priorityLevel = priority;
    if (refNo) where.refNo = refNo;

    if (search) {
      where.OR = [
        { refNo: { contains: search } },
        { subject: { contains: search } },
        { complainantName: { contains: search } },
        { institution: { name: { contains: search } } },
      ];
    }

    const complaints = await prisma.complaint.findMany({
      where,
      include: {
        institution: {
          include: {
            trust: true,
          },
        },
        feeRecords: true,
        notes: {
          orderBy: { createdAt: 'desc' },
        },
        coordinationGroup: true,
      },
      orderBy: { submissionDate: 'desc' },
    });

    return NextResponse.json({ success: true, data: complaints });
  } catch (error: any) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, refNo, status, priorityScore, priorityLevel, actorName, actorRole, actionNote } = body;

    if (!id && !refNo) {
      return NextResponse.json({ success: false, error: 'Complaint ID or RefNo required' }, { status: 400 });
    }

    const where = id ? { id } : { refNo };
    const updated = await prisma.complaint.update({
      where,
      data: {
        ...(status && { status }),
        ...(priorityScore !== undefined && { priorityScore }),
        ...(priorityLevel && { priorityLevel }),
      },
      include: {
        institution: true,
      },
    });

    // Record audit event
    await logAuditEvent({
      actorName: actorName || 'Dr. R. K. Sharma',
      actorRole: actorRole || 'Officer',
      action: 'STATUS_UPDATED',
      caseRef: updated.refNo,
      details: `Complaint status updated to "${status || updated.status}". ${actionNote || ''}`,
      complaintId: updated.id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating complaint:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
