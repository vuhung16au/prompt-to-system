import os
import re
import glob

def clean_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Remove repeated paragraphs starting with "In the context of this specific topic"
    content = re.sub(r'In the context of this specific topic.*?(production-ready system\.)\n*', '', content, flags=re.DOTALL)
    
    # 2. Remove duplicate Operational Summary sections
    op_summary_pattern = r'### Operational Summary\n+\s*To ensure sustained performance.*?enterprise-grade AI architecture\.\n*'
    content = re.sub(op_summary_pattern, '', content, flags=re.DOTALL)
    
    # 3. Remove generic competing design paragraph
    comp_design_pattern = r'The most common alternative is to rely entirely on a single large context window.*?(robust production deployments\.)\n*'
    content = re.sub(comp_design_pattern, '', content, flags=re.DOTALL)

    # 4. Remove generic blueprint
    blueprint_pattern = r'### Implementation Blueprint\n+1\. \*\*Input Generation:\*\*.*?(mechanisms in place\.)\n*'
    content = re.sub(blueprint_pattern, '', content, flags=re.DOTALL)
    
    # 5. Remove generic CSV transformation
    csv_pattern = r'```python\nimport pandas as pd\n\ndef process_data\(file_path\).*?return df\.head\(\)\n```\n*'
    content = re.sub(csv_pattern, '', content, flags=re.DOTALL)
    
    # 6. Remove generic sources
    content = re.sub(r'- Reference implementations from production systems\.\n*', '', content)
    content = re.sub(r'- Industry standard security guidelines for LLMs\.\n*', '', content)
    
    # Also clean up empty "## Sources" or multiple newlines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for fpath in glob.glob('src/content/lessons/*.md'):
    clean_file(fpath)
print("Done cleaning lessons.")
