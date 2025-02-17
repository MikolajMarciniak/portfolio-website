/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  output: "export",
  basePath: "",
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  experimental: {
    forceSwcTransforms: true,
    serverSourceMaps: false,
  },
};

export default nextConfig;
