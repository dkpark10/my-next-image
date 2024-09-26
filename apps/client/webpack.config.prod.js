const path = require('path');

const common = require('./webpack.config.common');

const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
  const target = env.target;

  if (target !== 'node' && target !== 'web') {
    throw new Error('target은 node가 아니거나 web이 아닙니다.');
  }

  return merge(common, {
    entry: target === 'web' ? './index.jsx' : './index.ssr.jsx',

    mode: 'production',

    // webpack이 어느 환경에서 실행될지 그 환경에 맞게 컴파일
    target,

    ...(target === 'node' && {
      externalsPresets: { node: true },
    }),

    // 모듈을 외부에서 로드(ex: node_modules) 서버 환경에서 @loadable/component를 번들링하지 않고
    // 외부에서 런타임에 호출한다.
    externals:
      target === 'node'
        ? [
            '@loadable/component',
            nodeExternals({
              allowlist: [/^react/]
            }),
          ]
        : undefined,

    output: {
      path: path.resolve(__dirname, `../../resources/dist/${target}`),
      filename: '[name].[contenthash].js',
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
      // publicPath: '/' 경로 prefix
    },
  });
};
