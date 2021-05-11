const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
    const config = {
        entry: {
            bundle: "./main.js",
        },
        externals: [
            {
                window: "window",
            },
        ],
        output: {
            filename: "[name].js",
            chunkFilename: "chunks/[name].[contenthash].js",
            path: path.resolve(__dirname, "./dist/"),
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    include: /(\.min\.js$)/,
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
    };
    if (argv.mode === "development") {
        // Add a dev server.
        config.devServer = {
            inline: true,
            contentBase: "./",
            port: "3001",
            host: "0.0.0.0",
        };
        config.output.publicPath = "/dist/";
    }
    if (argv.mode === "production") {
        // Also create minified bundles along with the non-minified ones.
        config.entry["bundle.min"] = "./main.js";
    }
    return config;
};
