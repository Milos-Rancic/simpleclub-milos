const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    main: { import: './src/js/main.js' },
    home: { import: './src/js/home.js' },
  }, 
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i, // Rule for .css files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader'    // Interprets @import and url() like import/require() and will resolve them
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          'postcss-loader',
          "sass-loader"
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      minify: {
        collapseWhitespace: true, // Minifies HTML
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};