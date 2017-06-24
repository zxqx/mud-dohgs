const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        FIREBASE_ADMIN_USERS: JSON.stringify(process.env.FIREBASE_ADMIN_USERS)
      }
    }),
    new HtmlWebpackPlugin({
      template: './build/index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ],
        exclude: /react-select\.css$/
      },
      {
        test: /react-select\.css$/,
        loaders: [
          'style?sourceMap',
          'css?sourceMap&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }
    ]
  },
};
