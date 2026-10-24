import { defineConfig } from 'vitest/config'
import path from 'node:path'

// Testy obsahu a hier: npm test
export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname) } },
  esbuild: { jsx: 'automatic' },
  // hry s rýmami prejdú tisícky kombinácií, preto dlhší čas na test
  test: { include: ['tests/**/*.test.ts'], environment: 'node', testTimeout: 180000 },
})
