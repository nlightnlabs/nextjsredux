/** @type {import('next').NextConfig} */

const environment = process.env.NODE_ENV;

const nextConfig = {
    basePath: environment === "production" ? '/nextjsredux' : '',
    assetPrefix: environment === "production" ? '/nextjsredux/' : '',
    images: {
        loader: 'default',
        path: environment === "production" ? '/nextjsredux/_next/image':'/_next/image',
  },
};

export default nextConfig;
