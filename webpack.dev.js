const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// const NpmInstallPlugin = require("npm-install-webpack-plugin")

module.exports = (env,params) =>{

    return merge(common(env,params),{
        mode: 'development',
        devtool: 'inline-source-map',
        // servidor para development
        devServer: {
            contentBase:  path.resolve(__dirname, 'public'),
            // compress gzip en localhost
            compress: true,
            liveReload: true,
            open: true,
            port: 8080,
            https: true,
            // host: "0.0.0.0",
            // hot: false,
            // mostrar errores de compilación en el navegador
            overlay: true,
            // overlay: {
            //     warnings: true,
            //     errors: true,
            // },
            allowedHosts: [
                // 'host.com',
                // 'subdomain.host.com',
                // 'host2.com'
            ]
        },
        plugins: [
            // new NpmInstallPlugin()
        ]
    
    });

} 