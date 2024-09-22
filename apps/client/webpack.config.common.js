const HtmlWebpackPlugin = require('html-webpack-plugin');

const LoadablePlugin = require('@loadable/webpack-plugin');

const path = require('path');

module.exports = {
  resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@src': path.resolve(__dirname, './src/'),
		},
	},

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),

    new LoadablePlugin(),
  ],
};
