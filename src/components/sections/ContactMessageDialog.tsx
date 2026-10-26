"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Mail, ArrowUpRight, X } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactMessageDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const submission = useRef<{ signature: string; id: string } | null>(null);
  const [csrf, setCsrf] = useState("");
  const [loadingError, setLoadingError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function open() {
    setStatus("idle");
    setCsrf("");
    setLoadingError(false);
    dialog.current?.showModal();
    emailInput.current?.focus();
    void fetch("/api/csrf", { credentials: "same-origin", cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("csrf");
        const data: { token?: string } = await response.json();
        if (!data.token) throw new Error("csrf");
        setCsrf(data.token);
      })
      .catch(() => setLoadingError(true));
  }

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || !consent || !csrf) return;
    const payload = {
      email: email.trim(),
      name: name.trim() || undefined,
      message: message.trim(),
      rgpd: true as const,
      _hp: trap,
      source: "contact-form" as const,
    };
    const signature = JSON.stringify(payload);
    if (!submission.current || submission.current.signature !== signature) {
      submission.current = { signature, id: crypto.randomUUID() };
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrf },
        body: JSON.stringify({ ...payload, submissionId: submission.current.id }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) { setStatus("error"); return; }
      submission.current = null;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button type="button" onClick={open}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent/90">
        <Mail className="h-4 w-4" aria-hidden />Nous écrire<ArrowUpRight className="h-4 w-4" aria-hidden />
      </button>
      <p className="max-w-xl text-sm text-fg-muted">
        Rédigez votre message dans une fenêtre dédiée, sans quitter cette page.
      </p>
      <dialog ref={dialog} aria-labelledby="sewt-contact-dialog-title"
        onClose={() => setCsrf("")}
        className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-bg p-0 text-fg shadow-2xl backdrop:bg-black/65">
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id="sewt-contact-dialog-title" className="font-display text-2xl font-bold">Écrire à SEWT</h2>
              <p className="mt-2 text-sm text-fg-muted">Votre message sera adressé à notre équipe.</p>
            </div>
            <button type="button" onClick={() => dialog.current?.close()}
              aria-label="Fermer la fenêtre de message"
              className="rounded-full p-2 text-fg-muted hover:bg-surface hover:text-fg">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          {status === "success" ? (
            <div role="status" className="space-y-4">
              <p className="font-semibold">Votre demande a été acceptée par le service d’envoi.</p>
              <p className="text-sm text-fg-muted">La réception dans la boîte de SEWT reste à confirmer.</p>
              <button type="button" onClick={() => dialog.current?.close()}
                className="rounded-full bg-accent px-6 py-3 font-semibold text-white">Fermer</button>
            </div>
          ) : (
            <form onSubmit={send} className="space-y-4">
              <label className="block text-sm font-medium">
                Votre adresse e-mail
                <input ref={emailInput} type="email" required maxLength={254} autoComplete="email"
                  value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@entreprise.ma"
                  className="mt-2 block w-full rounded-xl border border-border-strong bg-bg-elevated p-3 text-fg" />
              </label>
              <label className="block text-sm font-medium">
                Votre nom (facultatif)
                <input type="text" maxLength={100} autoComplete="name" value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-border-strong bg-bg-elevated p-3 text-fg" />
              </label>
              <label className="block text-sm font-medium">
                Votre message
                <textarea required minLength={10} maxLength={2000} rows={5} value={message}
                  onChange={e => setMessage(e.target.value)} placeholder="Parlez-nous de votre projet…"
                  className="mt-2 block w-full resize-y rounded-xl border border-border-strong bg-bg-elevated p-3 text-fg" />
              </label>
              <label className="absolute -left-[9999px]" aria-hidden="true">
                Site internet
                <input tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} />
              </label>
              <label className="flex items-start gap-3 text-sm text-fg-muted">
                <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-accent" />
                <span>J’accepte que SEWT utilise mes coordonnées pour répondre à ma demande.</span>
              </label>
              {(status === "error" || loadingError) && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                  L’envoi en ligne n’a pas pu être confirmé. Utilisez votre messagerie ci-dessous.
                </p>
              )}
              <button type="submit" disabled={status === "sending" || !csrf}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
                {status === "sending" ? "Envoi en cours…" : "Envoyer mon message"}
              </button>
              <a href="mailto:contact@sewt-group.ma?subject=Projet%20solaire%20SEWT"
                className="block text-center text-sm text-accent underline underline-offset-4">
                Ouvrir ma messagerie à la place
              </a>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
