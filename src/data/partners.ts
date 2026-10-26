/**
 * Partenaires & références clients SEWT (V1 — alignée sur le site officiel).
 * 12 entités : références projets industriels + organismes institutionnels.
 * Logos téléchargés depuis sewt-group.ma, stockés dans `public/partners/`.
 */

export interface Partner {
  name: string;
  /** Chemin du logo dans /public/partners/. */
  logoSrc?: string;
  /** URL du site partenaire. */
  href?: string;
  kind: "institution" | "reference";
}

export const partners: Partner[] = [
  { name: "ONP", logoSrc: "/partners/onp.png", kind: "institution" },
  { name: "ORMVA-TF", logoSrc: "/partners/ormva-tf.png", kind: "institution" },
  { name: "AXA", logoSrc: "/partners/axa.png", kind: "reference" },
  { name: "BBG", logoSrc: "/partners/bbg.png", kind: "reference" },
  { name: "Clinique Dentaire UN", logoSrc: "/partners/clinique-dentaire-un.png", kind: "reference" },
  { name: "CMS", logoSrc: "/partners/cms.png", kind: "reference" },
  { name: "IRESEN", logoSrc: "/partners/iresen.png", kind: "institution" },
  { name: "KGS", logoSrc: "/partners/kgs.png", kind: "reference" },
  { name: "Super Auto", logoSrc: "/partners/super-auto.png", kind: "reference" },
  { name: "UMP6P", logoSrc: "/partners/ump6p.png", kind: "institution" },
  { name: "UNIDO", logoSrc: "/partners/unido.png", kind: "institution" },
  { name: "Yozi Market", logoSrc: "/partners/yozi-market.png", kind: "reference" },
];
