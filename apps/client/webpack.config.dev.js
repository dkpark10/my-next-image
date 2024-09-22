const common = require('./webpack.config.common');

const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',

  entry: './index.jsx',

  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
});
