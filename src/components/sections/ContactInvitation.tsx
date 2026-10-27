import { ContactMessageDialog } from "@/components/sections/ContactMessageDialog";

const steps = [
  {
    number: "01",
    title: "Comprendre vos usages",
    body: "Nous partons des besoins énergétiques de votre entreprise, de votre exploitation ou de votre site industriel.",
  },
  {
    number: "02",
    title: "Étudier la solution",
    body: "L’étude permet de définir un système solaire adapté à vos usages et aux caractéristiques de votre site.",
  },
  {
    number: "03",
    title: "Installer et accompagner",
    body: "Après l’installation, l’exploitation et la maintenance contribuent au suivi de vos équipements.",
  },
] as const;

export function ContactInvitation() {
  return (
    <section
      id="nous-en-parler"
      aria-labelledby="nous-en-parler-heading"
      className="bg-bg px-5 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="section-label">Nous en parler</p>
        <h2
          id="nous-en-parler-heading"
          className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-fg sm:text-4xl lg:text-5xl"
        >
          Parlons de votre projet énergétique.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="rounded-2xl border border-border bg-bg-elevated/50 p-7">
              <p className="font-mono text-sm font-semibold text-accent">{step.number}</p>
              <h3 className="mt-4 font-display text-xl font-bold text-fg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-9">
          <ContactMessageDialog />
        </div>
      </div>
    </section>
  );
}
