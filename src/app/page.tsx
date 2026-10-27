import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero/Hero";
import { OffreChapter } from "@/components/sections/Offre/OffreChapter";
import { FlagshipSlider } from "@/components/sections/Flagship/FlagshipSlider";
import { ContactInvitation } from "@/components/sections/ContactInvitation";
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

        {/* 03 — Timeline immédiatement après la raison d’être (document p.4) */}
        <HistoireTimeline />

        {/* 04 — Groupe, fondateur et équipe, réunis après la timeline (p.5–6) */}
        <LeGroupe />

        {/* 05 — Expertises */}
        <OffreChapter />

        {/* 06 — Réalisations et partenaires */}
        <FlagshipSlider />

        {/* 07 — Nous en parler : parcours et prise de contact */}
        <ContactInvitation />

      </main>

      <Footer />
    </>
  );
}
