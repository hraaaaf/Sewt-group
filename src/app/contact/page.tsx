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

          {/* Carte réelle, sans localisation précise fictive de l'entreprise. */}
          <section aria-labelledby="contact-location-heading">
            <div className="mb-5">
              <h2 id="contact-location-heading" className="font-display text-2xl font-semibold text-fg sm:text-3xl">
                Nous situer
              </h2>
              <p className="mt-2 text-sm text-fg-muted">Témara, Maroc</p>
            </div>
            <div className="h-[320px] overflow-hidden rounded-xl border border-border bg-bg-elevated sm:h-[400px] lg:h-[440px]">
              <iframe
                title="Carte de Témara, Maroc"
                src="https://maps.google.com/maps?q=T%C3%A9mara%2C%20Maroc&z=12&output=embed"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
            <a
              href="https://maps.google.com/?q=Temara,+Maroc"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm text-fg-muted underline underline-offset-4 transition-colors hover:text-accent"
            >
              Ouvrir dans Google Maps
            </a>
          </section>
        </Container>
      </main>
      <div className="snap-start snap-always">
        <Footer />
      </div>
    </>
  );
}
