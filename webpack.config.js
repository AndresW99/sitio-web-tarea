const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtract    = require('mini-css-extract-plugin');
const CopyPlugin        = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',

    output: {
        clean: true // Limpia los archivos luego del build
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // En donde se encuentra la carpeta que deseamos mover
            filename: 'index.html' // El nombre de la carpeta
        }),
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}