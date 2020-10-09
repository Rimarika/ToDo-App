const path = require("path");
const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (environment, options) {
    const isDevMode = options.mode === 'development';

    const stats = {
        colors: true,
        hash: false,
        timings: true,
        assets: false,
        modules: false,
        children: false,
    };

    return {
        stats: stats,
        entry: {
            app: "./src/js/index.js"
        },
        output: {
            filename: isDevMode ? '[name].bundle.js' : '[name].[hash].bundle.js',
            path: path.resolve(__dirname, "public/dist")
        },
        watch: false,
        mode: isDevMode ? "development" : "production",
        devtool: isDevMode ? 'source-map' : false,
        module: {
            rules: [{
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(c|sc|sa)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            sourceMap: isDevMode,
                        }
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            sourceMap: isDevMode,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                Autoprefixer,
                            ],
                            sourceMap: isDevMode,
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                    }
                }]
            }
            ]
        },
        devServer: {
            stats: stats,
            contentBase: path.resolve(__dirname, 'public'),
            publicPath: 'http://localhost:8080/dist/'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: isDevMode ? '[name].bundle.css' : '[name].[hash].bundle.css',
            }),
        ],

    }
};