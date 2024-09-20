const path = require('path');

const common = require('./webpack.config.common');

const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
});
