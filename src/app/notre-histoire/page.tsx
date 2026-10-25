import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { LeGroupe } from "@/components/sections/LeGroupe/LeGroupe";
import { HistoireTimeline } from "@/components/sections/Histoire/HistoireTimeline";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "Depuis 1992, une expertise énergétique construite au Maroc. Découvrez les étapes du groupe SEWT et les personnes qui accompagnent ses projets.",
};

export default function NotreHistoirePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative pt-20">
        <HistoireTimeline />
        <LeGroupe />
      </main>
      <Footer />
    </>
  );
}
