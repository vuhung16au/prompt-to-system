import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const artifactTypes = ['lesson', 'prompt', 'pattern', 'playbook', 'agent workflow', 'harness blueprint', 'loop blueprint', 'checklist', 'rubric', 'case study', 'architecture decision record', 'implementation lab', 'benchmark report', 'evaluation dataset specification', 'threat model', 'incident postmortem', 'operational runbook', 'protocol blueprint', 'template', 'benchmark'] as const;
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
    evidence_produced: z.string().optional(),
    estimated_time_minutes: z.number().optional(),
    related_lessons: z.array(reference('lessons')).optional(),
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
    featured: z.boolean().default(false),
    
    // Phase 2 additions
    order: z.number().optional(),
    stage: z.number().optional(),
    duration_minutes: z.number().optional(),
    outcomes: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    related_lessons: z.array(reference('lessons')).optional(),
    related_examples: z.array(reference('examples')).optional(),
    glossary_terms: z.array(reference('glossary')).optional(),
    status: z.enum(statuses).default('reviewed'),
    sources: z.array(z.string()).optional(),
    
    // Advanced systems additions
    track: z.string().optional(),
    competencies: z.array(z.string()).optional(),
    estimated_lab_minutes: z.number().optional(),
    required_artifacts: z.array(z.string()).optional(),
    system_scale: z.string().optional(),
    risk_level: z.string().optional(),
    vendor_scope: z.string().optional(),
    verified_with: z.string().optional(),
    source_urls: z.array(z.string()).optional(),
    reviewers: z.array(z.string()).optional(),
    review_status: z.string().optional()
  })
});

const domainsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/domains" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    
    // Phase 3 additions
    group: z.enum(['Core expertise', 'Applied practice', 'Growing collections']).default('Growing collections'),
    order: z.number().optional(),
    outcomes: z.array(z.string()).optional(),
    featured_examples: z.array(reference('examples')).optional(),
    featured_lessons: z.array(reference('lessons')).optional(),
    technologies: z.array(z.string()).optional(),
    evidence_projects: z.array(z.string()).optional(),
    status: z.enum(statuses).default('reviewed'),
    last_verified: z.date().optional()
  })
});

const glossaryCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    
    // Phase 4 additions
    aliases: z.array(z.string()).optional(),
    related_terms: z.array(reference('glossary')).optional(),
    lessons: z.array(reference('lessons')).optional(),
    examples: z.array(reference('examples')).optional()
  })
});

export const collections = {
  'examples': examplesCollection,
  'lessons': lessonsCollection,
  'domains': domainsCollection,
  'glossary': glossaryCollection
};
