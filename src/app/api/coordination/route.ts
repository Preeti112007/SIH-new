import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAuditEvent } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const groupRef = searchParams.get('groupRef') || 'CC-2026-BLR-089';

    const group = await prisma.coordinationGroup.findUnique({
      where: { groupRef },
      include: {
        complaints: {
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
          },
          orderBy: { submissionDate: 'asc' },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!group) {
      return NextResponse.json({ success: false, error: 'Coordination group not found' }, { status: 404 });
    }

    // Build unified chronological timeline
    const timelineEvents: Array<{
      id: string;
      date: string;
      source: string;
      bureau: string;
      eventType: string;
      title: string;
      description: string;
      caseRef: string;
    }> = [];

    // Add complaint submission events
    group.complaints.forEach((c) => {
      timelineEvents.push({
        id: `event-comp-${c.id}`,
        date: c.submissionDate.toISOString(),
        source: c.refNo,
        bureau: c.bureau,
        eventType: 'COMPLAINT_FILED',
        title: `Grievance Registered: ${c.refNo} (${c.bureau})`,
        description: `Filed by ${c.complainantType} (${c.complainantName}) regarding ${c.category}: ${c.subject}`,
        caseRef: c.refNo,
      });

      // Add fee audit events if any
      c.feeRecords.forEach((f) => {
        timelineEvents.push({
          id: `event-fee-${f.id}`,
          date: f.createdAt.toISOString(),
          source: f.receiptNo,
          bureau: c.bureau,
          eventType: 'FEE_AUDIT',
          title: `Fee Anomaly Flagged: Receipt #${f.receiptNo}`,
          description: `Discrepancy of Rs. ${f.differenceAmount.toLocaleString()} (+${f.differencePercent}%) over statutory ceiling of Rs. ${f.referenceFee.toLocaleString()}.`,
          caseRef: c.refNo,
        });
      });
    });

    // Add inter-bureau notes
    group.notes.forEach((n) => {
      timelineEvents.push({
        id: `event-note-${n.id}`,
        date: n.createdAt.toISOString(),
        source: `${n.officerName} (${n.bureau})`,
        bureau: n.bureau,
        eventType: 'OFFICER_DIRECTIVE',
        title: `${n.noteType}: ${n.officerName}`,
        description: n.content,
        caseRef: group.groupRef,
      });
    });

    // Sort timeline ascending (earliest to latest)
    timelineEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({
      success: true,
      data: {
        group,
        timeline: timelineEvents,
      },
    });
  } catch (error: any) {
    console.error('Error fetching coordination data:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      groupId,
      complaintId,
      officerName,
      officerDesignation,
      bureau,
      noteType,
      content,
      actorName,
      actorRole,
    } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: 'Note content is required' }, { status: 400 });
    }

    const note = await prisma.officerNote.create({
      data: {
        coordinationGroupId: groupId || null,
        complaintId: complaintId || null,
        officerName: officerName || actorName || 'Dr. R. K. Sharma',
        officerDesignation: officerDesignation || 'Joint Director',
        bureau: bureau || 'PGRC',
        noteType: noteType || 'Inter-Bureau Directive',
        content,
      },
    });

    await logAuditEvent({
      actorName: officerName || actorName || 'Dr. R. K. Sharma',
      actorRole: actorRole || 'Officer',
      action: 'OFFICER_NOTE_ADDED',
      caseRef: groupId || complaintId || 'COORDINATION',
      details: `Added ${noteType || 'Officer Note'} (${bureau}): "${content.substring(0, 100)}..."`,
      complaintId: complaintId || undefined,
    });

    return NextResponse.json({ success: true, data: note });
  } catch (error: any) {
    console.error('Error adding officer note:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
