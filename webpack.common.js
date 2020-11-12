const webpack = require("webpack");
const path = require('path');

// plugins
// Referencia en index a nombres de archivos nuevos, genera un nuevo index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Limpiar archivos antiguos
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require("autoprefixer");

let htmlPageNames = [
    'example',
    'example2',
    'example3',
    'account/user',
];

let entries = {
    app: './src/index',
    print: './src/print',
    example: './src/container/example',
    example2: './src/container/example2',
    'account/user': './src/container/account/user',
    // react: 'react',
}

let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/views/${name}.pug`, // relative path to the HTML files
        filename: `pages/${name}.html`, // output HTML files
        inject: true,
        // inject: "body",
        // inject: false,
        chunks: [`${name}`], // respective JS files
        // title: 'mi titulo',
        // options: {
        //     title: "TEST!!!!!!!!!!!!!*"
        // },
    })
});
const htmlRules = {
    test: /\.html$/i,
    use: [
        {
            loader: 'extract-loader'
        }, 
        {
            loader: 'html-loader?interpolate=require',
            // options: {
            //     interpolate: true,
            //     preprocessor: {
            //         otro: 'esto'
            //     }
            // }
        }
    ],
}

const cssRules = (devMode) => {
    return ({
        test: /\.css$/,
        use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            // 'style-loader',
            'css-loader',
            "postcss-loader"
        ],
    })
}  

const sassRules = (devMode) => {
    return({
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            {
                loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                options: {
                    // publicPath: '/public/path/to/',
                }
            },
            // Translates CSS into CommonJS
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    
                },
            },    
            // Insert prefix in CSS
            "postcss-loader",
            // Compiles Sass to CSS
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                },
            },
        ],
    })
};

const imagesRules = {
    test: /\.(png|svg|jpg|gif)$/,
    loader: 'file-loader',
    options: {
        name: 'assets/images/[name].[contenthash].[ext]',
    },
};

const javaScriptRules = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
    }
};

const pugRules = {
    test: /\.pug$/,
    exclude: [path.resolve(__dirname, 'src/components'),], 
    use: [{
        loader: 'apply-loader'
    }, {
        loader: 'pug-loader',
        options: { pretty: true }
    }]
}

const baseConfig = (env, {mode}) =>{
    console.log('MODE: ', env, mode )//
    // console.log('Production: ', env.production); // true
    const devMode = mode !== 'production';
    const prodMode = mode === 'production';

    return {
        entry:  entries,
      
        output: {
            filename: 'static/js/[name].bundle.js',
            path: path.resolve(__dirname, 'public'),
            publicPath: '/',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Output',
                // filename: 'index.html',
                filename: 'index.[contenthash].html',
                meta: {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    'theme-color': '#4285f4'
                },
                chucks: [
                    'app',
                ],
                // excludeChunks: [
                //     'example',
                //     'example2'
                // ]
                options: {
                    title: 'test'
                }
                
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'static/css/[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
                // filename: devMode ? '[name].css' : '[name].[contenthash].css',
                // chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
            }),
            // use for autoprefix
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [
                        autoprefixer()
                    ]
                }
            }),
            new ESLintPlugin({
                files: 'src/**/*.js',
            }),
          
        ].filter(Boolean).concat(multipleHtmlPlugins),

        module: {
            rules: [
                htmlRules,
                cssRules(devMode),
                sassRules(devMode),
                imagesRules,
                javaScriptRules,
                pugRules
            ],
        },
        optimization: {
            minimize: prodMode,
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                // `...`
                new CssMinimizerPlugin(),
                // new HtmlMinimizerPlugin(),
                new TerserPlugin()
            ],
            splitChunks: {
                chunks: 'all',
                // chunks: 'async',
                name: 'vendor',
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        // idHint: 'vendors',

                        filename: 'static/js/vendors/[name].bundle.js',
                    },
                    // 'vendor-react': {
                        //     name: 'vendor-react',
                        //     test: /[\\/]node_modules[\\/]react.*?[\\/]/,
                        //     chunks: 'initial',
                        //     priority: 2
                        // },
                    reactVendor: {
                        name: "react-vendor",
                        filename: 'static/js/vendors/[name].bundle.js',
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        priority: 2,
                    },
                    utilityVendor: {
                        name: "utilityVendor",
                        filename: 'static/js/vendors/[name].bundle.js',
                        test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                        priority: 2,
                    },
                
                }
            },
        },
    }
};

module.exports = baseConfig