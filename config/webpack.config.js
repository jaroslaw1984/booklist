const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./public/js/app.js"
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../build")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "root/index.html",
      title: "Creating new title"
    })
  ],
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, "../public")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(scss|sass)$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: "file-loader"
      }
    ]
  }
};
