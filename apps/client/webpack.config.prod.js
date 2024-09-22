const path = require('path');

const common = require('./webpack.config.common');

const { merge } = require('webpack-merge');

module.exports = (env) => {
  const target = env.target;

  if (target !== 'node' && target !== 'web') {
    throw new Error('target은 node나 web두가지 값을 설정하여야 합니다.');
  }

  return merge(common, {
    entry: target === 'web' ? './index.jsx' : './app.jsx',

    mode: 'production',

    // webpack이 어느 환경에서 실행될지 그 환경에 맞게 컴파일
    target,

    output: {
      path: path.resolve(__dirname, `dist/${target}`),
      filename: '[name].[contenthash].js',
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
      // publicPath: '/' 경로 prefix
    },
  });
};
