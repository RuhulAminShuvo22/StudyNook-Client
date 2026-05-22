// .mjs
/** @type {import('next').NextConfig} */
const nextConfig = {

  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [

      // Pixabay
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },

      // Any external image URL
      {
        protocol: "https",
        hostname: "**",
      },

    ],
  },

};

export default nextConfig;