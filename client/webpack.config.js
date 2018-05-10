var path = require('path');
const fs = require('fs');
const env = require('dotenv');
env.config();
const webpack = require('webpack');
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
        'REST_SERVER_URL': JSON.stringify(process.env.REST_SERVER_URL),
        'S3_BUCKET': JSON.stringify(process.env.S3_BUCKET),
      }
    })
  ]
};