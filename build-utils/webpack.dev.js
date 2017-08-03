const config = {
    devtool: "eval-source-map",
    devServer: {
        port: 8000,
        contentBase: './dist',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000/',
            },
        },
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    }
}

module.exports = config