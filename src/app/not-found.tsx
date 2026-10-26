import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-svh items-center">
      <div aria-hidden className="absolute inset-0 -z-10 gradient-mesh-dark opacity-80" />
      <Container className="text-center">
        <p className="font-mono text-xs uppercase tracking-wide text-fg-subtle">Erreur 404</p>
        <h1 className="mt-4 font-display text-h1 font-bold tracking-tight text-fg">
          Cette page n'est pas câblée.
        </h1>
        <p className="mx-auto mt-4 max-w-prose text-fg-muted">
          Le lien que vous suivez ne correspond à aucun module connu. Retour à la centrale.
        </p>
        <div className="mt-10 flex justify-center">
          <LinkButton href="/" variant="primary" size="lg" withArrow>
            Retour à l'accueil
          </LinkButton>
        </div>
        {/* Préserve l'usage côté Next pour le prefetch */}
        <Link href="/" className="sr-only">
          Accueil
        </Link>
      </Container>
    </main>
  );
}
