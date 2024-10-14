import path from 'path';
import nodeExternals from 'webpack-node-externals';
import LoadablePlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const getConfig = (target) => ({
  name: target,

  mode: development ? 'development' : 'production',

  target,

  resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@src': path.resolve(__dirname, './src/'),
		},
	},

  entry:
    target === 'web' ? './src/client/index.jsx' : './src/client/index.ssr.jsx',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
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
  
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },

  externals:
    target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,

  output: {
    path: path.resolve(__dirname, `../../resources/dist/${target}`),
    filename: '[name].[contenthash].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    // publicPath: '/' 경로 prefix
  },
  plugins: [new LoadablePlugin(), new MiniCssExtractPlugin()],
});

export default [getConfig('web'), getConfig('node')];
