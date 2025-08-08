import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.azizov.dev',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'i.tb-content.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '217.199.253.46',
        port: '3001',
        pathname: '/uploads/images/**',
      },
    ],
  },
};

export default nextConfig;
