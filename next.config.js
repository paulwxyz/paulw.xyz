module.exports = {
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
    webpack: (config, _options) => {
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
    images: {
        domains: ['avatars.githubusercontent.com']
    },
}
