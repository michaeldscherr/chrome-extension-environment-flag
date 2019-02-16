const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const aliases = {
    src: 'source',
    dist: 'dist',
    suffix: 'bundle',
    vendor: 'vendor',
};
const basePath = __dirname;
const paths = {
    source: path.resolve(basePath),
    dist: path.resolve(basePath, aliases.dist),
};
const webpackOptions = {
    shouldSplitChunks: false,
};

const webpackConfig = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isDevelopment = !isProduction;
    const isSync = !!argv.sync || false;

    const config = {
        entry: {
            options: `${paths.source}/options/options.js`,
        },
        output: {
            filename: `[name].${aliases.suffix}.js`,
            chunkFilename: `${aliases.vendor}.${aliases.suffix}.js`,
            path: paths.dist,
            publicPath: `/${aliases.dist}/`,
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.vue', '.js', '.json'],
            modules: [path.resolve(paths.source, aliases.src), 'node_modules'],
            alias: {
                '@': path.resolve(paths.source),
            },
            symlinks: false,
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin([`${paths.dist}/**/*.${aliases.suffix}.*`], {
                verbose: false,
            }),
        ],
        optimization: {
            minimize: isProduction,
        },
        target: 'web',
        stats: {
            hash: false,
            colors: true,
            modules: false,
            version: false,
            children: false,
            entrypoints: false,
        },
        devtool: 'source-map',
        watchOptions: {
            ignored: /node_modules/,
        },
    };

    if (webpackOptions.shouldSplitChunks) {
        config.optimization.splitChunks = {
            chunks: 'all',
        };
    }

    if (isDevelopment) {
        //
    }

    if (isProduction) {
        //
    }

    return config;
};

module.exports = webpackConfig;
