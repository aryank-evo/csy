/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      'react-google-reviews',
      'leaflet',
      'react-leaflet'
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Skip static export since this is a hybrid app with API routes
  trailingSlash: true,
  generateEtags: false,
  async redirects() {
    return [
      {
        source: '/dashboard/review',
        destination: '/dashboard',
        permanent: false,
      },
      {
        source: '/city-builders-test',
        destination: '/city-builders',
        permanent: false,
      },
      {
        source: '/pricing_01',
        destination: '/pricing_02',
        permanent: false,
      }
    ]
  }
}

module.exports = nextConfig
