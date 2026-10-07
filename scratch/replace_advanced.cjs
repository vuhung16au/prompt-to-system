const fs = require('fs');

let content = fs.readFileSync('src/pages/learn/index.astro', 'utf8');

// Replace frontmatter logic
const frontmatterAdd = `
const advancedLessons = sortedLessons.filter(l => l.data.level === 'advanced');
const tracks = [
  { id: 'Track 1', title: 'Architecture and orchestration', stage: 'Foundation', purpose: 'Structure complex agent systems' },
  { id: 'Track 2', title: 'Context, retrieval, and memory', stage: 'Build', purpose: 'Design scalable memory and RAG' },
  { id: 'Track 3', title: 'Tools and interoperability protocols', stage: 'Build', purpose: 'Connect agents safely' },
  { id: 'Track 4', title: 'Evaluation-driven engineering', stage: 'Evaluate', purpose: 'Measure agent behavior reliably' },
  { id: 'Track 5', title: 'Reliability and autonomous operations', stage: 'Operate', purpose: 'Recover from distributed failure' },
  { id: 'Track 6', title: 'Security, privacy, and governance', stage: 'Operate', purpose: 'Secure capabilities and boundaries' },
  { id: 'Track 7', title: 'Latency, throughput, and economics', stage: 'Operate', purpose: 'Scale systems cost-effectively' },
  { id: 'Track 8', title: 'Model adaptation and technical leadership', stage: 'Lead', purpose: 'Drive technical adoption' }
];

function getTrackLessons(trackId) {
  return advancedLessons.filter(l => l.data.track && l.data.track.includes(trackId));
}

function getTrackEffort(lessons) {
  return lessons.reduce((sum, l) => sum + (l.data.estimated_lab_minutes || 0) + (l.data.duration_minutes || 0), 0);
}

function getTrackArtifacts(lessons) {
  const artifacts = new Set();
  lessons.forEach(l => {
    if (l.data.required_artifacts) {
      l.data.required_artifacts.forEach(a => artifacts.add(a));
    }
  });
  return Array.from(artifacts);
}
`;

content = content.replace(/(const crossCutting = lessons.filter\(l => l.data.stage === 'cross-cutting'\);)/, `$1\n${frontmatterAdd}`);

