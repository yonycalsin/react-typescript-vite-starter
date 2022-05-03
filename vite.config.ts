import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { ConfigEnv, HtmlTagDescriptor, loadEnv, PluginOption, UserConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default (config: ConfigEnv): UserConfig => {
  /**
   * The third argument is the prefix that is using to filter env vars
   * from the process.env, by default 'VITE_'. So, the empty string
   * will load all of them.
   */
  const rawEnv = loadEnv(config.mode, process.cwd(), '')

  const plugins: (PluginOption | PluginOption[])[] = [reactRefresh()]

  if (config.command === 'build') {
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

    plugins.push(
      createHtmlPlugin({
        minify: true,
        inject: { tags },
      }),
    )
  }

  return {
    plugins,
    server: {
      port: Number(rawEnv.PORT) || 3000,
      strictPort: true,
      open: true,
    },
    build: {
      // when you have sentry enabled, you can use it to report errors
      sourcemap: false,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  }
}
