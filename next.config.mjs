/** @type {import('next').NextConfig} */
import pkg from "./next-i18next.config.js";

const { i18n } = pkg;

const nextConfig = {
  reactStrictMode: true,
  i18n,

  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "agriturismosegarelli.it",
      "www.facebook.com",
      "openweathermap.org",
      "source.unsplash.com",
      "picsum.photos",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: false,
  },
};

export default nextConfig;
