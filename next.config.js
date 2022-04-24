module.exports = {
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
    webpack: (config, options) => {
        config.experiments = { asset: true };

        const { cachePostLinkData } = require('./util/post-cache');

        config.plugins.push(
            {
                apply: (compiler) => {
                    compiler.hooks.initialize.tap('cachePostLinkDataInit', _ => {
                        cachePostLinkData();
                    });
                }
            }
        )

        config.module.rules.push(
            {
                test: /\.ya?ml$/,
                use: 'js-yaml-loader',

            },
            {
                test: /\.svg$/,
                use: [{ loader: "@svgr/webpack" }],
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
                resourceQuery: /raw/,
                type: 'asset/source',
            },
        );

        return config
    },
}