import { Mail, ArrowUpRight } from "lucide-react";

/** Lien e-mail direct, sans formulaire ni envoi par un serveur non configuré. */
export function ContactMessageDialog() {
  return (
    <a
      href="mailto:contact@sewt-group.ma?subject=Projet%20solaire%20SEWT"
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Mail className="h-4 w-4" aria-hidden />
      Nous écrire
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  );
}
