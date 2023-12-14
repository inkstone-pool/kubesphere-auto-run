import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
export default {
  input: {
    index: 'src/index.ts',
    WeComWebhook: 'src/WeComWebhook.ts',
  },
  output: [
    {
      dir: 'dist',
      entryFileNames: `[name].[format].js`,
      format: 'cjs',
    },
    {
      dir: 'dist',
      entryFileNames: `[name].[format].js`,
      format: 'es',
    },
  ],
  external: ['puppeteer', 'axios'],
  plugins: [
    resolve({
      exportConditions: ['node'], // 指定解析的环境条件为 node
    }),
    commonjs(),
    json(),
    typescript(),
  ],
}
