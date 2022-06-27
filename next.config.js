/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.pixabay.com'],
  },
};
