import { Container } from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="relative isolate overflow-hidden border-t border-border bg-bg-elevated/40">
      <div aria-hidden className="absolute inset-0 -z-10 gradient-mesh-dark opacity-20" />
      <Container className="flex flex-col items-start justify-between gap-6 py-9 sm:flex-row sm:items-center">
        <Link href="/" aria-label="SEWT Group — accueil" className="inline-flex shrink-0 items-center">
          <Image
            src="/brand/sewt-official-color.png"
            alt="SEWT Group"
            width={176}
            height={62}
            className="h-12 w-auto object-contain dark:brightness-0 dark:invert"
          />
        </Link>
        <nav aria-label="Liens légaux" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/confidentialite" className="font-mono text-xs uppercase tracking-wide text-fg-subtle transition-colors hover:text-fg">
            Confidentialité
          </Link>
          <Link href="/mentions-legales" className="font-mono text-xs uppercase tracking-wide text-fg-subtle transition-colors hover:text-fg">
            Mentions légales
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
