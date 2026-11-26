import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      {
        name: 'copy-static-menu-files',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const foldersToCopy = ['assets', 'css', 'js'];
          for (const folder of foldersToCopy) {
            const srcPath = path.resolve(__dirname, folder);
            const destPath = path.resolve(distDir, folder);
            if (fs.existsSync(distDir) && fs.existsSync(srcPath)) {
              fs.cpSync(srcPath, destPath, {recursive: true, force: true});
            }
          }
          const filesToCopy = ['.nojekyll', '404.html'];
          for (const file of filesToCopy) {
            const srcFile = path.resolve(__dirname, file);
            const destFile = path.resolve(distDir, file);
            if (fs.existsSync(distDir) && fs.existsSync(srcFile)) {
              fs.copyFileSync(srcFile, destFile);
            }
          }
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distSrcAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distSrcAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
