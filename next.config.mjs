/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns kullanımı
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**", // Tüm yolları kapsayacak şekilde ayarlandı
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // Tüm yolları kapsayacak şekilde ayarlandı
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**", // Tüm yolları kapsayacak şekilde ayarlandı
      },
    ],
  },
  compiler: { styledComponents: true },
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
