const path = require('path')

module.exports = {
    entry: "./main.js",
    output: {
        path: path.resolve(__dirname, "script"),
        filename: "main.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["latest"]
                },
                exclude: path.resolve(__dirname, "node_modules")
            }
        ]
    }
}
