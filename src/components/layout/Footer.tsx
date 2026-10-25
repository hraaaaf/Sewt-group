import { Container } from "@/components/layout/Container";
import { BackToTop } from "@/components/ui/BackToTop";
import { cn } from "@/lib/cn";

interface FooterGroup {
  title: string;
  items: { label: string; href: string }[];
}

const groups: FooterGroup[] = [
  {
    title: "Expertises",
    items: [
      { label: "Distribution solaire", href: "/#offre" },
      { label: "EPC clé en main", href: "/#offre" },
      { label: "Exploitation & O&M", href: "/#offre" },
    ],
  },
  {
    title: "Groupe",
    items: [
      { label: "Histoire", href: "/#histoire" },
      { label: "Réalisations", href: "/#flagship" },
      { label: "Impact", href: "/#impact" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className={cn(
        "relative isolate overflow-hidden border-t border-border",
        "bg-bg-elevated/40",
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10 gradient-mesh-dark opacity-20" />

      <Container className="pt-12">
        {/* === Sitemap — directement, CTA supprimé (présent dans Contact) === */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-lg font-semibold text-fg">SEWT Group</p>
            <p className="mt-3 max-w-xs text-sm text-fg-muted">
              Sun Energy and Water Technologies. EPC marocain indépendant fondé en 1992.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* === Bottom : meta === */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs uppercase tracking-wide text-fg-subtle">
            © {new Date().getFullYear()} SEWT Group · Tous droits réservés
          </p>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wide text-fg-subtle">
            <a href="#legal" className="transition-colors hover:text-fg">
              Mentions légales
            </a>
            <a href="#privacy" className="transition-colors hover:text-fg">
              Confidentialité
            </a>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}
