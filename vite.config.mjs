import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { extname, relative } from 'path';
import { defineConfig } from 'vite';
import { copy } from 'vite-plugin-copy';
const files = Object.fromEntries(
  (
    await glob('output/src/**/*{.ts,.tsx}', {
      ignore: ['output/node_modules/**/*', 'output/node_modules/'],
    })
  ).map(file => {
    const key = relative(
      'output/src',
      file.slice(0, file.length - extname(file).length)
    );
    console.log(key);
    return [key, file];
  })
);

export default defineConfig({
  plugins: [react(), copy([{ src: 'output/package.json', dest: 'dist/' }])],
  build: {
    emptyOutDir: true,
    lib: {
      entry: files,
    },
    rollupOptions: {
      external: ['@mui/material', 'react', 'react/jsx-runtime'],
      input: files,
      output: [
        {
          dir: 'dist/esm',
          format: 'es',
          preserveModules: true,
          entryFileNames: '[name].mjs',
        },
        {
          dir: 'dist/cjs',
          format: 'cjs',
          preserveModules: true,
          entryFileNames: '[name].cjs',
        },
      ],
    },
  },
});
