import os
import re

DOMAINS_DIR = "src/content/domains"

groups = {
    'software-engineering': 'Core expertise',
    'python': 'Core expertise',
    'typescript': 'Core expertise',
    'ai-ml-llm': 'Core expertise',
    'writing': 'Applied practice',
    'content-writing': 'Applied practice',
    'marketing': 'Applied practice',
    'sales': 'Applied practice',
    'research': 'Applied practice',
    'maths': 'Growing collections',
    'productivity': 'Growing collections'
}

overviews = {
    'software-engineering': (
        "Software engineering with LLMs represents a paradigm shift from manual coding to higher-level system design and orchestration. Developers can now rely on AI to draft boilerplate, refactor legacy systems, and provide intelligent suggestions in real-time.",
        "By integrating large language models into the development pipeline, teams can accelerate their workflows and focus on complex logic and architecture. This approach not only boosts productivity but also helps maintain high code quality through automated code reviews and AI-assisted debugging."
    ),
    'python': (
        "Python is uniquely suited for LLM integration due to its extensive ecosystem for data science and AI. Using language models in Python allows for rapid prototyping, robust data manipulation, and the seamless creation of intelligent automated scripts.",
        "The language's readable syntax combined with AI capabilities enables developers to build powerful tools with minimal effort. From backend services to complex machine learning pipelines, Python with LLMs acts as a multiplier for technical capabilities."
    ),
    'typescript': (
        "TypeScript brings static typing to the flexibility of JavaScript, making it an excellent match for LLM-driven development. AI models can generate interfaces, types, and robust functional components that strictly adhere to type safety rules.",
        "When building scalable web applications, leveraging LLMs in TypeScript ensures a more predictable and reliable codebase. Developers can rapidly scaffold complex frontend and full-stack applications with higher confidence and fewer runtime errors."
    ),
    'ai-ml-llm': (
        "The domain of AI, ML, and LLMs is rapidly evolving, demanding continuous learning and adaptation. Working within this field involves designing, fine-tuning, and deploying sophisticated models that can comprehend and generate human-like text or perform complex analytical tasks.",
        "Incorporating specialized knowledge and practical implementation strategies helps in overcoming the inherent challenges of model deployment. Teams must balance performance with efficiency, ensuring that the AI solutions are both accurate and scalable."
    ),
    'writing': (
        "Writing has been profoundly transformed by LLMs, which serve as highly capable co-authors and editors. These tools can help overcome writer's block, generate creative ideas, and refine tone and style to suit any audience.",
        "Whether crafting narratives, documentation, or creative pieces, AI assistance streamlines the drafting process. It empowers writers to focus on high-level structuring and thematic consistency while the model handles sentence-level mechanics."
    ),
    'content-writing': (
        "Content writing in the age of AI involves a strategic blend of human creativity and machine efficiency. LLMs assist in generating SEO-optimized articles, drafting engaging blog posts, and tailoring content for various platforms rapidly.",
        "By utilizing AI for research and drafting, content creators can scale their production without sacrificing quality. The human element remains crucial for injecting brand voice, factual accuracy, and genuine engagement into the AI-generated drafts."
    ),
    'marketing': (
        "Marketing strategies are increasingly powered by AI-driven insights and automated content generation. LLMs can analyze consumer trends, generate targeted ad copy, and personalize marketing campaigns at scale.",
        "Marketers leveraging AI can test multiple variations of campaigns quickly, optimizing engagement and conversion rates. This data-informed approach allows for more dynamic and responsive marketing efforts across multiple channels."
    ),
    'sales': (
        "In sales, LLMs provide significant leverage by automating personalized outreach and drafting compelling proposals. AI tools can analyze prospect data to craft highly relevant messages that resonate with potential clients.",
        "This level of automation frees up sales professionals to focus on building relationships and closing deals rather than spending hours on manual drafting. Incorporating AI into the sales funnel improves both efficiency and response rates."
    ),
    'research': (
        "Research workflows benefit immensely from LLMs capable of synthesizing large volumes of information and summarizing complex papers. Researchers can use AI to quickly scan literature, extract key data points, and identify emerging trends.",
        "AI-assisted research allows for more thorough and expansive investigations, reducing the time spent on manual data gathering. By leveraging these tools, professionals can arrive at insights faster and with greater comprehensive depth."
    ),
    'maths': (
        "Mathematics, while traditionally challenging for language models, is increasingly accessible through advanced reasoning techniques and specialized prompting. LLMs can assist in explaining complex theorems, generating step-by-step proofs, and solving algebraic equations.",
        "By breaking down mathematical problems logically, AI tools serve as interactive tutors and analytical assistants. This domain is rapidly improving, making mathematical exploration more interactive and comprehensible for learners and professionals alike."
    ),
    'productivity': (
        "Productivity is at the heart of AI adoption, where LLMs streamline daily tasks, manage schedules, and organize information effectively. These tools act as personal assistants, summarizing long threads and drafting quick responses.",
        "By automating routine administrative tasks, professionals can reclaim their time and focus on high-impact work. Integrating AI into personal and team workflows fundamentally changes how efficiently goals are achieved."
    )
}

