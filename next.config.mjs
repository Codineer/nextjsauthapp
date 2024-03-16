/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add your configuration options here
    images: {
        domains: ['res.cloudinary.com'],
    },
    pages: {
        // If 'app' is a subdirectory of the root
        '/': { page: '/app' },

        // If 'app' is the root directory
        '/': { page: '/' },
    },
    // Add other configuration options as needed
    webpack: (config) => {
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    },
};

export default nextConfig;