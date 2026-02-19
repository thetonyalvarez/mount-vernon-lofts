import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live https://embed.tawk.to https://*.tawk.to https://cdnjs.cloudflare.com https://connect.facebook.net https://*.facebook.com https://*.fbcdn.net;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.tawk.to;
      font-src 'self' https://fonts.gstatic.com https://*.tawk.to;
      img-src 'self' data: https: blob:;
      media-src 'self' https://*.tawk.to;
      connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://*.s3.amazonaws.com https://vercel.live https://*.tawk.to wss://*.tawk.to https://*.pusher.com wss://*.pusher.com https://connect.facebook.net https://*.facebook.com https://*.fbcdn.net https://graph.facebook.com;
      frame-src 'self' https://www.googletagmanager.com https://www.google.com https://*.google.com https://maps.google.com https://vercel.live https://*.tawk.to;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mount-vernon-lofts.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Remove trailing slashes for consistent canonical URLs
  trailingSlash: false,
  async redirects() {
    return [
      // Search Console Issue #2: WWW to non-WWW redirect (primary canonical preference)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.mtvernonlofts.com',
          },
        ],
        destination: 'https://mtvernonlofts.com/:path*',
        permanent: true,
      },
      // Search Console Issue #3: Handle legacy HTTP WWW variant
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.mtvernonlofts.com',
          },
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://mtvernonlofts.com/:path*',
        permanent: true,
      },
      // Search Console Issue #1: HTTP to HTTPS redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://mtvernonlofts.com/:path*',
        permanent: true,
      },
      // Remove trailing slashes from all pages
      {
        source: '/residences/',
        destination: '/residences',
        permanent: true,
      },
      {
        source: '/amenities/',
        destination: '/amenities',
        permanent: true,
      },
      {
        source: '/neighborhood/',
        destination: '/neighborhood',
        permanent: true,
      },
      {
        source: '/architecture/',
        destination: '/architecture',
        permanent: true,
      },
      {
        source: '/gallery/',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/team/',
        destination: '/team',
        permanent: true,
      },
      // Search Console Issue #4: Handle query parameters that should be ignored (like ?index=1)
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'index',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          // Dynamic canonical header based on path
          {
            key: 'Link',
            value: '<https://mtvernonlofts.com/:path*>; rel="canonical"'
          },
          // Preferred domain header
          {
            key: 'X-Preferred-Domain',
            value: 'mtvernonlofts.com'
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding'
          }
        ],
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
