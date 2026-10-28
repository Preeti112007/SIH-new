import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { evaluateInstitutionMatch, MatchQuery, ComparisonRecord } from '@/lib/matching';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body: MatchQuery & { actorName?: string; actorRole?: string } = await req.json();

    const allInstitutions = await prisma.institution.findMany({
      include: {
        trust: true,
        complaints: {
          select: {
            refNo: true,
            bureau: true,
            category: true,
            status: true,
          },
        },
      },
    });

    const candidates: ComparisonRecord[] = allInstitutions.map((inst) => ({
      id: inst.id,
      aicteId: inst.aicteId,
      name: inst.name,
      category: inst.category,
      address: inst.address,
      city: inst.city,
      state: inst.state,
      pinCode: inst.pinCode,
      trustName: inst.trust.name,
      status: inst.status,
      complaintRef: inst.complaints[0]?.refNo,
    }));

    const results = candidates.map((cand) => {
      const breakdown = evaluateInstitutionMatch(body, cand);
      return {
        targetRecord: cand,
        breakdown,
      };
    });

    // Sort descending by overall match score
    results.sort((a, b) => b.breakdown.overallScore - a.breakdown.overallScore);

    // Filter to relevant matches or return top candidates
    const filteredResults = results.filter(
      (r) =>
        r.breakdown.overallScore >= 30 ||
        r.breakdown.exactIdMatch ||
        r.breakdown.pinCodeMatch ||
        r.breakdown.trustMatch > 50
    );

    // Log the match search into Audit Trail
    if (body.institutionName || body.aicteId || body.pinCode) {
      await logAuditEvent({
        actorName: body.actorName || 'Dr. R. K. Sharma',
        actorRole: body.actorRole || 'Officer',
        action: 'IDENTITY_MATCH_REVIEWED',
        caseRef: body.complaintRef || 'SEARCH-QUERY',
        details: `Explainable Identity Matching executed for query: "${body.institutionName || body.aicteId || body.address || 'Parameters'}". Top match score: ${filteredResults[0]?.breakdown.overallScore || 0}%.`,
      });
    }

    return NextResponse.json({
      success: true,
      query: body,
      totalMatched: filteredResults.length,
      data: filteredResults,
    });
  } catch (error: any) {
    console.error('Error in identity matching API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
