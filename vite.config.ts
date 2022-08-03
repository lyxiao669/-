import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const projectRootDir = path.resolve(__dirname)

// export const PROXY_MAGIC_URL = 'https://tiankongart.cn'
export const PROXY_MAGIC_URL = 'https://m.taiart.cn'
export const PROXY_NOTICE_URL = 'https://static.taiart.cn/'

export const PROXY_QINIU_API_URL = 'http://124.71.130.192:7000'

const proxy = {
  '/api': {
    target: PROXY_MAGIC_URL,
    changeOrigin: true,
  },
  '/page/1': {
    target: PROXY_NOTICE_URL,
    changeOrigin: true,
  },
}

export default defineConfig({
  server: {
    proxy: proxy,
    host: '0.0.0.0'
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(projectRootDir, 'src')
      },
      {
        find: '@libUtils',
        replacement: path.resolve(projectRootDir, 'src/frame/utils')
      },
      {
        find: '@libComponents',
        replacement: path.resolve(projectRootDir, 'src/frame/components/normal')
      }
    ]
  },
  plugins: [vue()]
})