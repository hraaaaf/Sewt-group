/**
 * Contrats du Simulateur ROI (Étape 4).
 * Les hypothèses vivront dans `src/lib/roi.ts`.
 */

export interface RoiInput {
  /** Facture énergétique mensuelle (MAD). */
  monthlyBillMad: number;
}

export interface RoiAssumptions {
  /** Prix moyen du kWh industriel au Maroc (MAD/kWh). */
  pricePerKwhMad: number;
  /** Productible spécifique annuel (kWh/kWc/an) — Maroc ≈ 1 700. */
  yieldKwhPerKwcYear: number;
  /** Coût installé moyen (MAD/Wc). */
  installedCostMadPerWc: number;
  /** Taux d'autoconsommation moyen visé. */
  selfConsumptionRate: number;
  /** Facteur d'émission réseau MA (tCO₂ évitées / MWh). */
  gridEmissionFactorTco2PerMwh: number;
  /** Surface au sol par kWc installé (m²/kWc). */
  surfacePerKwcM2: number;
  /** Horizon de comparaison en années. */
  horizonYears: number;
}

export interface RoiResult {
  /** Puissance crête recommandée (kWc). */
  recommendedKwc: number;
  /** Surface estimée (m²). */
  surfaceM2: number;
  /** Économie mensuelle (MAD). */
  monthlySavingMad: number;
  /** Économie cumulée sur l'horizon (MAD). */
  horizonSavingMad: number;
  /** CO₂ évité par an (tonnes). */
  yearlyCo2AvoidedT: number;
  /** Payback en années (CAPEX / économies annuelles). */
  paybackYears: number;
  /** CAPEX estimé (MAD). */
  estimatedCapexMad: number;
}
