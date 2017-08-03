const commonPaths = require('./common-paths');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
    entry: './src/',
    output: {  
        filename: 'bundle.js',
        path: commonPaths.outputPath
    },  

    module: {
        rules: [
            {
                test: /\.png/,
                use: [
                    {
                        loader: "url-loader",
                        options: { limit: 10000 }
                    }
            
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'latest']
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}

module.exports = config;