var path = require('path');
const fs = require('fs');
const env = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

env.config({
  path: path.resolve(__dirname, '/.env'),
});

var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000 // 40 kB
            }
          }
        ]
      },
      
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'REST_SERVER_LOCAL_HOST': JSON.stringify(process.env.REST_SERVER_LOCAL_HOST),
        'REST_SERVER_AWS_HOST': JSON.stringify(process.env.REST_SERVER_AWS_HOST),
        'SOCKET_SERVER_LOCAL_HOST': JSON.stringify(process.env.SOCKET_SERVER_LOCAL_HOST),
        'SOCKET_SERVER_AWS_HOST': JSON.stringify(process.env.SOCKET_SERVER_AWS_HOST),
        'SMTP_SERVER_LOCAL_HOST': JSON.stringify(process.env.SMTP_SERVER_LOCAL_HOST),
        'SMTP_SERVER_AWS_HOST': JSON.stringify(process.env.SMTP_SERVER_AWS_HOST)
      }
    })
  ]
};