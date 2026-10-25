import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero/Hero";
import { OffreChapter } from "@/components/sections/Offre/OffreChapter";
import { FlagshipSlider } from "@/components/sections/Flagship/FlagshipSlider";
import { ImpactSection } from "@/components/sections/Impact/ImpactSection";
import { HistoireTimeline } from "@/components/sections/Histoire/HistoireTimeline";
import { LeGroupe } from "@/components/sections/LeGroupe/LeGroupe";
import { PreuveChapter } from "@/components/sections/Preuve/PreuveChapter";
import { CtaBridge } from "@/components/sections/CtaBridge/CtaBridge";
import { RoiSimulator } from "@/components/sections/RoiSimulator/RoiSimulator";
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

        {/* CTA intermédiaire — ancre conversion après preuve terrain */}
        <CtaBridge />

        {/* 07 — Ils nous font confiance (références clients) */}
        <PreuveChapter />

        {/* 08 — Histoire du groupe */}
        <HistoireTimeline />

        {/* 09 — Le Groupe / Fondateur / Équipe / Équipements */}
        <LeGroupe />

        {/* 10 — Pré-étude solaire + Contact */}
        <RoiSimulator />
      </main>

      <Footer />
    </>
  );
}
