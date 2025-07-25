/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "tr.rbxcdn.com",
      "thumbnails.roblox.com",
      "encrypted-tbn0.gstatic.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tr.rbxcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "thumbnails.roblox.com",
        pathname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
