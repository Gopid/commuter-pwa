const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    }
});