import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { LeGroupe } from "@/components/sections/LeGroupe/LeGroupe";
import { HistoireTimeline } from "@/components/sections/Histoire/HistoireTimeline";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "Depuis 2010, SEWT Group construit l'autonomie énergétique du Maroc jalon par jalon. Découvrez notre parcours : de la fondation par M. Ali HAJJI à 2,15 MWc cumulés et 9 projets opérationnels.",
};

export default function NotreHistoirePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative pt-20">
        <LeGroupe />
        <HistoireTimeline />
      </main>
      <Footer />
    </>
  );
}
