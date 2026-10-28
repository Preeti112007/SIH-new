import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAuditEvent } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const actorRole = searchParams.get('actorRole');
    const caseRef = searchParams.get('caseRef');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    const where: any = {};
    if (action && action !== 'ALL') where.action = action;
    if (actorRole && actorRole !== 'ALL') where.actorRole = actorRole;
    if (caseRef) where.caseRef = { contains: caseRef };

    if (search) {
      where.OR = [
        { details: { contains: search } },
        { actorName: { contains: search } },
        { caseRef: { contains: search } },
      ];
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: {
        complaint: {
          select: {
            refNo: true,
            bureau: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, count: logs.length, data: logs });
  } catch (error: any) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await logAuditEvent({
      actorName: body.actorName || 'Dr. R. K. Sharma',
      actorRole: body.actorRole || 'Officer',
      action: body.action || 'CASE_OPENED',
      caseRef: body.caseRef,
      details: body.details,
      complaintId: body.complaintId,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    console.error('Error recording audit log:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
