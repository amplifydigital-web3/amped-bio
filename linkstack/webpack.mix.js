const mix = require("laravel-mix");
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// const extractLibs = [
//     "react",
//     "react-dom/client",
//     "wagmi",
//     "viem",
//     "@tanstack/react-query",
//     "@wagmi/core",
//     "@coinbase/wallet-sdk",
//     "@reown/appkit-adapter-wagmi",
//     "@reown/appkit"
// ];

mix
    // .extract(extractLibs)
    .js("resources/js/app.js", "js")
    .react()
    .postCss("resources/css/app.css", "css/app.css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .setPublicPath('') // Setting the public path to the project root
    .alias({
        '@': '/js',
    })
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"],
            modules: [
                path.resolve("./node_modules"),
                path.resolve("./"),
            ],
        },
    });