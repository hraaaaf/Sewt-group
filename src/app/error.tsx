"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[SEWT] runtime error:", error);
    }
  }, [error]);

  return (
    <main id="main" className="relative flex min-h-svh items-center">
      <div aria-hidden className="absolute inset-0 -z-10 gradient-mesh-dark opacity-80" />
      <Container className="text-center">
        <p className="font-mono text-xs uppercase tracking-wide text-danger">
          Erreur d'exécution
        </p>
        <h1 className="mt-4 font-display text-h1 font-bold tracking-tight text-fg">
          Une coupure inattendue.
        </h1>
        <p className="mx-auto mt-4 max-w-prose text-fg-muted">
          Le module n'a pas pu être rendu. Réessayez. Si le problème persiste, l'équipe SEWT a
          déjà été notifiée.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-xs text-fg-subtle">ref: {error.digest}</p>
        ) : null}
        <div className="mt-10 flex justify-center">
          <Button onClick={() => reset()} variant="primary" size="lg" withArrow>
            Réessayer
          </Button>
        </div>
      </Container>
    </main>
  );
}
