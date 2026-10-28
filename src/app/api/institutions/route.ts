import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const city = searchParams.get('city');

    const where: any = {};
    if (city && city !== 'ALL') where.city = city;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { aicteId: { contains: search } },
        { pinCode: { contains: search } },
        { address: { contains: search } },
        { trust: { name: { contains: search } } },
      ];
    }

    const institutions = await prisma.institution.findMany({
      where,
      include: {
        trust: true,
        complaints: {
          select: {
            id: true,
            refNo: true,
            bureau: true,
            category: true,
            status: true,
            priorityLevel: true,
          },
        },
        feeRecords: {
          select: {
            id: true,
            receiptNo: true,
            differenceAmount: true,
            differencePercent: true,
            reviewStatus: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, data: institutions });
  } catch (error: any) {
    console.error('Error fetching institutions:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
