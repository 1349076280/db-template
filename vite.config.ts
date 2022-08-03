import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { changePackageVersion } from "./build/plugins"
import { readdirSync } from 'fs';
import { AutoImportDeps } from './autoImport';

/**
 * 获取多入口文件
 * @returns
 */
export function getPages() {
  let pagePath = resolve(__dirname, "./src/pages");
  let files: string[] = readdirSync(pagePath);
  let pages: { [key: string]: string } = {
    main: resolve(__dirname, 'index.html')
  };
  for (let i = 0; i < files.length; i++) {
    let key = files[i].replace('.html', '');
    if (key === 'index') continue;
    pages[key] = resolve(__dirname, `src/pages/${files[i]}`);
  }
  return pages;
}

// https://vitejs.dev/config/
export default ({mode}: any) => defineConfig({
  base: `/${loadEnv(mode, './').VITE_MODULE_NAME}`,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    host: process.env.NODE_ENV !== "production",
    proxy: {
      '/reqxml': {
        target: 'http://10.63.40.98:83',
      },
      '/reqlocal': {
        target: 'http://222.168.95.187:7773',
      }
    }
  },
  plugins: [
    changePackageVersion(),
    vue({
      refTransform: [/src/]
    }),
    AutoImportDeps()
  ],
  build: {
    outDir: loadEnv(mode, './').VITE_MODULE_NAME,
    rollupOptions: {
      input: getPages(),
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          let extType = ''
          if (assetInfo && assetInfo.name ) {
            let info = assetInfo.name
            if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(info)) {
              extType = 'img'
            }
          }
          if (assetInfo && assetInfo.name ) {
            let info = assetInfo.name
            if (/\.(css)(\?.*)?$/.test(info)) {
              extType = 'css'
            }
          }
          return extType  + '/[name]-[hash].[ext]'
        }
      },
    }
  },
})
