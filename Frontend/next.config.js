/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    // URL of your backend API (update in production)
    NEXT_PUBLIC_API_BASE_URL: "http://localhost:5000/api",
  },
};

module.exports = nextConfig;
