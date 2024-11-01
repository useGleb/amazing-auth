const path = require('path');
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    main: ['./index.ts']
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
    {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    ],
  },
  target: 'async-node',
  externalsPresets: { node: true },   // <-- here
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};
