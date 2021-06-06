const path = require("path");
 
module.exports = {
  mode: 'development',
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist/'
  },
  devServer: {
    hot: true,
    port: 5000,
  },
};