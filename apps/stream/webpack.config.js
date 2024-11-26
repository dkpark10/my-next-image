const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const LoadablePlugin = require('@loadable/webpack-plugin');

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  name: 'stream',

  mode: development ? 'development' : 'production',

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, './src/'),
    },
  },

  entry: './src/client/index.jsx',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, `./resources`),
    filename: 'main.js',
  },
  plugins: [new MiniCssExtractPlugin()],
};
