module.exports = {
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
    webpack: (config, options) => {
        config.experiments = { asset: true };

        config.module.rules.push(
            {
                test: /\.svg$/,
                use: [{ loader: "@svgr/webpack" }]
            },
            {
                test: /\.md$/,
                type: 'asset/source'
            },
            {
                test: /\.otf$/,
                type: 'asset/resource'
            },
            {
                resourceQuery: /raw/,
                type: 'asset/source',
            }
        );

        return config
    },
}