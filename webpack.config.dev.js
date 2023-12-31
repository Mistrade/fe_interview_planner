const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: [path.join(process.cwd(), 'src', 'index.tsx')],
    output: {
        clean: true,
        path: path.join(process.cwd(), 'dist'),
        publicPath: "/",
        filename: "app.js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [
            path.resolve(process.cwd(), './node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'public', 'index.html'),
            // favicon: './public/favicon.ico',
            hash: true,
            scriptLoading: 'defer',
            title: "React App with Webpack"
        }),
        new CopyWebpackPlugin({
            patterns: [
                './public/.htaccess',
                // './public/robots.txt',
                // './public/manifest.json',
            ],
        }),
    ],
    devServer: {
        port: 9090,
        hot: true,
        historyApiFallback: true,
    }
}