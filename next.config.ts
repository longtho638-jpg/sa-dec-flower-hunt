import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboard',
  //       destination: '/admin',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
