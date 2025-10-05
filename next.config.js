/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Prevent Next from inferring a wrong workspace root when multiple lockfiles exist
  outputFileTracingRoot: path.join(__dirname),
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
