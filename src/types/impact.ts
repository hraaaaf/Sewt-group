/**
 * Métriques du Live Impact Dashboard (Étape 5).
 * `liveDeltaPerMinute` permet de simuler l'effet "live" sans backend.
 */

export interface ImpactMetric {
  /** Identifiant stable utilisé en attribut data + key React. */
  id: string;
  /** Libellé affiché. */
  label: string;
  /** Valeur de base (cumul historique). */
  baseValue: number;
  /** Unité affichée séparément (ex: "MW", "tCO₂", "m³"). */
  unit: string;
  /** Nombre de décimales à afficher. */
  decimals?: number;
  /** Incrément simulé par minute (effet temps réel). */
  liveDeltaPerMinute?: number;
  /** Easing du count-up GSAP. */
  ease?: "expo.out" | "power3.out" | "power2.out";
  /** Format millier ("space" → 12 345, "comma" → 12,345). */
  thousandsFormat?: "space" | "comma" | "none";
}

export interface ImpactTimelinePoint {
  year: number;
  cumulativeMw: number;
}
