import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/", destination: "/id", permanent: true }];
  },
};

export default nextConfig;
