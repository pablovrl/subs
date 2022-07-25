/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost"],
	},
	env: {
		URL: process.env.URL,
		DB: process.env.DB,
		DB_USER: process.env.DB_USER,
		DB_PASS: process.env.DB_PASS,
		DB_HOST: process.env.DB_HOST,
		DB_DIALECT: process.env.DB_DIALECT,
	},
};

module.exports = nextConfig;
