const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: "./src/main.js",
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "./build"),
        // assetModuleFilename: "img/[name]_[hash:6][ext]"
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 // require("autoprefixer"), //postcss-preset-env中包含了autoprefixer插件
                    //                 // require("postcss-preset-env")
                    //                 "postcss-preset-env"
                    //             ]
                    //         }
                    //     }
                    // }
                    "postcss-loader"
                ]
            }, {
                test: /\.less$/,
                use: ["style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    // { //将配置插件抽取到单独的文件
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 // require("autoprefixer"), //postcss-preset-env中包含了autoprefixer插件
                    //                 // require("postcss-preset-env")
                    //                 "postcss-preset-env"
                    //             ]
                    //         }
                    //     }
                    // },
                    "postcss-loader",
                    "less-loader"
                ]
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/,
            //     use: [{
            //         loader: "file-loader",
            //         options: {
            //             name: "img/[name].[hash:6].[ext]",
            //             // outputPath: "img"
            //         }
            //     }]
            // },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/,
            //     use: [{
            //         loader: "url-loader",
            //         options: {
            //             name: "img/[name].[hash:6].[ext]",
            //             // outputPath: "img"
            //             // limit: 100 * 1024
            //         }
            //     }]
            // },
            { //webpack5使用assetModuleType取代了file-loader和url-loader
                test: /\.(jpe?g|png|gif|svg)$/,
                // type: "asset/resource", //file-loader的效果
                // type: "asset/inline", //url-loader的效果
                type: "asset", //根据字符限制来决定使用file-loader打包还是url-loader打包
                generator: {
                    filename: "img/[name]_[hash:6][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024
                    }
                }
            },
            { //字体图标的loader
                test: /\.ttf|eot|woff2?$/i,
                type: "asset/resource",
                generator: {
                    filename: "font/[name].[hash:6][ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "coderlhd webpack",
            template: "./public/index.html"
        }),
        new DefinePlugin({
            BASE_URL: "'./'"
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: "public",
                globOptions: {
                    ignore: [
                        "**/index.html",
                        "**/.DS_Store"
                    ]
                }
            }]
        })
    ]
}