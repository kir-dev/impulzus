/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'] // Only run ESLint in src during production builds (next build)
  },
  experimental: {
    forceSwcTransforms: true,
    useCache: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'warp.sch.bme.hu',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'impulzus-web.bercsenyi.bme.hu',
        pathname: '/impulzus-archive/**'
      }
    ]
  }
}
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

module.exports = withNextIntl(nextConfig)
