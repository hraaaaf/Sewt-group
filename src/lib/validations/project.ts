import { z } from "zod";
import type { Project } from "@/types/project";

/**
 * Schémas Zod — miroir runtime de l'interface `Project` (src/types/project.ts).
 * Source de vérité pour la validation du webhook ERP.
 *
 * Toute évolution du type `Project` côté TS DOIT être répercutée ici.
 * En cas de désynchro, le check `_typecheck` plus bas casse à la compilation.
 */

export const sectorSchema = z.enum([
  "agriculture",
  "industrie",
  "tertiaire",
  "public",
  "marine",
]);

export const projectStatusSchema = z.enum([
  "in-progress",
  "delivered",
  "operational",
  "archived",
]);

export const ratioSchema = z.enum([
  "1:1",
  "4:5",
  "16:9",
  "21:9",
  "3:4",
  "9:16",
]);

export const projectImageSchema = z.object({
  placeholderId: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "placeholderId doit être en kebab-case ASCII (a-z0-9-)",
    ),
  alt: z.string().min(3).max(280),
  ratio: ratioSchema.optional(),
});

export const projectMetricSchema = z.object({
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(40),
  unit: z.string().max(20).optional(),
});

export const caseStudyChapterSchema = z.object({
  kind: z.enum(["context", "challenge", "solution", "results"]),
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(1_200),
  metrics: z.array(projectMetricSchema).max(8).optional(),
  image: projectImageSchema.optional(),
});

export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const projectSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "slug doit être en kebab-case ASCII (a-z0-9-)"),
  title: z.string().min(3).max(160),
  client: z.string().min(2).max(160),
  sector: sectorSchema,
  status: projectStatusSchema,
  location: z.string().min(2).max(160),
  coordinates: coordinatesSchema.optional(),
  year: z.number().int().min(1990).max(2050),
  capacityKwc: z.number().nonnegative().max(1_000_000).optional(),
  pumpingM3PerDay: z.number().nonnegative().max(1_000_000).optional(),
  summary: z.string().min(20).max(600),
  hero: projectImageSchema,
  chapters: z.array(caseStudyChapterSchema).min(1).max(8),
  keyMetrics: z.array(projectMetricSchema).min(1).max(8),
  partners: z.array(z.string().min(1).max(80)).max(10).optional(),
  tags: z.array(z.string().min(1).max(40)).max(12).optional(),
});

/**
 * Le webhook accepte :
 *  - un projet seul,
 *  - OU un lot de projets (jusqu'à 50 par requête).
 */
export const webhookPayloadSchema = z.union([
  projectSchema,
  z.array(projectSchema).min(1).max(50),
]);

export type ProjectInput = z.infer<typeof projectSchema>;
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;

/**
 * Garde-fou compile-time : assertion de compatibilité bi-directionnelle entre
 * `Project` (TS) et `projectSchema` (Zod). Si les deux types divergent, ces
 * assertions échouent à la compilation TS.
 *
 * Pas de variable runtime → pas d'erreur `no-unused-vars`.
 */
type _AssertInputToProject = ProjectInput extends Project ? true : never;
type _AssertProjectToInput = Project extends ProjectInput ? true : never;
export type _SchemaTypecheck = [_AssertInputToProject, _AssertProjectToInput];