// Replace DOM section
const newSection = `
      <div class="mt-20 pt-16 border-t border-border-strong">
        <div class="max-w-3xl mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-text-heading mb-4 tracking-tight">Advanced Systems Path</h2>
          <p class="text-lg text-text-body leading-relaxed mb-6">
            A production-oriented curriculum for senior engineers. Learn to make architecture decisions, measure trade-offs, operate agents with measurable reliability, and recover from failures in distributed AI systems.
          </p>
          <div class="flex flex-wrap gap-2 text-sm">
            <span class="px-3 py-1 bg-surface-muted border border-border-subtle rounded-full">Concept</span>
            <span class="px-3 py-1 bg-surface-muted border border-border-subtle rounded-full">Lab</span>
            <span class="px-3 py-1 bg-surface-muted border border-border-subtle rounded-full">Case Study</span>
            <span class="px-3 py-1 bg-surface-muted border border-border-subtle rounded-full">Template</span>
            <span class="px-3 py-1 bg-surface-muted border border-border-subtle rounded-full">Reference</span>
          </div>
        </div>

        <div class="mb-12">
          <h3 class="text-2xl font-bold text-text-heading mb-6">Role-based Routes</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card class="p-5">
              <h4 class="font-bold text-text-heading">Agent Engineer</h4>
              <p class="text-sm text-text-body mt-2">Focus on orchestration, execution, memory, and multi-agent coordination.</p>
            </Card>
            <Card class="p-5">
              <h4 class="font-bold text-text-heading">AI Platform Engineer</h4>
              <p class="text-sm text-text-body mt-2">Focus on RAG architectures, MCP gateways, latency, and cost engineering.</p>
            </Card>
            <Card class="p-5">
              <h4 class="font-bold text-text-heading">ML Engineer</h4>
              <p class="text-sm text-text-body mt-2">Focus on context engineering, evaluation, models vs. tools, and synthetic data.</p>
            </Card>
            <Card class="p-5">
              <h4 class="font-bold text-text-heading">Security Engineer</h4>
              <p class="text-sm text-text-body mt-2">Focus on threat modelling, capability security, sandboxes, and supply-chain security.</p>
            </Card>
            <Card class="p-5">
              <h4 class="font-bold text-text-heading">Technical Lead</h4>
              <p class="text-sm text-text-body mt-2">Focus on architecture reviews, SLOs, failure taxonomies, budgets, and boundaries.</p>
            </Card>
          </div>
        </div>

        <div class="mb-12">
          <h3 class="text-2xl font-bold text-text-heading mb-6">Production-Readiness Checklist</h3>
          <Card class="p-6 bg-surface-muted">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <label class="flex items-center gap-2"><input type="checkbox" disabled /> Reliability metrics established (SLIs/SLOs)</label>
              <label class="flex items-center gap-2"><input type="checkbox" disabled /> Trace-first observability implemented</label>
              <label class="flex items-center gap-2"><input type="checkbox" disabled /> Capability security boundaries tested</label>
              <label class="flex items-center gap-2"><input type="checkbox" disabled /> Latency and cost bounds verified</label>
              <label class="flex items-center gap-2"><input type="checkbox" disabled /> Evaluation dataset coverage >90%</label>
            </div>
          </Card>
        </div>

        <h3 class="text-2xl font-bold text-text-heading mb-8">The Eight-Track Journey</h3>
        <div class="space-y-12">
          {tracks.map(track => {
            const trackLessons = getTrackLessons(track.id);
            const effort = getTrackEffort(trackLessons);
            const artifacts = getTrackArtifacts(trackLessons);
            return (
              <div class="relative pl-8 border-l-2 border-accent-muted pb-8">
                <div class="absolute w-4 h-4 rounded-full bg-accent-primary left-[-9px] top-2"></div>
                <div class="mb-4">
                  <span class="text-xs font-bold text-accent-primary uppercase tracking-wider">{track.stage} • {track.id}</span>
                  <h4 class="text-xl font-bold text-text-heading mt-1">{track.title}</h4>
                  <p class="text-text-body mt-2">{track.purpose}</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-sm">
                  <div class="bg-surface p-4 rounded-lg border border-border-subtle">
                    <strong class="block text-text-heading mb-1">Prerequisites</strong>
                    <p class="text-text-muted">Foundation layers</p>
                  </div>
                  <div class="bg-surface p-4 rounded-lg border border-border-subtle">
                    <strong class="block text-text-heading mb-1">Effort</strong>
                    <p class="text-text-muted">{trackLessons.length} lessons • ~{effort} mins</p>
                  </div>
                  <div class="bg-surface p-4 rounded-lg border border-border-subtle">
                    <strong class="block text-text-heading mb-1">Artifacts</strong>
                    <ul class="text-text-muted list-disc list-inside">
                      {artifacts.slice(0, 3).map(a => <li>{a}</li>)}
                      {artifacts.length === 0 && <li>None specified</li>}
                    </ul>
                  </div>
                </div>

                <div class="space-y-3">
                  {trackLessons.length > 0 && <strong class="block text-sm text-text-heading">Lessons:</strong>}
                  {trackLessons.map((lesson, idx) => (
                    <a href={import.meta.env.BASE_URL + \`/learn/\${lesson.id}\`} class="block group p-4 bg-surface border border-border-subtle rounded-xl hover:border-accent-primary transition-colors">
                      <div class="flex justify-between items-start">
                        <div>
                          <h5 class="font-bold text-text-heading group-hover:text-accent-primary transition-colors">
                            {idx === 0 && <span class="text-xs bg-accent-primary text-surface px-2 py-0.5 rounded-full mr-2">START HERE</span>}
                            {lesson.data.title}
                          </h5>
                          <p class="text-sm text-text-muted mt-1">{lesson.data.summary}</p>
                        </div>
                        <span class="text-xs text-text-muted uppercase px-2 py-1 bg-surface-muted rounded">{lesson.data.kind || 'Concept'}</span>
                      </div>
                    </a>
                  ))}
                  {trackLessons.length === 0 && <p class="text-sm text-text-muted italic">Content pending publication.</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </Container>
</Layout>
`;

// Replace from <div class="mt-20 pt-16 border-t border-border-strong"> to the end
content = content.replace(/<div class="mt-20 pt-16 border-t border-border-strong">[\s\S]*<\/Layout>/, newSection);

fs.writeFileSync('src/pages/learn/index.astro', content);
