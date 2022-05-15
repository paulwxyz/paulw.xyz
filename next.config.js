module.exports = {
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
    webpack: (config, options) => {
        config.experiments = { asset: true };

        const { cache } = require('./util/slug');

        config.plugins.push(
            {
                apply: (compiler) => {
                    compiler.hooks.beforeCompile.tap('cachePostDataBC', _ => {
                        cache();
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
            {
                resourceQuery: /raw/,
                type: 'asset/source',
            },
        );

        return config
    },
}