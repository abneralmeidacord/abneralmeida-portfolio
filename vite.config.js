import path from 'node:path'
import { cpSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const require = createRequire(import.meta.url)
const pdfjsPath = path.dirname(require.resolve('pdfjs-dist/package.json'))

// Disponibiliza os recursos do PDF.js no desenvolvimento e no build, sem CDN.
for (const directory of ['cmaps', 'standard_fonts', 'wasm']) {
  cpSync(path.join(pdfjsPath, directory), fileURLToPath(new URL(`./public/pdfjs/${directory}/`, import.meta.url)), { recursive: true })
}

export default defineConfig({ plugins: [react()] })
