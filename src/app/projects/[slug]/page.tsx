import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Zap } from "lucide-react";
import { projects, findProjectBySlug } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Génération statique (SSG) au build
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProjectBySlug(slug);
  if (!project) return { title: "Projet Introuvable" };
  return {
    title: `${project.title} - Cas d'étude`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-svh bg-bg pt-28 pb-16 sm:pt-36">
        <Container>
          {/* Navigation retour */}
          <Link 
            href="/#flagship" 
            className="group/back mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-base ease-out-expo group-hover/back:-translate-x-1" />
            Retour aux réalisations
          </Link>
          
          {/* Header du projet */}
          <header className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              {project.sector} · {project.year}
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg text-balance">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-fg-muted text-pretty leading-relaxed">
              {project.summary}
            </p>
          </header>

          {/* Image héro du projet avec parallaxe légère (optionnelle) */}
          <div className="mt-16 aspect-video w-full overflow-hidden rounded-xl border border-border-strong bg-surface relative isolate">
            <div className="absolute inset-0 bg-bg/10 mix-blend-overlay z-10 pointer-events-none" />
            {project.hero.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.hero.imageSrc}
                alt={project.hero.alt}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
               <div className="absolute inset-0 flex items-center justify-center bg-bg-elevated text-fg-muted">Image en cours de traitement</div>
            )}
          </div>

          {/* Corps de l'étude de cas (Grille asymétrique) */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Contenu éditorial principal */}
            <div className="lg:col-span-8 flex flex-col gap-12 sm:gap-16">
              {project.chapters.map((chapter) => (
                <section key={chapter.kind}>
                  <h2 className="font-display text-2xl font-semibold text-fg flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {chapter.title}
                  </h2>
                  <p className="mt-5 text-fg-muted leading-relaxed text-pretty text-lg">
                    {chapter.body}
                  </p>
                </section>
              ))}
            </div>

            {/* Barre latérale collante : Métriques */}
            <aside className="lg:col-span-4">
              <div className="rounded-xl border border-border-strong bg-bg-elevated/40 backdrop-blur-glass p-8 lg:sticky lg:top-32">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle mb-8">
                  Données du Projet
                </h3>
                <dl className="flex flex-col gap-8">
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                      <Zap className="h-3.5 w-3.5 text-accent" /> Puissance Installée
                    </dt>
                    <dd className="mt-2 font-display text-3xl font-bold tracking-tight text-fg">
                      {project.capacityKwc} <span className="text-lg font-medium text-fg-subtle">kWc</span>
                    </dd>
                  </div>
                  <div className="h-px w-full bg-border/50" />
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                      <MapPin className="h-3.5 w-3.5 text-fg-subtle" /> Localisation
                    </dt>
                    <dd className="mt-2 font-display text-lg font-medium text-fg">
                      {project.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                      <Calendar className="h-3.5 w-3.5 text-fg-subtle" /> Année de mise en service
                    </dt>
                    <dd className="mt-2 font-display text-lg font-medium text-fg">
                      {project.year}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                       Secteur & Client
                    </dt>
                    <dd className="mt-2 font-display text-lg font-medium text-fg text-pretty">
                      {project.client}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
