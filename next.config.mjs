/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add your configuration options here
    images: {
        domains: ['res.cloudinary.com'],
    },

    // Add other configuration options as needed
    webpack: (config) => {
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    },
};

export default nextConfig;