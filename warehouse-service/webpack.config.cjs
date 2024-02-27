const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js', // Entry point of your application
  target: 'node', // Set the target environment to Node.js
  mode: 'production', // Set the mode to 'production'
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile JavaScript files
          options: {
            presets: ['@babel/preset-env'], // Use @babel/preset-env for modern JavaScript features
          },
        },
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'app.cjs', // Output bundle file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
};
