import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin product-image uploads travel through Server Actions as base64.
    // Raise the default 1MB limit so typical 2–5MB photos go through.
    serverActions: { bodySizeLimit: "10mb" },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        // Supabase Storage public URLs: https://<project-ref>.supabase.co/storage/...
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
