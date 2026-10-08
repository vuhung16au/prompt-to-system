import fs from 'fs';

const p = 'src/pages/learn/index.astro';
let content = fs.readFileSync(p, 'utf8');

const advancedSectionOld = `<div class="mt-20 pt-16 border-t border-border-strong">
        <div class="max-w-3xl mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-text-heading mb-4 tracking-tight">Advanced Systems Path</h2>
          <p class="text-lg text-text-body leading-relaxed">
            A production-oriented curriculum for senior engineers. Learn to make architecture decisions, measure trade-offs, operate agents with measurable reliability, and recover from failures in distributed AI systems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card class="p-6 md:p-8">
            <h3 class="text-xl font-bold text-text-heading mb-3">Role-based Starting Points</h3>
            <ul class="space-y-3 text-text-body">
              <li class="flex items-start gap-2">
                <span class="text-accent-primary font-bold">&rarr;</span>
                <span><strong>Agent Engineer:</strong> Focus on orchestration, long-running execution, memory, and multi-agent coordination.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-primary font-bold">&rarr;</span>
                <span><strong>AI Platform Engineer:</strong> Focus on RAG architectures, tools, MCP gateways, latency, and cost engineering.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-primary font-bold">&rarr;</span>
                <span><strong>ML Engineer to Systems:</strong> Focus on context engineering, evaluation, models vs. tools, and synthetic data.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-primary font-bold">&rarr;</span>
                <span><strong>Security Engineer:</strong> Focus on threat modelling, capability security, sandboxes, and supply-chain security.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-primary font-bold">&rarr;</span>
                <span><strong>Technical Lead:</strong> Focus on architecture reviews, SLOs, failure taxonomies, budgets, and escalation boundaries.</span>
              </li>
            </ul>
          </Card>
          
          <Card class="p-6 md:p-8 bg-surface-muted border-accent-muted">
            <h3 class="text-xl font-bold text-text-heading mb-3">Cornerstone Lessons</h3>
            <div class="space-y-4 mt-4">
              {sortedLessons.filter(l => l.data.level === 'advanced').map(lesson => (
                <a href={import.meta.env.BASE_URL + \`/learn/\${lesson.id}\`} class="block group p-4 bg-surface border border-border-subtle rounded-xl hover:border-accent-primary transition-colors">
                  <h4 class="font-bold text-text-heading group-hover:text-accent-primary transition-colors mb-1">{lesson.data.title}</h4>
                  <p class="text-sm text-text-body">{lesson.data.summary}</p>
                </a>
              ))}
            </div>
            {sortedLessons.filter(l => l.data.level === 'advanced').length === 0 && (
              <p class="text-sm text-text-muted mt-4">Advanced content is currently being published.</p>
            )}
          </Card>
        </div>
      </div>`;

