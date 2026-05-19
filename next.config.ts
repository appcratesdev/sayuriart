import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/sanity-image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/en/terms-of-use",
        destination: "/en/regulamin",
      },
      {
        source: "/en/privacy-policy",
        destination: "/en/polityka-prywatnosci",
      },
    ];
  },
};

export default nextConfig;
