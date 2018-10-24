const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            }
        })
    ]
});