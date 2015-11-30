/** ====================================================================================
    ====================================================================================
    WEBPACK CONFIGURATION - SEE BROWSERSYNC WHERE THIS IS PULLED IN AS MIDDLEWARE
    ====================================================================================
    ==================================================================================== */

import webpack from 'webpack';
import path from 'path';

const devServer = {
  contentBase: path.resolve(__dirname, '../../example/public'),
  colors: true,
  quiet: false,
  noInfo: false,
  publicPath: '/static/',
  historyApiFallback: true,
  host: '127.0.0.1',
  port: 3000,
  hot: true
};

module.exports = {
  devServer: devServer,
  cache: false,
  debug: true,
  devtool: 'eval',
  context: path.resolve(__dirname, '../../' ),
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server', //// "only" prevents reload on syntax errors
    './example/src/scripts/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '../../example/public'),
    filename: 'bundle.js',
    publicPath: '/static/', // this is basically store in memory
    pathinfo: true,
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
  },

  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader'] },
      { test: /\.html$/, loader: 'html-loader' },
    ],
  },
  progress: true,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]
};
