const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// interactive zoomable treemap.
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// gzip files
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = (env, params)=> {
    return merge(common(env,params), {
        mode: 'production',
        devtool: 'source-map',
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'report-stats.html',
                openAnalyzer: false,
            }),
            new CompressionPlugin({
                test: /\.js|css(\?.*)?$/i,
                // test: /\.js$|\.css$|\.html$/,
                // exclude: /\/excludes/,
            })
        ],
        module: {
            rules: [
            ],
        },
    });

    
} 