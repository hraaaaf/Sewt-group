"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Gauge,
  Leaf,
  Loader2,
  Lock,
  PiggyBank,
  Timer,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import {
  computeRoi,
  DEFAULT_ASSUMPTIONS,
  formatKwc,
  formatMad,
  formatMadCompact,
  formatTons,
  formatYears,
  ROI_BOUNDS,
} from "@/lib/roi";
import { RoiSlider } from "./RoiSlider";
import { RoiOutput } from "./RoiOutput";

/* ─── Types ─────────────────────────────────────────────── */
type GateStatus = "locked" | "unlocked";
type SubmitStatus = "idle" | "submitting" | "ok" | "error";
type ContactStatus = "idle" | "submitting" | "ok" | "error";

/* ─── Constantes ─────────────────────────────────────────── */
const CONTACT_PHONE      = "+212 667 356 794";
const CONTACT_PHONE_HREF = "+212667356794";
const CONTACT_EMAIL      = "contact@sewt-group.ma";
const CONTACT_LOCATION   = "Résidence Islah, Temara, Maroc";
const CONTACT_MAPS_URL   =
  "https://www.google.com/maps/search/?api=1&query=R%C3%A9sidence+Islah+Temara+Maroc";

const FACTURE_PRESETS = [
  { label: "Maison",     value: 1_500  },
  { label: "PME",        value: 15_000 },
  { label: "Industrie",  value: 45_000 },
  { label: "Grand site", value: 150_000 },
] as const;

const inputCls = cn(
  "w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-fg",
  "placeholder:text-fg-subtle/60",
  "transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25",
);

