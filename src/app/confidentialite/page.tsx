import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Informations sur les échanges par e-mail avec SEWT Group.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-svh bg-bg pb-24 pt-32">
        <Container>
          <article className="mx-auto max-w-3xl">
            <p className="section-label">Protection de vos données</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-fg sm:text-5xl">
              Politique de confidentialité
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">Mise à jour : 26 octobre 2026.</p>

            <section className="mt-10 space-y-3" aria-labelledby="privacy-operator">
              <h2 id="privacy-operator" className="font-display text-2xl font-bold">Responsable du traitement</h2>
              <p className="text-fg-muted">
                SEWT Group — Sun Energy and Water Technologies Group, Témara, Maroc.
                Pour toute question ou demande d'exercice de vos droits :
                {" "}<a className="text-accent underline underline-offset-4" href="mailto:contact@sewt-group.ma">contact@sewt-group.ma</a>.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="privacy-purpose">
              <h2 id="privacy-purpose" className="font-display text-2xl font-bold">Pourquoi recueillons-nous des données ?</h2>
              <p className="text-fg-muted">
                Le bouton « Nous écrire » ouvre votre messagerie avec le destinataire
                et l'objet préremplis. Aucun formulaire n'est affiché sur le site
                et aucun message n'est envoyé avant votre confirmation dans
                votre messagerie. Si vous envoyez un e-mail, vos coordonnées
                et son contenu servent à répondre à votre demande, sans inscription
                automatique à une liste de prospection.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="privacy-recipients">
              <h2 id="privacy-recipients" className="font-display text-2xl font-bold">Destinataires et prestataires</h2>
              <p className="text-fg-muted">
                Les messages que vous choisissez d'envoyer sont destinés à l'équipe SEWT
                chargée de répondre. Ils passent par les services de messagerie
                de l'expéditeur et du destinataire, et non par un formulaire du site.
                Le site est hébergé sur Vercel.
              </p>
              <p className="text-fg-muted">
                Certains prestataires peuvent traiter des données hors du Maroc.
                Les formalités CNDP applicables, notamment en matière de transferts
                internationaux, doivent être vérifiées et accomplies avant activation.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="privacy-retention">
              <h2 id="privacy-retention" className="font-display text-2xl font-bold">Sécurité et conservation</h2>
              <p className="text-fg-muted">
                Vous rédigez et envoyez votre message depuis votre application de messagerie,
                hors du site. Les courriels reçus doivent être conservés uniquement
                pendant la durée nécessaire au traitement des demandes et aux
                obligations applicables. SEWT doit confirmer ses durées de conservation.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="privacy-rights">
              <h2 id="privacy-rights" className="font-display text-2xl font-bold">Vos droits</h2>
              <p className="text-fg-muted">
                Conformément à la loi marocaine n° 09-08, vous disposez notamment de
                droits d'information, d'accès et de rectification ; vous pouvez également,
                pour des motifs légitimes, vous opposer à certains traitements.
                Écrivez à <a className="text-accent underline underline-offset-4" href="mailto:contact@sewt-group.ma">contact@sewt-group.ma</a> en décrivant votre demande.
                Vous pouvez également saisir la Commission nationale de contrôle de la
                protection des données à caractère personnel (CNDP).
              </p>
              <p className="rounded-xl border border-border bg-bg-elevated/60 p-4 text-sm text-fg-muted">
                Le numéro de récépissé ou d'autorisation CNDP et les informations
                définitives sur les transferts de données n'ont pas encore été communiqués.
                Leur vérification reste nécessaire pour les traitements concernés,
                notamment avant toute collecte directe future via le site.
              </p>
            </section>

            <section className="mt-10 space-y-3" aria-labelledby="privacy-cookies">
              <h2 id="privacy-cookies" className="font-display text-2xl font-bold">Cookies et préférences techniques</h2>
              <p className="text-fg-muted">
                Le bouton « Nous écrire » ne dépose aucun cookie de formulaire.
                Le site peut conserver localement un choix de thème d'affichage.
                Si des outils de mesure d'audience ou de publicité impliquant des
                données personnelles sont ajoutés, cette information devra être
                mise à jour et les consentements requis obtenus.
              </p>
            </section>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
