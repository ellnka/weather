const Path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../frontend/app.js")
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: Path.resolve(__dirname, "../public"),
        to: "public"
      }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../frontend/index.html")
    })
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../frontend")
    },
    extensions: [".tsx", ".ts", ".js", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      },
      {
        test: /\.mustache$/,
        loader: "mustache-loader"
        // loader: 'mustache-loader?minify'
        // loader: 'mustache-loader?{ minify: { removeComments: false } }'
        // loader: 'mustache-loader?noShortcut'
      },
      {
        test: /\.scss$/i,
        loader: "style-loader"
        /*
        use: [
          // Creates `style` nodes from JS strings
          //"style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
          
        ]*/
      }
    ]
  }
};