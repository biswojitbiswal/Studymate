const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: isProd
          ? "https://studymate-server-production-07a6.up.railway.app/api/:path*"
          : "http://localhost:4040/api/:path*",
      },
    ];
  },
};

export default nextConfig;
