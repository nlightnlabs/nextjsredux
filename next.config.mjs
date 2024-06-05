/** @type {import('next').NextConfig} */

const environment = process.env.NODE_ENV;

const nextConfig = {
    basePath: environment === "production" ? '/nextjsredux' : '',
};

export default nextConfig;
