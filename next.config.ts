import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['html2pdf.js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "img.yad2.co.il",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