const advancedSectionNew = `<div class="mt-20 pt-16 border-t border-border-strong">
        <div class="max-w-3xl mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-text-heading mb-4 tracking-tight">Advanced Systems Path</h2>
          <p class="text-lg text-text-body leading-relaxed">
            A production-oriented curriculum for senior engineers. Learn to make architecture decisions, measure trade-offs, operate agents with measurable reliability, and recover from failures in distributed AI systems.
          </p>
        </div>

        <h3 class="text-2xl font-bold text-text-heading mb-6">Choose your route</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          <a href="#track-4" class="block p-4 border border-border-subtle rounded-xl hover:border-accent-primary transition-colors bg-surface shadow-sm">
            <h4 class="font-bold text-text-heading mb-1 text-sm">Agent Engineer</h4>
            <p class="text-xs text-text-muted">Start with Orchestration Patterns</p>
          </a>
          <a href="#track-2" class="block p-4 border border-border-subtle rounded-xl hover:border-accent-primary transition-colors bg-surface shadow-sm">
            <h4 class="font-bold text-text-heading mb-1 text-sm">AI Platform Engineer</h4>
            <p class="text-xs text-text-muted">Start with Production RAG</p>
          </a>
          <a href="#track-1" class="block p-4 border border-border-subtle rounded-xl hover:border-accent-primary transition-colors bg-surface shadow-sm">
            <h4 class="font-bold text-text-heading mb-1 text-sm">ML Engineer to Systems</h4>
            <p class="text-xs text-text-muted">Start with Context Engineering</p>
          </a>
          <a href="#track-6" class="block p-4 border border-border-subtle rounded-xl hover:border-accent-primary transition-colors bg-surface shadow-sm">
            <h4 class="font-bold text-text-heading mb-1 text-sm">Security Engineer</h4>
            <p class="text-xs text-text-muted">Start with Threat Modelling</p>
          </a>
          <a href="#track-7" class="block p-4 border border-border-subtle rounded-xl hover:border-accent-primary transition-colors bg-surface shadow-sm">
            <h4 class="font-bold text-text-heading mb-1 text-sm">Technical Lead</h4>
            <p class="text-xs text-text-muted">Start with Architecture Review</p>
          </a>
        </div>

        <div class="mb-16">
          <h3 class="text-2xl font-bold text-text-heading mb-6">Cornerstone Lessons</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['autonomy-boundary', 'context-resource-allocation', 'production-rag-architecture', 'tool-contracts', 'evaluation-system-design', 'threat-modelling-agentic-systems'].map(id => {
               const lesson = sortedLessons.find(l => l.id === id);
               if (!lesson) return null;
               return (
                 <a href={import.meta.env.BASE_URL + \`/learn/\${lesson.id}\`} class="block group p-5 bg-surface-muted border border-border-subtle rounded-2xl hover:border-accent-primary transition-colors shadow-sm flex flex-col h-full">
                   <div class="text-xs font-bold text-accent-primary mb-2 uppercase tracking-wide">{lesson.data.track}</div>
                   <h4 class="font-bold text-text-heading group-hover:text-accent-primary transition-colors mb-2 text-lg leading-tight">{lesson.data.title}</h4>
                   <p class="text-sm text-text-body mb-4 flex-grow">{lesson.data.summary.split('.')[0]}.</p>
                   <div class="flex justify-between items-center text-xs text-text-muted mt-auto pt-4 border-t border-border-subtle">
                     <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>{lesson.data.timeToRead || 15} min read</span>
                     <span class="truncate ml-2" title={lesson.data.required_artifacts?.[0] || 'Artifact'}>📄 {lesson.data.required_artifacts?.[0] || 'Artifact'}</span>
                   </div>
                 </a>
               );
            })}
          </div>
          <div class="mt-6 text-center">
             <a href="#tracks" class="inline-block px-6 py-3 bg-surface border border-border-strong rounded-lg text-sm font-bold text-text-heading hover:bg-surface-muted transition-colors">Browse all tracks and lessons &darr;</a>
          </div>
        </div>

        <div id="tracks" class="space-y-4">
          <h3 class="text-2xl font-bold text-text-heading mb-6">Complete Advanced Curriculum</h3>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(trackNum => {
             const trackLessons = sortedLessons.filter(l => l.data.track === \`Track \${trackNum}\`);
             if (trackLessons.length === 0) return null;
             const totalReading = trackLessons.reduce((acc, l) => acc + (l.data.timeToRead || 15), 0);
             const totalLab = trackLessons.reduce((acc, l) => acc + (l.data.estimated_lab_minutes || 0), 0);
             const isTrack1 = trackNum === 1;
             
             return (
               <details class="group bg-surface border border-border-subtle rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden" id={\`track-\${trackNum}\`} open={isTrack1}>
                 <summary class="flex flex-col sm:flex-row sm:items-center justify-between p-5 cursor-pointer bg-surface hover:bg-surface-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary">
                   <div class="flex items-center gap-4">
                     <div class="text-accent-primary transform transition-transform group-open:rotate-90">
                       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                     </div>
                     <div>
                       <h4 class="text-lg font-bold text-text-heading">Track {trackNum}: {trackLessons[0]?.data.stage || 'Curriculum Section'}</h4>
                       <p class="text-sm text-text-muted mt-1">{trackLessons.length} lessons &bull; {totalReading + totalLab} min total effort</p>
                     </div>
                   </div>
                 </summary>
                 <div class="p-5 pt-0 border-t border-border-subtle bg-surface-muted">
                   <div class="divide-y divide-border-subtle">
                     {trackLessons.map(lesson => (
                       <a href={import.meta.env.BASE_URL + \`/learn/\${lesson.id}\`} class="block py-4 hover:bg-surface transition-colors -mx-5 px-5 group/row">
                         <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                           <div class="flex-grow">
                             <h5 class="font-bold text-text-heading group-hover/row:text-accent-primary transition-colors text-base">{lesson.data.title}</h5>
                             <p class="text-sm text-text-body mt-1">{lesson.data.summary.split('.')[0]}.</p>
                           </div>
                           <div class="flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 text-xs text-text-muted">
                             <span class="whitespace-nowrap"><span class="font-medium">{lesson.data.timeToRead || 15}m</span> read + <span class="font-medium">{lesson.data.estimated_lab_minutes || 0}m</span> lab</span>
                             <span class="whitespace-nowrap truncate max-w-[150px]" title={lesson.data.required_artifacts?.[0] || 'N/A'}>📄 {lesson.data.required_artifacts?.[0] || 'N/A'}</span>
                           </div>
                         </div>
                       </a>
                     ))}
                   </div>
                 </div>
               </details>
             );
          })}
        </div>
      </div>`;

content = content.replace(advancedSectionOld, advancedSectionNew);
fs.writeFileSync(p, content);
