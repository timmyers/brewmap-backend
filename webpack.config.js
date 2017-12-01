const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['babel-loader', 'ts-loader'],
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
