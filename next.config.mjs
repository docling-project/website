const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
      {
        source: "/discord",
        destination: "/discord/index.html"
      }
    ];
  },
};

export default nextConfig;
