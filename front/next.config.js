/**
 * @format
 * @type {import('next').NextConfig}
 */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['leonardo.osnova.io', 'upload.wikimedia.org', 'localhost', 'f55c-89-154-40-241.eu.ngrok.io', 'www.seekpng.com'],
  },
};
