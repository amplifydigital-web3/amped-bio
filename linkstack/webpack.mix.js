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

// mix.options({
//     runtimeChunkPath: "public/js",
// });

// mix.setPublicPath('public');
const extractLibs = [
    "react",
    "react-dom/client",
    "@web3modal/wagmi",
    "wagmi",
    "viem",
    "@tanstack/react-query",
    "@walletconnect/keyvaluestorage",
];

mix
    // .js("@tanstack/react-query", "public/js")
    // .js("@walletconnect/keyvaluestorage", "public/js")
    // .js("node_modules/@web3modal/wagmi", "public/js")
    .js("resources/js/components/Connect.tsx", "public/js/components")
    .js("resources/js/app.js", "public/js")
    .react()
    // .extract(extractLibs)
    .postCss("resources/css/app.css", "css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .alias({
        '@': 'public/js',
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
                path.resolve("./public"),
                // path.resolve(
                //     __dirname,
                //     "vendor/laravel/spark/resources/assets/js"
                // ),
            ],
        },
    });
