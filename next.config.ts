import type {NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';

let config: NextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
    // not sure why this breaks prod build in the latest version
    // aah it's so frustrating to deal with an warning log that
    // shows up regardless of the config but its presence halts
    // the entire thing. 
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
