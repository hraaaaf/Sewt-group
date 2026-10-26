"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const team = [
  {
    name: "Ali Hajji",
    role: "Fondateur",
    credentials: "PhD · IIT Chicago",
    src: "/team/ali-hajji.png",
    position: "center 8%",
    zoom: 1.05,
  },
  {
    name: "Amine Hajji",
    role: "Directeur des Projets",
    credentials: "Ing. · ENGEE Strasbourg",
    src: "/team/amine-hajji.png",
    position: "center 10%",
    zoom: 1.12,
  },
  {
    name: "Ndiaga Mbodji",
    role: "Directeur Développement",
    credentials: "PhD · IAV Hassan II",
    src: "/team/ndiaga-mbodji-portrait.webp",
    position: "center 66%",
    zoom: 1,
  },
] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };
}

/**
 * Section unique après la timeline — présentation, équipe terrain et direction.
 * Référence approuvée : "Site Web SEWT.docx", page 6 (visuel "après").
 */
export function LeGroupe() {
  return (
    <section
      id="le-groupe"
      aria-labelledby="le-groupe-heading"
      className="bg-bg px-5 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div {...fadeUp()} className="lg:col-span-5 lg:sticky lg:top-28">
          <p className="section-label">Le Groupe · Notre équipe</p>
          <h2
            id="le-groupe-heading"
            className="mt-5 font-display font-bold leading-[1.06] text-fg"
            style={{ fontSize: "clamp(2rem, 3.7vw, 3.65rem)" }}
          >
            19 collaborateurs.<br />
            Une direction{" "}
            <span className="text-accent">d’excellence.</span>
          </h2>
          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-fg-muted">
            Notre équipe réunit une expertise de terrain, des techniciens qualifiés
            et des ingénieurs spécialisés pour accompagner chaque projet, de l’étude
            à la mise en service et à la maintenance.
          </p>
          <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-fg-muted">
            Notre équipe terrain regroupe 2 chefs d’équipe, 6 techniciens (plomberie,
            électricité, électrotechnique), 3 agents administratifs, 1 ingénieur HSE
            et 3 ingénieurs spécialisés en développement de projets.
          </p>
          <div className="mt-7 max-w-lg border-t border-border pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Ali Hajji · Fondateur
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">
              PhD de l’Illinois Institute of Technology, M. Ali Hajji fonde
              Energy Engineering en 1992, première structure dédiée au solaire
              au Maroc. Il apporte plus de 30 ans d’expérience dans l’industrie
              solaire nationale et internationale.
            </p>
            <blockquote className="mt-5 border-l-2 border-accent pl-4 font-display text-base font-semibold leading-snug text-fg">
              « L’énergie n’est pas seulement une ressource, c’est
              <span className="text-accent"> le moteur de votre compétitivité.</span> »
            </blockquote>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.div {...fadeUp(0.1)} className="overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/7] sm:aspect-[16/6]">
              <Image
                src="/team/team-terrain.jpg"
                alt="Équipe SEWT Group sur le chantier Ambemar Maroc"
                fill
                sizes="(max-width: 1024px) 95vw, 55vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0"
                aria-hidden
                style={{
                  background: "linear-gradient(to top, rgba(5,8,16,0.52), transparent 65%)",
                }}
              />
              <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-wider text-white sm:bottom-5 sm:left-6">
                L’équipe sur le terrain · Ambemar Maroc
              </p>
            </div>
          </motion.div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {team.map((person, index) => (
              <motion.article key={person.name} {...fadeUp(0.15 + index * 0.08)}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-elevated">
                  <Image
                    src={person.src}
                    alt={`${person.name} — ${person.role}, SEWT Group`}
                    fill
                    sizes="(max-width: 639px) 90vw, (max-width: 1024px) 30vw, 19vw"
                    className="object-cover"
                    style={{ objectPosition: person.position, transform: `scale(${person.zoom})` }}
                  />
                </div>
                <p className="mt-3 font-display text-sm font-bold leading-snug text-fg">
                  {person.name}
                </p>
                <p className="mt-1 font-sans text-xs text-fg-muted">{person.role}</p>
                <p className="mt-1 font-mono text-[10px] text-fg-subtle">{person.credentials}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
