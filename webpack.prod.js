const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtract    = require('mini-css-extract-plugin');
const CopyPlugin        = require('copy-webpack-plugin');

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {

    mode: 'production',

    output: {
        clean: true, // Limpia los archivos luego del build
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/i, // Aplicara la regla si es un archivo.html
                loader: 'html-loader', // Buscara la libreria que instalamos
                options: {
                    sources: false,
                    minimize: false 
                },
            },
            {
                test: /\.css$/, //Aplica a todos los archivos css 
                exclude: /styles.css$/, // Aplicara la regla de abajo aunque esta falle
                use: [ 'style-loader', 'css-loader'] // Busca la libreria que instalamos
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    optimization: {

        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // En donde se encuentra la carpeta que deseamos mover
            filename: 'index.html' // El nombre de la carpeta
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}