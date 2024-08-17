/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  output: "export",
  basePath: "",
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
