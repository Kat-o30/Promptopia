/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove appDir from experimental
    serverExternalPackages: ["mongoose"], // This is now correctly placed outside experimental
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    }
};

export default nextConfig;
