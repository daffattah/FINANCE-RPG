/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Work around a SWC minifier bug in Next 13.5.1 that corrupts escaped
  // backticks inside template literals (e.g. @radix-ui/react-progress),
  // producing invalid JS during "Collecting page data".
  swcMinify: false,
  // Avoid transient EAGAIN readdir errors in sandboxed filesystems by
  // disabling webpack persistent cache and output file tracing.
  webpack: (config) => {
    config.cache = false;
    // Reduce concurrent filesystem ops to avoid EAGAIN in sandboxed environments
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [],
      immutablePaths: [],
    };
    // Limit parallel processing to reduce filesystem contention
    config.parallelism = 1;
    return config;
  },
  outputFileTracing: false,
};

module.exports = nextConfig;
