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

mix.setPublicPath('public');

const extractLibs = [
    "react",
    "react-dom/client",
    "@npaymelabs/connect",
    "wagmi",
    "viem",
    "@tanstack/react-query",
];

mix
    .js("resources/js/app.js", "public/js")
    .react()
    .postCss("resources/css/app.css", "public/css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .alias({
        '@': path.resolve('resources/js'), // Corrigido para apontar corretamente para a pasta de recursos JS
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
                path.resolve("./resources"), // Corrigido para apontar corretamente para a pasta de recursos
            ],
        },
    });