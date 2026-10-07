import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dir = '../../src/content/lessons';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));

const mappings = {
  'context-basics.md': { related_examples: ['example-1'], related_lessons: ['context-engineering'], author: 'Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-windows', title: 'Context Window Limits', date: '2024-01-15' },
  'context-engineering.md': { related_examples: ['example-2'], related_lessons: ['workflow-engineering'], author: 'LlamaIndex', url: 'https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/', title: 'Advanced RAG Techniques', date: '2024-02-20' },
  'evaluation-reliability.md': { related_examples: ['code-review-assistant'], related_lessons: ['harness-engineering'], author: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/examples/evaluation/how_to_eval_abstractive_summarization', title: 'Evaluating LLMs', date: '2023-11-10' },
  'harness-engineering.md': { related_examples: ['example-12'], related_lessons: ['evaluation-reliability'], author: 'LangChain', url: 'https://python.langchain.com/docs/langsmith/', title: 'Testing LLM Applications', date: '2024-03-05' },
  'loop-engineering.md': { related_examples: ['example-13'], related_lessons: ['harness-engineering'], author: 'Andrew Ng', url: 'https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/', title: 'Agentic Design Patterns', date: '2024-04-12' },
  'prompt-engineering.md': { related_examples: ['example-6'], related_lessons: ['context-basics'], author: 'DAIR.AI', url: 'https://www.promptingguide.ai/', title: 'Prompt Engineering Guide', date: '2023-10-01' },
  'workflow-engineering.md': { related_examples: ['example-14'], related_lessons: ['loop-engineering'], author: 'Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts', title: 'LLM Workflows', date: '2024-05-22' },
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const basename = path.basename(file);
  const data = mappings[basename];
  
  if (!data) continue;

  const parsed = matter(content);
  
  // ensure related_examples
  if (!parsed.data.related_examples || parsed.data.related_examples.length === 0) {
    parsed.data.related_examples = data.related_examples;
  }
  
  // ensure related_lessons
  if (!parsed.data.related_lessons || parsed.data.related_lessons.length === 0) {
    parsed.data.related_lessons = data.related_lessons;
  }
  
  let newContent = matter.stringify(parsed.content, parsed.data);
  
  if (!newContent.includes('## Provenance and further reading')) {
    const text = `
## Provenance and further reading

- **Source**: [${data.title}](${data.url})
- **Author/Organization**: ${data.author}
- **Publication Date**: ${data.date}
- **Access Date**: 2026-10-07
- **Next Steps**: Review the related example \`${data.related_examples[0]}\` or proceed to the lesson \`${data.related_lessons[0]}\`.
`;
    newContent += text;
  }
  
  fs.writeFileSync(file, newContent, 'utf8');
  console.log(`Updated ${file}`);
}
