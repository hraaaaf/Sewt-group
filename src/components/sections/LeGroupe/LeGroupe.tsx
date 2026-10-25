"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";

const SUPPLIER_BRANDS = [
  { name: "Huawei",     src: "/brands/huawei.png" },
  { name: "Jinko Solar",src: "/brands/jinko_solar.png" },
  { name: "Deye",       src: "/brands/deye.png" },
  { name: "Euro Tray",  src: "/brands/euro_tray.png" },
  { name: "KBE Berlin", src: "/brands/kbe_berlin.png" },
  { name: "Suntherm",   src: "/brands/suntherm.png" },
  { name: "TW Solar",   src: "/brands/tw_solar.png" },
] as const;

const TEAM_DIRECTORS = [
  {
    name: "Amine Hajji",
    role: "Directeur des Projets",
    credentials: "Ing. · ENGEE Strasbourg",
    stat: "+100 centrales photovoltaïques livrées",
    src: "/team/amine-hajji.png",
    pos: "center 10%",
  },
  {
    name: "Ndiaga Mbodji",
    role: "Directeur Développement",
    credentials: "PhD · IAV Hassan II",
    stat: "100 MWc de projets développés et réalisés",
    src: "/team/ndiaga-mbodji.jpg",
    pos: "center 20%",
  },
] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };
}

export function LeGroupe() {
  return (
    <section id="le-groupe" aria-labelledby="le-groupe-heading" className="bg-bg">

      {/* ── BLOC 1 : Fondateur — portrait card + bio ── */}
      <div className="px-5 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16 lg:items-start">

          {/* Portrait card 1/3 */}
          <motion.div {...fadeUp()} className="lg:col-span-1">
            <div className="overflow-hidden rounded-2xl bg-[#f0ece4]">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/team/ali-hajji.png"
                  alt="M. Ali HAJJI — Fondateur SEWT Group"
                  fill
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  style={{ objectFit: "cover", objectPosition: "center 8%" }}
                />
              </div>
            </div>
            <div className="mt-4 pl-1">
              <p className="font-display font-bold text-fg" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
                M. Ali HAJJI
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                Fondateur · PhD · IIT Chicago
              </p>
            </div>
          </motion.div>

          {/* Bio 2/3 */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 flex flex-col justify-center gap-6">
            <p className="section-label">Le Groupe</p>
            <h2
              id="le-groupe-heading"
              className="font-display font-bold text-fg text-balance leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
            >
              Sun Energy and Water Technologies Group —{" "}
              <span className="text-accent">la transition énergétique du Royaume.</span>
            </h2>
            <p className="font-sans text-base text-fg-muted leading-relaxed text-pretty">
              SEWT Group a été créée avec la conviction de faire de l'énergie solaire un{" "}
              <strong className="text-fg font-semibold">pilier majeur de la transition énergétique</strong>{" "}
              voulue pour le Royaume. En tant que professionnels des énergies renouvelables,
              nous détenons les qualifications nécessaires pour garantir à nos partenaires des
              installations de qualité, conformes aux normes et réglementations en vigueur.
            </p>
            <blockquote className="border-l-2 border-accent pl-5 font-display font-bold text-fg"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
              « L'énergie n'est pas seulement une ressource, c'est{" "}
              <span className="text-accent">le moteur de votre compétitivité.</span> »
            </blockquote>
            <p className="font-sans text-sm text-fg-muted text-pretty leading-relaxed">
              PhD de l'Illinois Institute of Technology, M. Ali HAJJI fonde{" "}
              <strong className="text-fg font-semibold">Energy Engineering en 1992</strong>, première
              structure dédiée au solaire au Maroc. Plus de{" "}
              <strong className="text-fg font-semibold">30 ans d'expérience</strong> dans l'industrie
              solaire nationale et internationale.
            </p>
          </motion.div>

        </div>
      </div>

      {/* ── BLOC 2 : Direction — texte à gauche, portraits à droite ── */}
      <div className="px-5 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">

          {/* Texte — gauche */}
          <motion.div {...fadeUp()} className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="section-label">La Direction</p>
            <h3
              className="mt-5 font-display font-bold text-fg leading-[1.05]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              19 collaborateurs.<br />
              Une direction{" "}
              <span className="text-accent">d'excellence.</span>
            </h3>
            <p className="mt-5 font-sans text-base text-fg-muted leading-relaxed text-pretty">
              Notre équipe terrain regroupe 2 chefs d'équipe, 6 techniciens
              (plomberie, électricité, électrotechnique), 3 agents administratifs,
              1 ingénieur HSE et 3 ingénieurs spécialisés en développement de projets.
            </p>
          </motion.div>

          {/* Portraits — droite */}
          <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:col-span-7">
            {TEAM_DIRECTORS.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.12)}
                className="group flex flex-col"
              >
                {/* Portrait 4:5, couleur */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-elevated ring-1 ring-border">
                  <Image
                    src={member.src}
                    alt={`${member.name} — ${member.role}, SEWT Group`}
                    fill
                    sizes="(max-width: 640px) 45vw, 320px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    style={{
                      objectPosition: member.pos,
                      filter: "contrast(1.04) saturate(1.02)",
                    }}
                  />
                </div>

                {/* Identité — sous la photo */}
                <div className="mt-4 flex flex-col gap-1">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-accent">
                    {member.role}
                  </p>
                  <p
                    className="font-display font-bold text-fg leading-tight"
                    style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)" }}
                  >
                    {member.name}
                  </p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-fg-subtle">
                    {member.credentials}
                  </p>
                  <p className="mt-1.5 font-sans text-[0.8rem] text-fg-muted leading-relaxed">
                    {member.stat}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ── BLOC 2.5 : Photo équipe terrain ── */}
      <motion.div
        {...fadeUp()}
        className="mx-5 mb-20 overflow-hidden rounded-2xl md:mx-12 md:mb-28 lg:mx-16"
      >
        <div className="relative aspect-[16/7]">
          <Image
            src="/team/team-terrain.jpg"
            alt="Équipe terrain SEWT Group — livraison chantier Ambemar Maroc"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(5,8,16,0.55) 0%, transparent 45%)",
            }}
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/60">
              L'équipe terrain
            </p>
            <p
              className="mt-1 font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
            >
              Des hommes sur le terrain. Chaque chantier livré.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── BLOC 3 : Fournisseurs ── */}
      <div className="px-5 pb-16 md:px-12 lg:px-16">
        <div className="rounded-2xl border border-border/50 bg-bg-elevated/30 py-10 overflow-hidden">
          <div className="text-center px-6 mb-8">
            <p className="section-label">Équipements tier-1</p>
            <h3
              className="mt-4 font-display font-bold text-fg"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
            >
              Des équipements de qualité pour une performance optimale
            </h3>
          </div>
          <div className="relative overflow-hidden border-y border-border/40 bg-bg-elevated/50 py-6">
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-elevated/50 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-elevated/50 to-transparent" />
            <Marquee speed={40} pauseOnHover={false}>
              {SUPPLIER_BRANDS.map((brand) => (
                <div
                  key={brand.name}
                  className="flex h-10 w-28 items-center justify-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.src}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-auto max-w-[80px] object-contain"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

    </section>
  );
}
