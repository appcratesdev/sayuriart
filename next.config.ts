import type { NextConfig } from "next";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9u4sqgld";
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/sanity-image-loader.ts",
    qualities: [75, 85, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
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
