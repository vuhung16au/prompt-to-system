import fs from 'fs';
import path from 'path';

const spellingMap = {
  'optimization': 'optimisation',
  'Optimization': 'Optimisation',
  'organize': 'organise',
  'Organize': 'Organise',
  'customize': 'customise',
  'Customize': 'Customise',
  'analyze': 'analyse',
  'Analyze': 'Analyse',
  ' color ': ' colour ', // Use spaces to avoid breaking CSS variables
  ' color.': ' colour.',
  ' color,': ' colour,',
  'Color': 'Colour',
  'behavior': 'behaviour',
  'Behavior': 'Behaviour',
  'modeling': 'modelling',
  'Modeling': 'Modelling',
  'categorize': 'categorise',
  'Categorize': 'Categorise',
  ' center ': ' centre ',
  ' center.': ' centre.',
  ' center,': ' centre,',
  'Center': 'Centre',
  'defense': 'defence',
  'Defense': 'Defence',
  // 'license': 'licence' // a bit tricky due to MIT license refs and verb/noun differences, I'll leave this one or just do ' license '
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  for (const [us, au] of Object.entries(spellingMap)) {
    // Avoid replacing inside URLs, markdown links, HTML attributes
    // A simple regex approach that might not be perfect but catches general text:
    const regex = new RegExp(us, 'g');
    content = content.replace(regex, au);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.md') || file.endsWith('.mdx') || file.endsWith('.astro')) {
      processFile(fullPath);
    }
  }
}

processDirectory('./src/content');
processDirectory('./src/pages');
processDirectory('./src/components');
