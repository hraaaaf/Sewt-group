import type { RoiAssumptions, RoiInput, RoiResult } from "@/types/roi";

/**
 * Hypothèses de calcul ROI adaptées au contexte industriel marocain.
 *
 * Sources & ordres de grandeur (V1) :
 * - Prix kWh industriel HT MA : ~1,25 - 1,40 MAD/kWh (tarifs HT ONEE / régies).
 * - Productible spécifique Maroc : 1 650 - 1 800 kWh/kWc/an (Boujdour, Ouarzazate
 *   tirent la moyenne vers le haut ; Tanger Méditerranée ~1 550).
 * - Coût installé industriel HT : 7 - 10 MAD/Wc (V1 retient 8,5 — toiture
 *   moyenne, structure portée standard).
 * - Facteur émission réseau MA : ~0,708 tCO₂/MWh (mix charbon/gaz/RE).
 * - Surface au sol : 5,5 m²/kWc industriel (modules 540 Wc + circulation).
 *
 * Ces valeurs sont volontairement conservatrices côté économies pour rester
 * crédibles face à un Directeur Industriel ou un CFO qui challenge le calcul.
 */
export const DEFAULT_ASSUMPTIONS: RoiAssumptions = {
  pricePerKwhMad: 1.3,
  yieldKwhPerKwcYear: 1720,
  installedCostMadPerWc: 8.5,
  selfConsumptionRate: 0.85,
  gridEmissionFactorTco2PerMwh: 0.708,
  surfacePerKwcM2: 5.5,
  horizonYears: 10,
};

/**
 * Bornes UI du slider (en MAD/mois). Garder cohérent avec `RoiSlider`.
 */
export const ROI_BOUNDS = {
  min: 0,
  max: 500_000,
  step: 500,
  default: 15_000,
} as const;

/**
 * Calcule un dossier ROI complet à partir d'une facture mensuelle (MAD).
 * Fonction pure, déterministe, testable. Pas de side-effect.
 *
 * @example
 *   computeRoi({ monthlyBillMad: 45000 })
 *   // → { recommendedKwc: 198.3, surfaceM2: 1090.6, ... }
 */
export function computeRoi(
  input: RoiInput,
  assumptions: RoiAssumptions = DEFAULT_ASSUMPTIONS,
): RoiResult {
  const monthlyBill = Math.max(0, input.monthlyBillMad);

  // Consommation déduite de la facture.
  const monthlyConsumptionKwh = monthlyBill / assumptions.pricePerKwhMad;
  const annualConsumptionKwh = monthlyConsumptionKwh * 12;

  // Énergie cible à couvrir en autoconsommation.
  const targetKwhCovered = annualConsumptionKwh * assumptions.selfConsumptionRate;

  // Dimensionnement.
  const recommendedKwc = targetKwhCovered / assumptions.yieldKwhPerKwcYear;
  const surfaceM2 = recommendedKwc * assumptions.surfacePerKwcM2;

  // CAPEX (1 kWc = 1 000 Wc).
  const estimatedCapexMad = recommendedKwc * 1_000 * assumptions.installedCostMadPerWc;

  // Économies.
  const monthlySavingMad = monthlyBill * assumptions.selfConsumptionRate;
  const horizonSavingMad = monthlySavingMad * 12 * assumptions.horizonYears;

  // Impact CO₂.
  const annualMwhCovered = targetKwhCovered / 1_000;
  const yearlyCo2AvoidedT = annualMwhCovered * assumptions.gridEmissionFactorTco2PerMwh;

  // Payback (CAPEX / économie annuelle). Garde-fou si facture = 0.
  const annualSavingMad = monthlySavingMad * 12;
  const paybackYears = annualSavingMad > 0 ? estimatedCapexMad / annualSavingMad : 0;

  return {
    recommendedKwc,
    surfaceM2,
    monthlySavingMad,
    horizonSavingMad,
    yearlyCo2AvoidedT,
    paybackYears,
    estimatedCapexMad,
  };
}

// =========================================================
// Formatters — réutilisés côté UI pour homogénéité
// =========================================================

const numberFr = new Intl.NumberFormat("fr-FR", { useGrouping: true });

const numberFrFixed = (decimals: number) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });

export function formatMad(value: number): string {
  return `${numberFr.format(Math.round(value))} MAD`;
}

export function formatMadCompact(value: number): string {
  if (value >= 1_000_000) {
    return `${numberFrFixed(2).format(value / 1_000_000)} M MAD`;
  }
  if (value >= 10_000) {
    return `${numberFrFixed(0).format(Math.round(value / 1_000))} k MAD`;
  }
  return formatMad(value);
}

export function formatKwc(value: number): string {
  return numberFrFixed(value < 100 ? 1 : 0).format(value);
}

export function formatM2(value: number): string {
  return numberFr.format(Math.round(value));
}

export function formatTons(value: number): string {
  return numberFrFixed(value < 100 ? 1 : 0).format(value);
}

export function formatYears(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "—";
  return numberFrFixed(1).format(value);
}
