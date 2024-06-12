/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
        {
          protocol: 'https',
          hostname: 'sgp1.digitaloceanspaces.com',
        },
        {
          protocol: 'https',
          hostname: 'framefeeling.sgp1.cdn.digitaloceanspaces.com',
        },
      ]
    }
  }

export default nextConfig;
