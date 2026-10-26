import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  /** Numéro affiché 01-99. */
  number: string;
  /** Libellé court. */
  title: string;
  /** Description en 1-2 phrases. */
  body: string;
  /** Durée typique (ex: "5-7 jours"). */
  duration: string;
  /** Livrable concret remis au client. */
  deliverable: string;
  icon: LucideIcon;
}
