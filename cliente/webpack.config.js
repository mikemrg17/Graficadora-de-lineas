const path = require("path");
const HtmlWPP = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    devServer: {
        port: 4000,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js','.jsx']
    }
    ,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWPP({
            template: './src/index.html'
        })
    ]
}