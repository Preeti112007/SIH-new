// Case Coordination Priority Score Calculator (0-100)
// AICTE Unified Case Coordination Radar
// Decision-support metric designed for transparent administrative triage.

export interface PriorityScoreInput {
  isOverdue: boolean; // Overdue institutional reply
  daysOverdue?: number;
  hasUnresolvedHistory: boolean;
  relatedComplaintsCount: number; // Complaints in other bureaus
  hasFeeDiscrepancy: boolean;
  feeDiscrepancyPercent?: number; // e.g. 50%
  hasIdentityAnomaly: boolean; // Same trust/PIN/address with sister institution
  bureauCount: number; // Number of distinct bureaus involved
  categoryUrgency?: 'High' | 'Medium' | 'Low';
}

export interface FactorBreakdown {
  factor: string;
  points: number;
  maxPoints: number;
  description: string;
  triggered: boolean;
}

export interface PriorityScoreResult {
  score: number; // 0-100
  priorityLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  factors: FactorBreakdown[];
  explanation: string;
  recommendedAction: string;
}

export function calculatePriorityScore(input: PriorityScoreInput): PriorityScoreResult {
  const factors: FactorBreakdown[] = [];
  let totalScore = 0;

  // Factor 1: Overdue Institutional Response (up to 25 pts)
  const overduePoints = input.isOverdue ? Math.min(25, 15 + (input.daysOverdue || 0) * 2) : 0;
  totalScore += overduePoints;
  factors.push({
    factor: 'Statutory Reply SLA Status',
    points: overduePoints,
    maxPoints: 25,
    triggered: input.isOverdue,
    description: input.isOverdue
      ? `Institutional response is overdue by ${input.daysOverdue || 1} day(s) beyond statutory timeline (+${overduePoints} pts).`
      : 'Institutional response is within statutory timeframe (0 pts).',
  });

  // Factor 2: Cross-Bureau Related Complaints (up to 20 pts)
  let relatedPoints = 0;
  if (input.relatedComplaintsCount >= 2 || input.bureauCount > 1) {
    relatedPoints = 20;
  } else if (input.relatedComplaintsCount === 1) {
    relatedPoints = 15;
  }
  totalScore += relatedPoints;
  factors.push({
    factor: 'Cross-Bureau Entity Corroboration',
    points: relatedPoints,
    maxPoints: 20,
    triggered: input.relatedComplaintsCount > 0,
    description:
      input.relatedComplaintsCount > 0
        ? `Identified ${input.relatedComplaintsCount} concurrent complaint(s) across ${input.bureauCount} distinct bureau(s) involving common entity (+${relatedPoints} pts).`
        : 'Isolated single-bureau complaint record (0 pts).',
  });

  // Factor 3: Substantial Fee Discrepancy (up to 20 pts)
  let feePoints = 0;
  if (input.hasFeeDiscrepancy) {
    const pct = input.feeDiscrepancyPercent || 0;
    if (pct >= 40) {
      feePoints = 20;
    } else if (pct >= 20) {
      feePoints = 14;
    } else {
      feePoints = 8;
    }
  }
  totalScore += feePoints;
  factors.push({
    factor: 'Fee Differential Anomaly',
    points: feePoints,
    maxPoints: 20,
    triggered: input.hasFeeDiscrepancy,
    description: input.hasFeeDiscrepancy
      ? `Verified fee receipt discrepancy of ${input.feeDiscrepancyPercent || 0}% above approved benchmark (+${feePoints} pts).`
      : 'No verified fee differential flagged (0 pts).',
  });

  // Factor 4: Institutional Identity Ambiguity / Sister Entity Overlap (up to 15 pts)
  const identityPoints = input.hasIdentityAnomaly ? 15 : 0;
  totalScore += identityPoints;
  factors.push({
    factor: 'Institutional Identity & Campus Ambiguity',
    points: identityPoints,
    maxPoints: 15,
    triggered: input.hasIdentityAnomaly,
    description: input.hasIdentityAnomaly
      ? 'Co-located campus or shared trust detected across disparate AICTE permanent IDs (+15 pts).'
      : 'Institutional registration parameters unambiguous (0 pts).',
  });

  // Factor 5: Severity & Category Urgency (up to 10 pts)
  const urgencyPoints = input.categoryUrgency === 'High' ? 10 : input.categoryUrgency === 'Medium' ? 6 : 3;
  totalScore += urgencyPoints;
  factors.push({
    factor: 'Grievance Category & Student Impact',
    points: urgencyPoints,
    maxPoints: 10,
    triggered: input.categoryUrgency === 'High',
    description:
      input.categoryUrgency === 'High'
        ? 'High student impact (hall ticket threat, fee coercion, or document withholding) (+10 pts).'
        : 'Standard administrative or infrastructure category (+6 pts).',
  });

  // Factor 6: Unresolved Prior Complaints (up to 10 pts)
  const historyPoints = input.hasUnresolvedHistory ? 10 : 0;
  totalScore += historyPoints;
  factors.push({
    factor: 'Prior Grievance Recurrence Pattern',
    points: historyPoints,
    maxPoints: 10,
    triggered: input.hasUnresolvedHistory,
    description: input.hasUnresolvedHistory
      ? 'Entity has unresolved prior grievances registered within the preceding 12 months (+10 pts).'
      : 'No adverse grievance history on record (0 pts).',
  });

  // Normalize to 0-100
  const finalScore = Math.min(100, Math.max(0, totalScore));

  let priorityLevel: 'Critical' | 'High' | 'Medium' | 'Low' = 'Low';
  let recommendedAction = 'Standard bureau queue review within normal SLA.';

  if (finalScore >= 85) {
    priorityLevel = 'Critical';
    recommendedAction =
      'Immediate inter-bureau joint coordination recommended. Issue show-cause directive and convene hearing.';
  } else if (finalScore >= 70) {
    priorityLevel = 'High';
    recommendedAction =
      'High priority review recommended: Corroborated records exist across bureaus with substantial fee discrepancy.';
  } else if (finalScore >= 40) {
    priorityLevel = 'Medium';
    recommendedAction =
      'Expedite officer verification; request audited response from institution registrar.';
  }

  const explanation = `Case Coordination Priority Score evaluated at ${finalScore}/100 (${priorityLevel} Priority). Primary drivers: ${factors
    .filter((f) => f.triggered)
    .map((f) => f.factor)
    .join(', ')}.`;

  return {
    score: finalScore,
    priorityLevel,
    factors,
    explanation,
    recommendedAction,
  };
}
