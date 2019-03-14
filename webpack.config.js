const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: [/\.jsx?$/], // Specifies file types to transpile
                exclude: /(node_modules)/, // Leaves dependencies alone
                loader: 'babel-loader', // Sets Babel as the transpiler
                query: {
                    presets: ['@babel/env', '@babel/react'] // Tells Babel what syntaxes to translate
                }
            }
        ]
    },
    devtool: 'source-map'
};