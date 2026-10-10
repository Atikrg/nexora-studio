import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // FRONTEND ONLY: fully static site in /out (no server, API routes or Server Actions)
  output: "export",
  // Emits /about/index.html, which works on any static host without rewrites
  trailingSlash: true,
  // Static export has no image optimiser. Images ship pre-sized with explicit width/height
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  poweredByHeader: false,
  // Tree-shake heavy barrel packages
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "gsap"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
