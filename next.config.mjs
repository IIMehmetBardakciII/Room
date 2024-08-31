/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    // SVGR ile SVG desteği ekleyin
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
