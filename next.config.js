/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "index, follow" },
        ],
      },
      {
        source: "/:locale(fr|en|es|pt|de|it|ar|zh|ja|ko|ru|nl|pl|tr|hi|id|vi|th|sv|da|no|fi|el|ro|cs)/:path*",
        headers: [
          { key: "Content-Language", value: ":locale" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
