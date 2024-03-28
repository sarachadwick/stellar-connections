/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  'index.html': {
    file: {
      contents: `
      <!doctype html>
      <html lang="en">
        <head>
        </head>
        <body>
          <div id="app"></div>
          <script type="module" src="/main.js"></script>
        </body>
      </html>`,
    },
  },
  'App.svelte': {
    file: {
      contents: `<script lang="ts">
  let name:number = 'world';
</script>

<h1>Hello {name}!</h1>`,
    },
  },
  'package.json': {
    file: {
      contents: `
      {
        "name": "minimum-vite",
        "private": true,
        "version": "0.0.0",
        "type": "module",
        "scripts": {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview",
          "check": "svelte-check --tsconfig ./tsconfig.json"
        },
        "devDependencies": {
          "@sveltejs/vite-plugin-svelte": "^3.0.2",
          "@tsconfig/svelte": "^5.0.2",
          "svelte-check": "^3.6.7",
          "tslib": "^2.6.2",
          "typescript": "^5.2.2",
          "svelte": "^4.2.12",
          "vite": "^5.2.0"
        }
      }
      `,
    },
  },
    "vite.config.js": {
      file: {
        contents: `
        import { defineConfig } from 'vite';
        import { svelte } from '@sveltejs/vite-plugin-svelte'
        
        export default defineConfig({
          plugins: [svelte(), {
            name: "configure-response-headers",
            configureServer: (server) => {
              server.middlewares.use((_req, res, next) => {
                res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                next();
              });
            },
          }],
          server: {
            port: 3000,
            headers: {
              'Cross-Origin-Embedder-Policy': 'require-corp',
              'Cross-Origin-Opener-Policy': 'same-origin',
            },
          },
        });`,
    },
  },
  "main.js": {
    file: {
      contents: `
      import App from './App.svelte';
      
      const app = new App({
        target: document.getElementById('app'),
      });
      
      export default app;`,
    },
  },
  "svelte.config.js": {
    file: {
      contents: 
        `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

        export default {
          // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
          // for more information about preprocessors
          preprocess: vitePreprocess(),
        }
        `
    }
  },
  "tsconfig.json": {
    file: {
      contents: `
      {
        "extends": "@tsconfig/svelte/tsconfig.json",
        "compilerOptions": {
          "target": "ESNext",
          "useDefineForClassFields": true,
          "module": "ESNext",
          "resolveJsonModule": true,
          /**
           * Typecheck JS in .svelte and .js files by default.
           * Disable checkJs if you'd like to use dynamic types in JS.
           * Note that setting allowJs false does not prevent the use
           * of JS in .svelte files.
           */
          "allowJs": true,
          "checkJs": true,
          "isolatedModules": true
        },
        "include": ["*.svelte"],
        "references": [{ "path": "./tsconfig.node.json" }]
      }
      `
    }
  },
  "tsconfig.node.json": {
    file: {
      contents: `{
        "compilerOptions": {
          "composite": true,
          "skipLibCheck": true,
          "module": "ESNext",
          "moduleResolution": "bundler",
          "strict": true
        },
        "include": ["vite.config.ts"]
      }
      `
    }
  }
};