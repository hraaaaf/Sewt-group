import type { LucideIcon } from "lucide-react";

export type ServiceCategory =
  | "production"
  | "pompage"
  | "thermique"
  | "efficacite"
  | "stockage"
  | "monitoring"
  | "ingenierie"
  | "operation";

export type BentoSpan = {
  /** Colonnes occupées sur grille 12. */
  col: 3 | 4 | 6 | 8 | 12;
  /** Lignes occupées sur grille bento. */
  row: 1 | 2;
};

export interface Service {
  slug: string;
  title: string;
  /** Phrase courte pour card bento. */
  headline: string;
  /** Description longue — utilisée en modal/page détail. */
  description: string;
  category: ServiceCategory;
  /** Icône Lucide (composant). */
  icon: LucideIcon;
  /** Image placeholder ID référencé dans Assets.md. */
  imageId?: string;
  /** Taille dans la grille bento. */
  span: BentoSpan;
  /** Bénéfices clés bulletés. */
  benefits: string[];
  /** Normes / certifications associées. */
  standards?: string[];
}