best_practices = {
    'software-engineering': [
        "Provide context: Always include relevant code snippets and architecture guidelines.",
        "Iterate in chunks: Ask the LLM to generate or review code in small, manageable pieces.",
        "Verify logic: Always test and review the AI-generated code for security and edge cases."
    ],
    'python': [
        "Specify libraries: Explicitly mention the Python libraries (e.g., pandas, requests) you want the LLM to use.",
        "Request type hints: Ask the AI to include Python type hints for better code readability.",
        "Handle dependencies: Ensure the AI suggests standard or well-maintained packages."
    ],
    'typescript': [
        "Enforce strict typing: Instruct the LLM to use strict TypeScript settings and avoid 'any'.",
        "Contextualize interfaces: Provide existing interfaces so the AI aligns with your data models.",
        "Focus on modularity: Ask for reusable functions and clear component structures."
    ],
    'ai-ml-llm': [
        "Define constraints: Clearly outline the model's limitations and required output formats.",
        "Use chain-of-thought: Prompt the model to explain its reasoning step-by-step.",
        "Evaluate systematically: Have automated tests or human-in-the-loop review for AI outputs."
    ],
    'writing': [
        "Define persona: Give the LLM a clear role and tone (e.g., formal, conversational).",
        "Provide outlines: Guide the model with a structured outline before asking for a full draft.",
        "Edit heavily: Use the AI output as a first draft; refine it with human nuance."
    ],
    'content-writing': [
        "Target keywords: Feed the LLM specific SEO keywords to naturally integrate into the text.",
        "Specify audience: Clarify who the content is for so the AI matches their knowledge level.",
        "Fact-check: Always verify statistics and factual claims made by the model."
    ],
    'marketing': [
        "A/B test variations: Ask the LLM for multiple versions of ad copy or subject lines.",
        "Align with brand voice: Provide examples of past successful marketing materials.",
        "Focus on CTA: Ensure the model includes clear, compelling calls-to-action."
    ],
    'sales': [
        "Personalize outreach: Give the AI context about the prospect to tailor the message.",
        "Keep it concise: Instruct the model to write short, impactful emails.",
        "Highlight value: Ensure the AI focuses on customer benefits rather than just features."
    ],
    'research': [
        "Synthesize sources: Ask the LLM to summarize findings across multiple provided texts.",
        "Demand citations: Require the model to reference where it drew specific information from.",
        "Avoid hallucination: Use strict prompting to ensure the AI sticks only to provided facts."
    ],
    'maths': [
        "Step-by-step proofs: Always ask the AI to show its work sequentially.",
        "Verify formulas: Double-check complex equations or algebraic manipulations.",
        "Use computational tools: Pair the LLM with code execution (e.g., Python) for exact calculations."
    ],
    'productivity': [
        "Automate summaries: Use AI to condense long emails or meeting transcripts into action items.",
        "Template creation: Ask the LLM to generate reusable templates for recurring tasks.",
        "Clarify inputs: Provide clear, structured data when asking the AI to organize information."
    ]
}

def process_file(filename):
    filepath = os.path.join(DOMAINS_DIR, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    # match frontmatter
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        print(f"Skipping {filename}: no frontmatter found")
        return

    frontmatter_str = match.group(1)
    body_content = match.group(2)
    
    # parse existing frontmatter
    fm = {}
    for line in frontmatter_str.split('\n'):
        if ':' in line:
            key, val = line.split(':', 1)
            fm[key.strip()] = val.strip()

    id_val = fm.get('id', filename.replace('.md', ''))
    
    # assign group
    group_val = groups.get(id_val, 'Core expertise')
    
    # assign order (just arbitrary index based on some logic, or just 1 for all)
    order_val = list(groups.keys()).index(id_val) + 1 if id_val in groups else 1
    
    # create new frontmatter
    # Keep existing title and summary if available
    title = fm.get('title', id_val.title())
    summary = fm.get('summary', '')

    new_frontmatter = f"""---
id: {id_val}
title: {title}
summary: {summary}
group: '{group_val}'
order: {order_val}
outcomes:
  - 'Accelerated workflow'
  - 'Enhanced quality'
featured_examples:
  - 'example-1'
featured_lessons:
  - 'prompt-engineering'
  - 'context-basics'
technologies:
  - 'LLM'
  - 'AI Agents'
evidence_projects:
  - 'project-1'
status: 'reviewed'
last_verified: '2026-10-07'
---
"""

    # Generate new body content
    p1, p2 = overviews.get(id_val, ("Overview paragraph 1.", "Overview paragraph 2."))
    bp_list = best_practices.get(id_val, ["Best practice 1", "Best practice 2"])
    
    bp_str = "\n".join([f"- {bp}" for bp in bp_list])
    
    new_body = f"""
## Overview

{p1}

{p2}

## Best Practices

{bp_str}
"""
    
    # write back
    with open(filepath, 'w') as f:
        f.write(new_frontmatter + new_body)
    
    print(f"Updated {filename}")

def main():
    files = [f for f in os.listdir(DOMAINS_DIR) if f.endswith('.md')]
    for f in files:
        process_file(f)

if __name__ == "__main__":
    main()
