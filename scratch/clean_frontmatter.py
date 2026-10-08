import os
import re
import glob

def clean_frontmatter(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace verified_with
    content = re.sub(
        r'verified_with:\s*"Reproduced manually with standard test suite"',
        r'verified_with: "not independently reproduced"',
        content
    )
    
    # Remove astro docs from source_urls
    # source_urls: \n  - "https://docs.astro.build"
    content = re.sub(
        r'source_urls:\s*\n\s*-\s*"https://docs\.astro\.build"\n',
        '',
        content
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for fpath in glob.glob('src/content/lessons/*.md'):
    clean_frontmatter(fpath)

print("Done cleaning frontmatter.")
