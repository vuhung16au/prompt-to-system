const fs = require('fs');

function addBreadcrumbs(filePath, parentLabel, parentPath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('Breadcrumbs.astro')) {
    content = content.replace(
      "import Container from '@/components/layout/Container.astro';", 
      "import Breadcrumbs from '@/components/ui/Breadcrumbs.astro';\nimport Container from '@/components/layout/Container.astro';"
    );
    
    const breadcrumbTag = `
        <div class="mb-6 not-prose">
          <Breadcrumbs items={[
            { label: 'Home', href: import.meta.env.BASE_URL + '/' },
            { label: '${parentLabel}', href: import.meta.env.BASE_URL + '${parentPath}' },
            { label: entry.data.title }
          ]} />
        </div>
        `;
        
    content = content.replace('<Prose>', `<Prose>\n${breadcrumbTag}`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath} with breadcrumbs`);
  }
}

addBreadcrumbs('src/pages/learn/[id].astro', 'Learn', '/learn');
addBreadcrumbs('src/pages/examples/[id].astro', 'Examples', '/examples');
addBreadcrumbs('src/pages/domains/[id].astro', 'Domains', '/domains');

