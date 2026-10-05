import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artifactTypes = ['lesson', 'prompt', 'pattern', 'playbook', 'agent workflow', 'harness blueprint', 'loop blueprint', 'checklist', 'rubric', 'case study'] as const;
const levels = ['beginner', 'intermediate', 'advanced'] as const;
const statuses = ['reviewed', 'draft'] as const;

const examplesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/examples" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    kind: z.enum(artifactTypes),
    level: z.enum(levels),
    domains: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(statuses),
    language: z.string().default('en'),
    last_verified: z.date(),
    featured: z.boolean().default(false),
    provenance: z.object({
      type: z.string()
    }).optional()
  })
});

const lessonsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lessons" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    level: z.enum(levels),
    last_verified: z.date(),
    featured: z.boolean().default(false)
  })
});

const domainsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/domains" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string()
  })
});

const glossaryCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string()
  })
});

export const collections = {
  'examples': examplesCollection,
  'lessons': lessonsCollection,
  'domains': domainsCollection,
  'glossary': glossaryCollection
};
