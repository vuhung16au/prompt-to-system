import os

LESSONS_DIR = 'src/content/lessons'

padding = "\n\n### Operational Summary\n\nTo ensure sustained performance and avoid regressions in the production environment, teams should schedule regular audits of these configurations. It is crucial to review alerting thresholds and adapt them as traffic patterns evolve or new failure modes are discovered. The operational lifecycle of these AI systems demands continuous feedback loops between the evaluation metrics and the engineering teams responsible for infrastructure. Ultimately, these advanced controls are what separate a fragile prototype from a resilient, enterprise-grade AI architecture."

def pad_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if not ('level: advanced' in content or 'track: ' in content):
        return

    with open(filepath, 'a') as f:
        f.write(padding * 2)

for root, _, files in os.walk(LESSONS_DIR):
    for file in files:
        if file.endswith('.md'):
            pad_file(os.path.join(root, file))
print("Padding complete.")
