/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { ConfigEnv, HtmlTagDescriptor, loadEnv, PluginOption, UserConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default (config: ConfigEnv): UserConfig => {
  /**
   * The third argument is the prefix that is using to filter env vars
   * from the process.env, by default 'VITE_'. So, the empty string
   * will load all of them.
   */
  const rawEnv = loadEnv(config.mode, process.cwd(), '')

  const plugins: (PluginOption | PluginOption[])[] = [
    react({
      // Exclude storybook stories
      exclude: /\.stories\.(t|j)sx?$/,
    }),
    tsconfigPaths(),
  ]

  const hasGA4MeasurementId = !!rawEnv.VITE_GA4_MEASUREMENT_ID

  const tags: HtmlTagDescriptor[] = []

  if (hasGA4MeasurementId) {
    tags.push(
      {
        injectTo: 'head',
        tag: 'script',
        attrs: {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${rawEnv.VITE_GA4_MEASUREMENT_ID}`,
        },
      },
      {
        injectTo: 'head',
        tag: 'script',
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${rawEnv.VITE_GA4_MEASUREMENT_ID}');
        `,
      },
    )
  }

  plugins.push({
    ...createHtmlPlugin({
      minify: true,
      inject: { tags },
    }),
    apply: 'build',
  })

  return {
    plugins,
    server: {
      port: Number(rawEnv.PORT) || 3000,
      strictPort: true,
      open: false,
    },
    build: {
      // if you are using sentry, you can use it to report the errors
      sourcemap: false,
    },
    test: {
      // Configure Vitest (https://vitest.dev/config/)
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        exclude: [
          'src/**/*.d.ts',
          'src/app.tsx',
          'src/**/index.{ts,tsx}',
          'src/typings/**/*.*',
          'src/theme/**/*.*',
          'src/services/**/*.*',
          'src/assets/**/*.*',
          'vitest.setup.ts',
        ],
      },
    },
  }
}
