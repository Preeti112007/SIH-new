import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAuditEvent } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const feeRecords = await prisma.feeRecord.findMany({
      include: {
        institution: {
          include: {
            trust: true,
          },
        },
        complaint: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: feeRecords });
  } catch (error: any) {
    console.error('Error fetching fee records:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      receiptNo,
      institutionId,
      complaintId,
      referenceFee,
      reportedFee,
      receiptText,
      ocrConfidence,
      reviewRemarks,
      actorName,
      actorRole,
    } = body;

    const refFee = parseFloat(referenceFee) || 80000.0;
    const repFee = parseFloat(reportedFee) || 120000.0;
    const diffAmount = repFee - refFee;
    const diffPercent = ((diffAmount / refFee) * 100);

    const isAnomaly = diffPercent > 20;
    const reviewStatus = isAnomaly ? 'Flagged for Review' : 'Verified Within Ceiling';

    const record = await prisma.feeRecord.create({
      data: {
        receiptNo: receiptNo || `REC-${Date.now().toString().slice(-6)}`,
        institutionId,
        complaintId: complaintId || null,
        referenceFee: refFee,
        reportedFee: repFee,
        differenceAmount: diffAmount,
        differencePercent: parseFloat(diffPercent.toFixed(1)),
        ocrConfidence: ocrConfidence || 95.0,
        receiptText: receiptText || '',
        reviewStatus,
        reviewedBy: actorName || 'Dr. R. K. Sharma',
        reviewRemarks: reviewRemarks || (isAnomaly ? `Discrepancy of Rs. ${diffAmount.toLocaleString()} (+${diffPercent.toFixed(1)}%) exceeds 20% audit threshold.` : 'Receipt fee complies with regulatory ceiling.'),
      },
      include: {
        institution: true,
        complaint: true,
      },
    });

    // Audit log
    await logAuditEvent({
      actorName: actorName || 'Dr. R. K. Sharma',
      actorRole: actorRole || 'Officer',
      action: 'FEE_ANOMALY_REVIEWED',
      caseRef: record.complaint?.refNo || record.receiptNo,
      details: `Fee audit record created for receipt ${record.receiptNo}. Ref Fee: Rs. ${refFee}, Reported: Rs. ${repFee}, Diff: Rs. ${diffAmount} (+${diffPercent.toFixed(1)}%). Status: ${reviewStatus}.`,
      complaintId: record.complaintId || undefined,
    });

    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    console.error('Error creating fee record:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, reviewStatus, reviewRemarks, actorName, actorRole } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Fee Record ID is required' }, { status: 400 });
    }

    const updated = await prisma.feeRecord.update({
      where: { id },
      data: {
        reviewStatus,
        reviewedBy: actorName || 'Dr. R. K. Sharma',
        reviewRemarks,
      },
      include: {
        institution: true,
        complaint: true,
      },
    });

    await logAuditEvent({
      actorName: actorName || 'Dr. R. K. Sharma',
      actorRole: actorRole || 'Officer',
      action: 'FEE_ANOMALY_REVIEWED',
      caseRef: updated.complaint?.refNo || updated.receiptNo,
      details: `Fee audit status updated to "${reviewStatus}". Remarks: ${reviewRemarks || 'None'}`,
      complaintId: updated.complaintId || undefined,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating fee record:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
