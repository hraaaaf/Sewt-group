import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero/Hero";
import { OffreChapter } from "@/components/sections/Offre/OffreChapter";
import { FlagshipSlider } from "@/components/sections/Flagship/FlagshipSlider";
import { ImpactSection } from "@/components/sections/Impact/ImpactSection";
import { HistoireTimeline } from "@/components/sections/Histoire/HistoireTimeline";
import { LeGroupe } from "@/components/sections/LeGroupe/LeGroupe";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main" className="relative bg-bg">
        {/* 01 — Hero cinématique */}
        <Hero />

        {/* 02 — Raison d’être, bénéfices et chiffres clés réunis */}
        <ImpactSection />

        {/* 04 — Expertises (Distribution · EPC · O&M) */}
        <OffreChapter />

        {/* 05 — Réalisations sélectionnées */}
        <FlagshipSlider />

        {/* 08 — Histoire du groupe */}
        <HistoireTimeline />

        {/* 09 — Le Groupe / Fondateur / Équipe / Équipements */}
        <LeGroupe />

      </main>

      <Footer />
    </>
  );
}
