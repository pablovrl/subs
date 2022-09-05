/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost"],
	},
	env: {
		URL: process.env.URL,
	},
};

module.exports = nextConfig;
