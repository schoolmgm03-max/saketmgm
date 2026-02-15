  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "via.placeholder.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "source.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "plus.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },

    // 👇 Webpack config
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          canvas: false, // client-side build me canvas ignore
          fs: false,     // fs ko bhi ignore kar do
          path: false,   // path ko bhi ignore kar do
        };
      }
      return config;
    },
  };

  export default nextConfig;
