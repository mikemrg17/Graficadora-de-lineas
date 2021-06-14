const path = require("path");
const HtmlWPP = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        port: 4000,
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
            },
            {
                test: /\.(jpeg|png|jpg|svg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:6].[ext]',
                    outputPath: 'images',
                    publicPath: 'images',
                    emitFile: true,
                    esModule: false
                }, 
            },
        ]
    },
    plugins: [
        new HtmlWPP({
            template: './src/index.html'
        })
    ]
}