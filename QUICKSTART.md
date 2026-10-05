# Quickstart Guide

This guide explains how to build and run the **Applied LLM Patterns** website locally, as well as how to fork the repository to create your own customized library.

The website is built using [Astro](https://astro.build/), a fast, static-first web framework. No database or backend server is required.

## 🛠 Prerequisites

- **Node.js** (v20 or higher recommended)
- **npm** (comes with Node.js)
- **Git**

## 💻 Running the Site Locally

If you just want to view the site or test changes locally, follow these steps:

1. **Install Dependencies:**
   Open your terminal in the root of the project and run:
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:4321`. The Astro dev server includes Hot Module Replacement (HMR), so any changes you make to Markdown files or components will instantly reflect in the browser.

3. **Validate Content (Optional but recommended):**
   To ensure all Markdown content adheres to our editorial schemas, run:
   ```bash
   npm run test
   ```

4. **Build for Production:**
   To generate the static HTML files, run:
   ```bash
   npm run build
   ```
   The production-ready static files will be placed in the `dist/` directory.

*(Note: If you run into telemetry permission issues in restricted environments, prefix the build command with `ASTRO_TELEMETRY_DISABLED=1`).*

---

## 🍴 Forking and Building Your Own Copy

If you want to use this architecture to host your own internal team prompt library or a personalized knowledge base, you can easily fork and deploy this project.

### Step 1: Fork the Repository
Click the **Fork** button at the top right of the GitHub repository page to create a copy in your own GitHub account or organization.

### Step 2: Update Astro Configuration
Before deploying, you need to update the site URLs so that internal routing and sitemaps work correctly.

Open `astro.config.mjs` and update the `site` and `base` properties:
```javascript
export default defineConfig({
  // Your GitHub Pages URL (e.g., https://yourusername.github.io)
  site: 'https://[YOUR_USERNAME].github.io', 
  
  // Your repository name (starts with a forward slash)
  // If you are deploying to a root domain (e.g. username.github.io), remove the 'base' property entirely.
  base: '/[YOUR_REPO_NAME]', 
  
  output: 'static',
  integrations: [sitemap()]
});
```

### Step 3: Clear the Seed Content
If you want to start fresh, you can safely delete the markdown files inside the following directories (but keep the directories themselves):
- `src/content/examples/`
- `src/content/lessons/`
- `src/content/domains/`

Then, add your own Markdown files following the frontmatter schemas defined in `CONTRIBUTING.md`.

### Step 4: Deploy to GitHub Pages
This repository comes pre-configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically deploy the site.

To enable it:
1. Go to your forked repository on GitHub.
2. Click on **Settings** > **Pages**.
3. Under **Build and deployment**, change the **Source** dropdown to **GitHub Actions**.
4. Push a change to your `main` branch. 
5. Go to the **Actions** tab in GitHub to watch the site build and deploy!

Your custom prompt library is now live!