/* ═══════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════ */
export function RoiSimulator() {
  const [monthlyBill, setMonthlyBill]   = useState<number>(ROI_BOUNDS.default);
  const [editingBill, setEditingBill]   = useState(false);
  const [billInput,   setBillInput]     = useState("");
  const [gate, setGate]                 = useState<GateStatus>("locked");
  const [gateEmail, setGateEmail]       = useState("");
  const [gatePhone, setGatePhone]       = useState("");
  const [gateRgpd, setGateRgpd]         = useState(false);
  const [gateStatus, setGateStatus]     = useState<SubmitStatus>("idle");
  const [csrfToken, setCsrfToken]       = useState("");
  const roiGateSubmissionRef = useRef<{ fingerprint: string; id: string } | null>(null);
  const sliderHint = `Couverture estimée · ${Math.round(DEFAULT_ASSUMPTIONS.selfConsumptionRate * 100)} % de la facture`;

  useEffect(() => {
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((d: { token?: string }) => { if (d.token) setCsrfToken(d.token); })
      .catch(() => {});
  }, []);

  const roi = useMemo(() => computeRoi({ monthlyBillMad: monthlyBill }), [monthlyBill]);

  const startEditBill = useCallback(() => {
    setBillInput(monthlyBill === 0 ? "" : String(monthlyBill));
    setEditingBill(true);
  }, [monthlyBill]);

  const commitBill = useCallback(() => {
    const parsed = parseInt(billInput.replace(/\s/g, ""), 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setMonthlyBill(Math.min(parsed, ROI_BOUNDS.max));
    }
    setEditingBill(false);
  }, [billInput]);

  /* ── Déverrouillage ── */
  async function handleUnlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!gateEmail || !gatePhone || !gateRgpd || gateStatus === "submitting") return;
    setGateStatus("submitting");
    try {
      const payload = {
        email: gateEmail,
        phone: gatePhone,
        monthlyBill,
        roi,
        rgpd: true,
        source: "roi-gate" as const,
      };
      const fingerprint = JSON.stringify(payload);
      if (!roiGateSubmissionRef.current || roiGateSubmissionRef.current.fingerprint !== fingerprint) {
        roiGateSubmissionRef.current = { fingerprint, id: crypto.randomUUID() };
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({ ...payload, submissionId: roiGateSubmissionRef.current.id }),
      }).catch(() => null);
      if (res?.ok) {
        roiGateSubmissionRef.current = null;
        setGate("unlocked");
        setGateStatus("ok");
      } else {
        setGateStatus("error");
      }
    } catch {
      setGateStatus("error");
    }
  }

  return (
    <>
      {/* ══════════════════════════════════════════
          Section ROI
         ══════════════════════════════════════════ */}
      <section
        id="roi"
        data-chapter="roi"
        data-chapter-label="Simulateur ROI"
        className="relative bg-bg py-20 md:py-28 lg:py-32"
      >
        <Container>
          {/* Header */}
          <div className="max-w-2xl">
            <p className="section-label mb-5">Pré-étude solaire</p>
            <h2 className="font-display font-bold text-fg text-balance leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
              Pré-évaluez le potentiel solaire{" "}
              <span className="text-accent">de votre site.</span>
            </h2>
            <p className="mt-5 max-w-prose font-sans text-base text-fg-muted leading-relaxed text-pretty">
              Estimez votre puissance recommandée, vos économies annuelles et votre retour
              sur investissement avant étude technique complète. Renseignez votre facture
              mensuelle pour accéder à votre simulation personnalisée.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* ── Colonne gauche : Slider ── */}
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                  Votre facture électrique mensuelle
                </p>
                {editingBill ? (
                  <div className="mt-2 flex items-baseline gap-2">
                    <input
                      autoFocus
                      type="number"
                      min={0}
                      max={ROI_BOUNDS.max}
                      value={billInput}
                      onChange={(e) => setBillInput(e.target.value)}
                      onBlur={commitBill}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitBill();
                        if (e.key === "Escape") setEditingBill(false);
                      }}
                      className="w-40 bg-transparent font-display text-3xl font-bold tracking-tight text-fg tabular-nums outline-none border-b-2 border-accent focus:border-accent"
                    />
                    <span className="font-mono text-base font-normal text-fg-subtle">MAD / mois</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startEditBill}
                    title="Cliquer pour saisir un montant"
                    className="group mt-2 flex items-baseline gap-2 rounded-lg px-0 transition-colors hover:text-accent"
                  >
                    <span className="font-display text-3xl font-bold tracking-tight text-fg tabular-nums group-hover:text-accent transition-colors">
                      {formatMad(monthlyBill)}
                    </span>
                    <span className="font-mono text-base font-normal text-fg-subtle">/ mois</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-subtle/50 group-hover:text-accent/70 transition-colors">
                      ✎
                    </span>
                  </button>
                )}
              </div>

              <RoiSlider value={monthlyBill} onChange={setMonthlyBill} hint={sliderHint} />

              {/* Presets */}
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                  Profils types
                </p>
                <div className="flex flex-wrap gap-2">
                  {FACTURE_PRESETS.map((p) => {
                    const isActive = Math.abs(monthlyBill - p.value) < ROI_BOUNDS.step;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setMonthlyBill(p.value)}
                        className={cn(
                          "rounded-pill border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em]",
                          "transition-colors duration-200",
                          isActive
                            ? "border-accent bg-accent text-[rgb(248_246_240)]"
                            : "border-border bg-bg text-fg-muted hover:border-accent/60 hover:text-fg",
                        )}
                      >
                        {p.label}
                        <span className="ml-1.5 opacity-70">
                          {p.value >= 1000 ? `${p.value / 1000}k` : p.value}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mini preview (toujours visible) */}
              <div className="mt-auto rounded-xl border border-accent/20 bg-accent/5 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Économie mensuelle estimée
                </p>
                <p className="mt-1 font-display text-2xl font-bold tracking-tight text-fg tabular-nums">
                  {formatMad(roi.monthlySavingMad)}
                  <span className="ml-1.5 font-mono text-sm font-normal text-fg-subtle">/ mois</span>
                </p>
                <p className="mt-1 font-mono text-[10px] text-fg-subtle">
                  Soit {formatMadCompact(roi.horizonSavingMad)} sur 10 ans
                </p>
              </div>
            </div>

            {/* ── Colonne droite : Résultats gated ── */}
            <div className="relative">
              {/* Outputs — toujours rendus, blur si locked */}
              <div
                className={cn(
                  "grid grid-cols-1 gap-3 transition-all duration-500 sm:grid-cols-2",
                  gate === "locked" && "pointer-events-none select-none blur-sm opacity-50",
                )}
                aria-hidden={gate === "locked"}
              >
                <RoiOutput emphasis="primary" label="Économie 10 ans" value={roi.horizonSavingMad} format={formatMadCompact} icon={PiggyBank} hint={`Soit ${formatMad(roi.monthlySavingMad)} / mois`} />
                <RoiOutput label="Puissance recommandée" value={roi.recommendedKwc} format={formatKwc} unit="kWc" icon={Gauge} hint="Net après pertes système (~14 %)" />
                <RoiOutput label="Payback estimé" value={roi.paybackYears} format={formatYears} unit="années" icon={Timer} hint="CAPEX / économies annuelles" />
                <RoiOutput label="CO₂ évité par an" value={roi.yearlyCo2AvoidedT} format={formatTons} unit="t / an" icon={Leaf} hint={`Facteur réseau MA · ${DEFAULT_ASSUMPTIONS.gridEmissionFactorTco2PerMwh} tCO₂/MWh`} />
                <RoiOutput label="Investissement clé en main" value={roi.estimatedCapexMad} format={formatMadCompact} icon={CircleDollarSign} hint="HT · ingénierie + fournitures + installation" />
                <RoiOutput label="Surface estimée" value={roi.surfaceM2} format={(v) => `${Math.round(v).toLocaleString("fr-FR")}`} unit="m²" icon={Gauge} hint="Modules mono 540 Wc + circulation" />
              </div>

              {/* ── Gate overlay ── */}
              <AnimatePresence>
                {gate === "locked" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-elevated/95 p-6 shadow-[0_16px_48px_rgba(17,28,56,0.12)] backdrop-blur-sm sm:p-8">
                      <div className="mb-6">
                        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/8 text-accent">
                          <Lock className="h-3.5 w-3.5" aria-hidden />
                        </div>
                        <p className="font-display text-lg font-bold text-fg leading-snug">
                          Recevez votre note d'opportunité
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                          Estimation ingénieur · gratuite · sans engagement
                        </p>
                      </div>

                      <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                        <label className="flex flex-col gap-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                            Adresse e-mail
                          </span>
                          <input
                            type="email"
                            required
                            placeholder="vous@entreprise.ma"
                            value={gateEmail}
                            onChange={(e) => setGateEmail(e.target.value)}
                            className={inputCls}
                          />
                        </label>

                        <label className="flex flex-col gap-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                            Téléphone
                          </span>
                          <input
                            type="tel"
                            required
                            placeholder="+212 6XX XXX XXX"
                            value={gatePhone}
                            onChange={(e) => setGatePhone(e.target.value)}
                            className={inputCls}
                          />
                        </label>

                        <label className="inline-flex items-start gap-2 text-xs text-fg-subtle">
                          <input type="checkbox" required checked={gateRgpd}
                            onChange={(e) => setGateRgpd(e.target.checked)}
                            className="mt-0.5 h-4 w-4 accent-accent" />
                          <span>J'accepte que SEWT traite ces informations pour répondre à ma demande.</span>
                        </label>

                        {gateStatus === "error" && (
                          <p role="alert" className="text-xs text-danger">
                            Envoi indisponible. Réessayez ou écrivez-nous à {CONTACT_EMAIL}.
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={gateStatus === "submitting" || !gateEmail || !gatePhone || !gateRgpd}
                          className={cn(
                            "mt-1 inline-flex items-center justify-center gap-2 rounded-pill",
                            "bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em]",
                            "text-[rgb(248_246_240)] transition-all duration-200",
                            "hover:bg-accent-hover hover:-translate-y-0.5",
                            "disabled:opacity-50 disabled:pointer-events-none",
                          )}
                        >
                          {gateStatus === "submitting" ? (
                            <><Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />Chargement…</>
                          ) : (
                            <>Recevoir ma simulation <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></>
                          )}
                        </button>

                        <p className="text-center font-mono text-[9px] text-fg-subtle/60">
                          Note d'opportunité gratuite · Réponse sous 48h · Données confidentielles
                        </p>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Unlocked confirmation */}
              <AnimatePresence>
                {gate === "unlocked" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle"
                  >
                    Simulation indicative · L'étude détaillée affine selon profil de charge,
                    orientation et tarif réel.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          Section Contact — fusionnée avec CTA final
         ══════════════════════════════════════════ */}
      <ContactSection csrfToken={csrfToken} monthlyBill={monthlyBill} roi={roi} />
    </>
  );
}

/* ─── Section Contact ───────────────────────────────────── */
interface ContactSectionProps {
  csrfToken: string;
  monthlyBill: number;
  roi: ReturnType<typeof computeRoi>;
}

type Sector = "industrie" | "agriculture" | "tertiaire" | "public" | "marine";
const SECTOR_OPTIONS: { value: Sector; label: string }[] = [
  { value: "industrie",  label: "Industrie"  },
  { value: "agriculture",label: "Agriculture"},
  { value: "tertiaire",  label: "Tertiaire"  },
  { value: "public",     label: "Public"     },
  { value: "marine",     label: "Marine"     },
];

export function ContactSection({ csrfToken, monthlyBill, roi }: ContactSectionProps) {
  const [name,    setName]    = useState("");
  const [company, setCompany] = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [sector,  setSector]  = useState<Sector>("industrie");
  const [message, setMessage] = useState("");
  const [rgpd,    setRgpd]    = useState(false);
  const [hp,      setHp]      = useState("");
  const [status,  setStatus]  = useState<ContactStatus>("idle");
  const contactSubmissionRef = useRef<{ fingerprint: string; id: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (hp.trim().length > 0) {
      setStatus("ok"); return;
    }
    setStatus("submitting");
    try {
      const payload = { name, company, email, phone, sector, message, monthlyBill, roi, rgpd, _hp: hp, source: "contact-form" as const };
      const fingerprint = JSON.stringify(payload);
      if (!contactSubmissionRef.current || contactSubmissionRef.current.fingerprint !== fingerprint) {
        contactSubmissionRef.current = { fingerprint, id: crypto.randomUUID() };
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({ ...payload, submissionId: contactSubmissionRef.current.id }),
      }).catch(() => null);
      if (res?.ok) contactSubmissionRef.current = null;
      setStatus(res?.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      data-chapter="contact"
      data-chapter-label="Contact"
      className="relative border-t border-border bg-bg-elevated py-14"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Gauche : titre + coordonnées */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-h1 font-bold tracking-tight text-fg text-balance">
              Un projet à étudier ?{" "}
              <span className="text-accent">Parlons-en.</span>
            </h2>
            <p className="mt-4 max-w-prose text-fg-muted text-pretty">
              Décrivez votre site. Un ingénieur SEWT vous répond avec une note d'opportunité
              chiffrée — productible, payback et CAPEX clé en main.
            </p>

            <dl className="mt-8 flex flex-col gap-4 font-mono text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle">Siège</dt>
                <dd className="mt-1">
                  <a href={CONTACT_MAPS_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-fg transition-colors hover:text-accent">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                    {CONTACT_LOCATION}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle">E-mail</dt>
                <dd className="mt-1">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-fg transition-colors hover:text-accent">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle">Téléphone</dt>
                <dd className="mt-1">
                  <a href={`tel:${CONTACT_PHONE_HREF}`} className="text-fg tabular-nums transition-colors hover:text-accent">
                    {CONTACT_PHONE}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Droite : formulaire */}
          <div className="lg:col-span-7">
            {status === "ok" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-bg p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display text-h3 font-semibold text-fg">Demande reçue.</h3>
                <p className="text-fg-muted text-pretty">
                  Un ingénieur SEWT vous recontacte sous 48 h ouvrées avec votre simulation chiffrée.
                </p>
                <button type="button" onClick={() => setStatus("idle")}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent hover:text-accent-hover">
                  Envoyer un autre dossier →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                {/* Honeypot */}
                <div aria-hidden className="absolute -left-[9999px]">
                  <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField label="Nom">
                    <input type="text" required placeholder="M. Untel" value={name}
                      onChange={(e) => setName(e.target.value)} className={inputCls} />
                  </FormField>
                  <FormField label="Société">
                    <input type="text" placeholder="Industrie XYZ" value={company}
                      onChange={(e) => setCompany(e.target.value)} className={inputCls} />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField label="E-mail">
                    <input type="email" required placeholder="contact@xyz.ma" value={email}
                      onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                  </FormField>
                  <FormField label="Téléphone">
                    <input type="tel" placeholder="+212 6XX XXX XXX" value={phone}
                      onChange={(e) => setPhone(e.target.value)} className={inputCls} />
                  </FormField>
                </div>

                {/* Secteur */}
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">Secteur</p>
                  <div className="flex flex-wrap gap-2">
                    {SECTOR_OPTIONS.map((s) => (
                      <button key={s.value} type="button" aria-pressed={sector === s.value}
                        onClick={() => setSector(s.value)}
                        className={cn(
                          "rounded-pill border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200",
                          sector === s.value
                            ? "border-accent bg-accent text-[rgb(248_246_240)]"
                            : "border-border bg-bg text-fg-muted hover:border-accent/50 hover:text-fg",
                        )}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <FormField label="Description du projet (facultatif)">
                  <textarea placeholder="Surface disponible, contraintes site, échéance…"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    rows={3} className={cn(inputCls, "resize-y min-h-[80px]")} />
                </FormField>

                <label className="inline-flex items-start gap-3 text-xs text-fg-subtle">
                  <input type="checkbox" required checked={rgpd}
                    onChange={(e) => setRgpd(e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-accent" />
                  <span className="text-pretty">
                    J'accepte que SEWT traite ces informations pour répondre à ma demande.
                    Aucune revente à des tiers.
                  </span>
                </label>

                {status === "error" && (
                  <p role="alert" className="inline-flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/8 px-3 py-2 font-mono text-[11px] text-danger">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Erreur d'envoi · réessayez ou{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-accent">
                      écrivez-nous directement
                    </a>.
                  </p>
                )}

                <button type="submit" disabled={status === "submitting"}
                  className={cn(
                    "mt-1 inline-flex items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5",
                    "font-mono text-xs uppercase tracking-[0.16em] text-[rgb(248_246_240)]",
                    "transition-all duration-200 hover:bg-accent-hover hover:-translate-y-0.5",
                    "disabled:opacity-60 disabled:pointer-events-none",
                  )}>
                  {status === "submitting" ? (
                    <><Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />Envoi…</>
                  ) : (
                    <>Recevoir une note d'opportunité <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">{label}</span>
      {children}
    </label>
  );
}
