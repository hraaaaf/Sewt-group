"use client";

import { Slider } from "@/components/ui/Slider";
import { formatMad, ROI_BOUNDS } from "@/lib/roi";

interface RoiSliderProps {
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}

/**
 * Wrapper du Slider générique pour le contexte ROI :
 * - Bornes ROI_BOUNDS issues de lib/roi.ts (source unique de vérité).
 * - Valeur formatée MAD avec séparateur de milliers FR.
 */
export function RoiSlider({ value, onChange, hint }: RoiSliderProps) {
  return (
    <Slider
      label="Facture énergétique mensuelle"
      valueLabel={formatMad(value)}
      min={ROI_BOUNDS.min}
      max={ROI_BOUNDS.max}
      step={ROI_BOUNDS.step}
      value={value}
      onChange={onChange}
      unit="MAD"
      hint={hint}
    />
  );
}
