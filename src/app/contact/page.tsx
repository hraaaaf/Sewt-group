import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Mail, Phone, Printer, MapPin, ArrowUpRight } from "lucide-react";
import { ContactMessageDialog } from "@/components/sections/ContactMessageDialog";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-svh bg-bg pt-32 pb-16 snap-start snap-always">
        <Container>
          <div className="max-w-2xl text-center mx-auto mb-16">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg mb-6">
              Contactez-nous
            </h1>
            <p className="text-lg text-fg-muted text-balance leading-relaxed">
              Chaque site a ses contraintes et ses habitudes. Nous abordons le projet à partir de vos besoins énergétiques, puis vous accompagnons de l’étude au suivi des équipements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {/* Cartes de contact premium */}
            {[
              { icon: Mail, label: "E-mail", value: "contact@sewt-group.ma", href: "mailto:contact@sewt-group.ma" },
              { icon: Phone, label: "Téléphone", value: "(+212) 661 117 155", href: "tel:+212661117155" },
              { icon: Printer, label: "Fax", value: "(+212) 537 741 233" },
              { icon: MapPin, label: "Adresse", value: "Témara, Maroc", href: "https://maps.google.com/?q=Temara,+Maroc" },
            ].map((item, i) => (
              <div key={i} className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-border-strong bg-bg-elevated/40 backdrop-blur-glass transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-glow">
                <div className="h-14 w-14 rounded-full bg-surface border border-border flex items-center justify-center text-accent mb-6 transition-all duration-300 group-hover:bg-accent group-hover:text-bg group-hover:scale-110">
                  <item.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-xl font-bold tracking-tight text-fg mb-3">{item.label}</h2>
                {item.href ? (
                  <a href={item.href} target={item.label === "Adresse" ? "_blank" : "_self"} rel="noopener noreferrer" className="font-mono text-sm text-fg-muted hover:text-accent transition-colors flex items-center gap-1">
                    {item.value} <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : (
                  <p className="font-mono text-sm text-fg-muted text-balance">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mb-20 flex justify-center">
            <ContactMessageDialog />
          </div>

          <section aria-labelledby="processus-heading" className="mb-20">
            <h2 id="processus-heading" className="font-display text-3xl font-bold text-fg sm:text-4xl">
              De vos besoins à la mise en service.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
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
              ].map((step) => (
                <article key={step.number} className="rounded-2xl border border-border bg-bg-elevated/50 p-7">
                  <p className="font-mono text-sm font-semibold text-accent">{step.number}</p>
                  <h3 className="mt-4 font-display text-xl font-bold text-fg">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Premium Map Area */}
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] min-h-[400px] rounded-3xl overflow-hidden border border-border-strong group isolate">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 mix-blend-overlay bg-brand/10 pointer-events-none" />
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/contact-map.png" 
              alt="Carte de localisation SEWT" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[30s] ease-linear group-hover:scale-110"
            />
            
            {/* Glassmorphic Overlay for address */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:bottom-8 md:left-8 z-20 max-w-sm p-6 rounded-2xl border border-white/10 bg-bg-elevated/80 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-subtle">Bureau d'études central</p>
              </div>
              <p className="font-display text-2xl font-bold tracking-tight text-fg">SEWT Group HQ</p>
              <p className="mt-3 font-mono text-sm text-fg-muted leading-relaxed">
                Témara, Maroc
              </p>
            </div>
          </div>
        </Container>
      </main>
      <div className="snap-start snap-always">
        <Footer />
      </div>
    </>
  );
}
