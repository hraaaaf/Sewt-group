import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations sur l'éditeur et l'hébergement du site SEWT Group.",
  robots: { index: false, follow: false },
};

export default function LegalNoticesPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-svh bg-bg pb-24 pt-32">
        <Container>
          <article className="mx-auto max-w-3xl">
            <p className="section-label">Informations du site</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-fg sm:text-5xl">Mentions légales</h1>
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">Informations au 26 octobre 2026.</p>

            <section className="mt-10 space-y-3" aria-labelledby="legal-editor">
              <h2 id="legal-editor" className="font-display text-2xl font-bold text-fg">Éditeur</h2>
              <p className="text-fg-muted">
                SEWT Group — Sun Energy and Water Technologies Group, société à responsabilité
                limitée (SARL), exerçant des activités d'études et de solutions énergétiques.
              </p>
              <p className="text-fg-muted">Localisation communiquée : Témara, Maroc.</p>
              <p className="text-fg-muted">Contact : <a className="text-accent underline underline-offset-4" href="mailto:contact@sewt-group.ma">contact@sewt-group.ma</a>.</p>
              <dl className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-bg-elevated/60 p-5 text-sm text-fg-muted sm:grid-cols-2">
                <div><dt className="font-semibold text-fg">Registre de commerce</dt><dd>139871 — Témara</dd></div>
                <div><dt className="font-semibold text-fg">ICE</dt><dd>003317571000039</dd></div>
                <div><dt className="font-semibold text-fg">Capital social</dt><dd>100 000 MAD</dd></div>
                <div><dt className="font-semibold text-fg">Forme</dt><dd>SARL</dd></div>
              </dl>
              <p className="text-sm leading-relaxed text-fg-muted">
                Les références ci-dessus ont été recoupées dans des registres et
                annuaires publics. Le siège social complet et le représentant
                légal sont à confirmer à partir d'un extrait RC récent avant publication.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="legal-host">
              <h2 id="legal-host" className="font-display text-2xl font-bold text-fg">Hébergement</h2>
              <p className="text-fg-muted">
                L'application web est déployée sur l'infrastructure de Vercel.
                Les coordonnées contractuelles précises de l'entité hébergeuse
                et la région d'hébergement seront confirmées avant la publication définitive.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="legal-content">
              <h2 id="legal-content" className="font-display text-2xl font-bold text-fg">Contenus et droits</h2>
              <p className="text-fg-muted">
                Les textes, marques, photographies et autres éléments présentés sur ce site
                sont protégés selon les droits applicables de leurs titulaires. Leur
                reproduction ou réutilisation nécessite l'autorisation des titulaires de droits,
                sauf exception prévue par la loi.
              </p>
              <p className="text-fg-muted">
                Les renseignements publiés présentent les activités du groupe à titre
                informatif et ne constituent pas une offre contractuelle ferme.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="legal-privacy">
              <h2 id="legal-privacy" className="font-display text-2xl font-bold text-fg">Données personnelles</h2>
              <p className="text-fg-muted">
                La collecte des coordonnées au moyen du formulaire de contact est décrite
                dans notre <a className="text-accent underline underline-offset-4" href="/confidentialite">politique de confidentialité</a>.
                Le traitement est soumis notamment à la loi marocaine n° 09-08 et aux
                formalités applicables auprès de la CNDP.
              </p>
            </section>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
