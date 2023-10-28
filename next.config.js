/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'] // Only run ESLint in src during production builds (next build)
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'warp.sch.bme.hu',
        pathname: '/images/**'
      }
    ]
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate(nextConfig)
