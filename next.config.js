/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // allow media1, media2, media3, media4 from s3-media*.fl.yelpcdn.com, where * is a wildcard
        hostname: "*.fl.yelpcdn.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
