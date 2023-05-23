const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodPublicPath = '/rhythms';

module.exports = (env, argv) => {
    return {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-map' : 'eval',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: env.production ? prodPublicPath : '/'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        env.production ?  MiniCssExtractPlugin.loader : 'style-loader',
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.wav$/,
                    type: 'asset/resource'
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            ...env.production ? [new MiniCssExtractPlugin()] : [],
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'templates/index.html')
            })
        ],
        devServer: {
            static: path.resolve(__dirname, 'dist')
        },
        stats: {
            errorDetails: true
        }
    };
};