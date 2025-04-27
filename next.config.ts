import type {NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';

let config: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.txt': {
                as: '*.js',
                loaders: ['raw-loader'],
            },
            '*.md': {
                as: '*.js',
                loaders: ['raw-loader'],
            }
        },
        resolveExtensions: ['.txt', '.md', '.tsx', '.ts', '.js']
    },
    webpack: (config, _options) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: [{ loader: '@svgr/webpack' }],
            },
            {
                test: /\.md$/,
                type: 'asset/source',
            },
            {
                test: /\.otf$/,
                type: 'asset/resource',
            },
            {
                test: /\.txt$/,
                type: 'asset/source',
            },
        );

        return config;
    },
};

if (process.env.ANALYZE) {
    config = NextBundleAnalyzer({
        enabled: true
    })(config);
}

export default config;
