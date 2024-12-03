import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import dts from 'vite-plugin-dts';

// @ts-ignore : types are not available
import { copy } from 'vite-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['lib'], outDir: './build/types' }),
    copy([{ src: 'lib/package.json', dest: 'build/' }]) as PluginOption,
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
    },
    copyPublicDir: false,
    emptyOutDir: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}', {
            ignore: ['lib/**/*.d.ts'],
          })
          .map(file => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: [
        {
          dir: 'build/esm',
          format: 'es',
          preserveModules: true,
          entryFileNames: '[name].mjs',
          exports: 'named',
        },
        {
          dir: 'build/cjs',
          format: 'cjs',
          preserveModules: true,
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
      ],
    },
  },
});
