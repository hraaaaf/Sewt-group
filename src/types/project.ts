/**
 * Shape contractuelle d'un projet / case study.
 * Cette interface est figée — elle servira de payload au webhook ERP (Étape 10)
 * et alimente la section Portfolio (Étape 8).
 */

export type Sector = "agriculture" | "industrie" | "tertiaire" | "public" | "marine";

export type ProjectStatus = "in-progress" | "delivered" | "operational" | "archived";

export interface ProjectMetric {
  /** Libellé court de la métrique (ex: "Puissance crête"). */
  label: string;
  /** Valeur affichée (déjà formatée si besoin). */
  value: string;
  /** Unité affichée séparément (ex: "kWc", "m³/jour", "tCO₂/an"). */
  unit?: string;
}

export interface ProjectImage {
  /** ID référencé dans Assets.md (jamais un chemin de fichier). */
  placeholderId: string;
  /** Chemin réel dans /public/ (override le placeholder s'il est présent). */
  imageSrc?: string;
  /** Alt accessibilité — obligatoire. */
  alt: string;
  /** Ratio cible. */
  ratio?: "1:1" | "4:5" | "16:9" | "21:9" | "3:4" | "9:16";
}

export interface CaseStudyChapter {
  /** Type de chapitre — drive l'affichage. */
  kind: "context" | "challenge" | "solution" | "results";
  title: string;
  body: string;
  metrics?: ProjectMetric[];
  image?: ProjectImage;
}

export interface Project {
  /** Slug unique URL-safe (ex: "onp-boujdour-pumping"). */
  slug: string;
  /** Titre éditorial. */
  title: string;
  /** Client / maître d'ouvrage. */
  client: string;
  sector: Sector;
  status: ProjectStatus;
  /** Localisation lisible (ex: "Boujdour, Maroc"). */
  location: string;
  /** Coordonnées géographiques pour map future. */
  coordinates?: { lat: number; lng: number };
  /** Année de mise en service. */
  year: number;
  /** Puissance crête (kWc) si pertinent. */
  capacityKwc?: number;
  /** Volume pompé (m³/j) si station de pompage. */
  pumpingM3PerDay?: number;
  /** Headline de la card portfolio. */
  summary: string;
  /** Image hero du case study. */
  hero: ProjectImage;
  /** Chapitres scroll-telling. */
  chapters: CaseStudyChapter[];
  /** Métriques clés affichées en sidebar sticky. */
  keyMetrics: ProjectMetric[];
  /** Partenaires fournisseurs impliqués (ex: "Lorentz", "IBC Solar"). */
  partners?: string[];
  /** Tags additionnels pour filtres. */
  tags?: string[];
}
