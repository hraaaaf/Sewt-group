import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "centrale-pv-carriere-industrielle",
    title: "Site industriel",
    client: "Opérateur industriel (confidentiel)",
    sector: "industrie",
    status: "operational",
    location: "Sidi Kacem, Maroc",
    year: 2025,
    capacityKwc: 1_100,
    summary:
      "Centrale photovoltaïque au sol de 1,1 MWc — le plus grand projet du portefeuille SEWT. Structure fixe inclinée, raccordement HTA, monitoring temps réel. Couverture directe de la charge industrielle de pointe.",
    hero: {
      placeholderId: "case-study-sidi-kacem",
      imageSrc: "/projects/sidi-kacem-1100kwc.jpg",
      alt: "Centrale photovoltaïque 1,1 MWc à Sidi Kacem, Maroc",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "1 100", unit: "kWc" },
      { label: "Localisation", value: "Sidi Kacem" },
      { label: "Mise en service", value: "2025" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Site industriel à forte intensité énergétique cherchant à sécuriser son coût électrique et à amorcer une trajectoire bas-carbone conforme aux standards export.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Dimensionner 1,1 MWc sur emprise disponible, garantir une mise en service rapide sans interruption de la production industrielle.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Centrale au sol sur parcelle non exploitable, structures portées auto-portées, onduleurs string haute performance, raccordement HTA.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Couverture significative de la charge de pointe, baisse mesurable de la facture énergétique dès le premier exercice, conformité IEC validée.",
      },
    ],
    tags: ["centrale-sol", "industrie", "1mwc"],
  },
  {
    slug: "centrale-pv-domaine-agricole",
    title: "Exploitation agricole",
    client: "Domaine agricole (confidentiel)",
    sector: "agriculture",
    status: "operational",
    location: "Taroudant, Souss-Massa",
    year: 2023,
    capacityKwc: 350,
    summary:
      "Centrale au sol de 350 kWc au cœur d'un domaine arboricole de la région Souss-Massa. Alimentation directe du poste pompage-irrigation. Substitution aux groupes diesel sur les cycles critiques.",
    hero: {
      placeholderId: "case-study-taroudant",
      imageSrc: "/projects/taroudant-350kwc.jpg",
      alt: "Centrale photovoltaïque 350 kWc sur domaine agricole, Taroudant",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "350", unit: "kWc" },
      { label: "Localisation", value: "Taroudant" },
      { label: "Mise en service", value: "2023" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Domaine arboricole exposé à la volatilité du coût du diesel pour l'irrigation en profondeur face à la baisse des nappes phréatiques.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Produire de l'électricité sur un site rural éloigné du réseau, garantir le ROI dans un cadre d'exploitation saisonnier à forte consommation estivale.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Centrale au sol entre les rangées d'arbres, dimensionnée sur la charge de pointe d'irrigation, onduleurs Fronius, monitoring de production.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Substitution totale au diesel sur le poste pompage en journée, réduction du coût d'irrigation au m³, autonomie renforcée en haute saison.",
      },
    ],
    tags: ["agriculture", "pompage", "taroudant"],
  },
  {
    slug: "autoconsommation-bureaux",
    title: "Secteur tertiaire",
    client: "Acteur tertiaire (confidentiel)",
    sector: "tertiaire",
    status: "operational",
    location: "Casablanca",
    year: 2024,
    capacityKwc: 200,
    summary:
      "Installation photovoltaïque de 200 kWc en autoconsommation pour un siège de bureaux. Couverture du poste climatisation et bureautique, intégration architecturale soignée.",
    hero: {
      placeholderId: "case-study-tertiaire-casa",
      imageSrc: "/projects/bureaux-200-kwc.jpg",
      alt: "Installation photovoltaïque sur bâtiment tertiaire",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "200", unit: "kWc" },
      { label: "Secteur", value: "Tertiaire · Bureaux" },
      { label: "Mise en service", value: "2024" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Foncière tertiaire cherchant à réduire son empreinte carbone et son coût d'exploitation sur le poste CVC.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Maximiser la production sur une emprise toiture limitée tout en préservant l'esthétique architecturale du bâtiment.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Modules tier-1 en toiture-terrasse, structure portée alu, raccordement direct sur TGBT, supervision IoT.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Couverture significative de la charge CVC, économies mesurables dès la première année, valorisation immobilière.",
      },
    ],
    tags: ["autoconsommation", "tertiaire", "toiture"],
  },
  {
    slug: "entrepot-frigorifique-200kwc",
    title: "Centrale 660 kWc — Carrière El Hajeb",
    client: "Opérateur extraction (confidentiel)",
    sector: "industrie",
    status: "operational",
    location: "El Hajeb, Meknès-Tafilalet",
    year: 2023,
    capacityKwc: 660,
    summary:
      "Centrale photovoltaïque de 660 kWc sur site d'extraction d'El Hajeb. Alimentation directe des concasseurs et convoyeurs — les équipements les plus énergivores, opérationnels quasi-exclusivement en journée.",
    hero: {
      placeholderId: "case-study-el-hajeb",
      imageSrc: "/projects/el-hajeb-660kwc.jpg",
      alt: "Installation de la centrale 660 kWc sur carrière industrielle, El Hajeb",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "660", unit: "kWc" },
      { label: "Localisation", value: "El Hajeb" },
      { label: "Mise en service", value: "2023" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Site d'extraction à forte intensité énergétique. Les concasseurs et convoyeurs représentent 70 à 80 % de la consommation électrique et fonctionnent en journée.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Installer 660 kWc sur terrain accidenté sans interrompre l'exploitation, en respectant les contraintes de sécurité d'un site minier.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Centrale au sol sur remblai dégagé, structures auto-portées, onduleurs industriels haute puissance, raccordement direct sur tableau général.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Couverture directe des charges de pointe machines, réduction drastique de la dépendance réseau aux heures de production, coût énergétique fixé sur 25 ans.",
      },
    ],
    tags: ["carriere", "extraction", "el-hajeb"],
  },
  {
    slug: "hotel-90kwc",
    title: "Hôtel — Solaire 90 kWc",
    client: "Établissement hôtelier (confidentiel)",
    sector: "tertiaire",
    status: "operational",
    location: "Maroc",
    year: 2023,
    capacityKwc: 90,
    summary:
      "Installation de 90 kWc en couverture d'un établissement hôtelier. Mix photovoltaïque et préparation d'eau chaude sanitaire pour les postes restauration et chambres.",
    hero: {
      placeholderId: "case-study-hotel",
      imageSrc: "/projects/hotel-riad-taroudant.jpg",
      alt: "Installation solaire sur riad hôtelier, Maroc",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "90", unit: "kWc" },
      { label: "Secteur", value: "Hôtellerie" },
      { label: "Mise en service", value: "2023" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Établissement hôtelier avec une consommation électrique structurée par le poste climatisation et l'ECS.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Intégrer la centrale sans altérer l'expérience client ni la signalétique architecturale de l'établissement.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Modules en intégration toiture, complément solaire thermique pour l'ECS, monitoring synchronisé.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Réduction durable de la facture énergétique sur les saisons hautes, repositionnement éco-responsable de l'établissement.",
      },
    ],
    tags: ["hotellerie", "autoconsommation", "ecs"],
  },
  {
    slug: "atlantic-free-zone-60kwc",
    title: "Centrale 160 kWc — AFZ Kénitra (Ambemar Maroc)",
    client: "Ambemar Maroc",
    sector: "industrie",
    status: "operational",
    location: "Atlantic Free Zone, Kénitra",
    year: 2023,
    capacityKwc: 160,
    summary:
      "Centrale de 160 kWc en toiture pour Ambemar Maroc dans la zone franche industrielle de Kénitra. Réduction directe du scope 2 et alignement sur les exigences énergétiques des donneurs d'ordres internationaux.",
    hero: {
      placeholderId: "case-study-afz-kenitra",
      imageSrc: "/projects/afz-kenitra-160kwc.jpg",
      alt: "Site industriel Ambemar Maroc, Atlantic Free Zone Kénitra",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "160", unit: "kWc" },
      { label: "Localisation", value: "AFZ Kénitra" },
      { label: "Mise en service", value: "2023" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Industriel en zone franche export soumis aux exigences de décarbonation scope 2 des donneurs d'ordres européens.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Délivrer une réduction d'empreinte carbone documentable et certifiable sans perturber le flux de production.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Centrale toiture industrielle sur charpente métallique, structure portée alu, raccordement BT, dossier de conformité IEC complet remis au client.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Réduction attestée de l'empreinte scope 2, alignement sur les cahiers des charges clients export, ROI en moins de 5 ans.",
      },
    ],
    tags: ["industrie", "export", "afz", "kenitra"],
  },
  {
    slug: "administration-publique-88kwc",
    title: "Administration publique — 88 kWc",
    client: "Acteur public (confidentiel)",
    sector: "public",
    status: "operational",
    location: "Maroc",
    year: 2024,
    capacityKwc: 88,
    summary:
      "Installation photovoltaïque de 88 kWc pour un bâtiment de l'administration publique. Démarche exemplaire d'autoconsommation institutionnelle.",
    hero: {
      placeholderId: "case-study-admin",
      imageSrc: "/projects/admin-toiture.jpg",
      alt: "Centrale solaire en toiture d'un bâtiment administratif",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "88", unit: "kWc" },
      { label: "Secteur", value: "Public · Administration" },
      { label: "Mise en service", value: "2024" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Bâtiment administratif public engagé dans une démarche d'exemplarité énergétique alignée sur la stratégie nationale.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Concilier les contraintes patrimoniales du bâtiment et la nécessité d'un retour sur investissement à l'échelle d'un cycle budgétaire public.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Modules tier-1 en toiture, dossier marché public conforme, livrables documentaires complets pour audit.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Production stable, livrables documentaires conformes aux exigences de la commande publique.",
      },
    ],
    tags: ["public", "autoconsommation"],
  },
  {
    slug: "ecole-40kwc",
    title: "Établissement scolaire — 40 kWc",
    client: "Établissement scolaire (confidentiel)",
    sector: "public",
    status: "operational",
    location: "Maroc",
    year: 2024,
    capacityKwc: 40,
    summary:
      "Installation solaire de 40 kWc pour un établissement scolaire. Réduction de la facture d'électricité et support pédagogique sur la transition énergétique.",
    hero: {
      placeholderId: "case-study-ecole",
      imageSrc: "/projects/ecole-40-kwc.png",
      alt: "Installation photovoltaïque sur établissement scolaire",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "40", unit: "kWc" },
      { label: "Secteur", value: "Éducation" },
      { label: "Mise en service", value: "2024" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Établissement scolaire cherchant à réduire son coût d'exploitation et à intégrer la transition énergétique à son projet pédagogique.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Maintenir l'activité scolaire pendant les travaux et exploiter la centrale comme support pédagogique mesurable.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Toiture-terrasse, monitoring accessible aux enseignants, fiches pédagogiques associées à la production réelle.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Économies budgétaires réinvesties dans l'éducation, intégration concrète du solaire au programme STEM.",
      },
    ],
    tags: ["education", "pedagogie"],
  },
  {
    slug: "residentiel-20kwc",
    title: "Résidentiel premium — 20 kWc",
    client: "Particulier (confidentiel)",
    sector: "tertiaire",
    status: "operational",
    location: "Maroc",
    year: 2024,
    capacityKwc: 20,
    summary:
      "Installation résidentielle haut de gamme de 20 kWc. Autoconsommation totale couvrant climatisation, piscine et bornes de recharge VE.",
    hero: {
      placeholderId: "case-study-residentiel",
      imageSrc: "/projects/residentiel-villa.jpg",
      alt: "Installation photovoltaïque sur villa résidentielle premium",
      ratio: "16:9",
    },
    keyMetrics: [
      { label: "Puissance crête", value: "20", unit: "kWc" },
      { label: "Secteur", value: "Résidentiel premium" },
      { label: "Mise en service", value: "2024" },
    ],
    chapters: [
      {
        kind: "context",
        title: "Contexte",
        body: "Villa résidentielle équipée en CVC, piscine chauffée et borne VE, avec une facture électrique structurellement élevée.",
      },
      {
        kind: "challenge",
        title: "Défi",
        body: "Atteindre l'autoconsommation maximale tout en préservant la qualité architecturale du bâtiment.",
      },
      {
        kind: "solution",
        title: "Solution SEWT",
        body: "Modules black-on-black intégrés en toiture, onduleur hybride, supervision domotique unifiée.",
      },
      {
        kind: "results",
        title: "Résultats",
        body: "Facture résiduelle proche de zéro sur les mois de fort ensoleillement, recharge VE à coût marginal nul.",
      },
    ],
    tags: ["residentiel", "premium", "ve"],
  },
];

export function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
