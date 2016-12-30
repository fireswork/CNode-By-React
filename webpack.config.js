var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
     entry: [
    "webpack/hot/only-dev-server",
    "./js/main.js",
  ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "main.js"
    },
    devServer:{
        hot: false,
        inline: true
    },
    eslint: {
        configFile :'/.eslintrc'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({  
        "process.env": { 
            NODE_ENV: JSON.stringify("production") 
        }
    }),
        new ExtractTextPlugin("package.css"),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
          {test: /\.jsx?$/,exclude: /(node_modules|bower_components)/,loader: 'babel-loader',query: {presets: ["es2015", "react"]}},
          {test: /\.(scss|css)$/,loader:  ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
          {test: /\.(gif|jpg|png|woff|svg|eot|ttf|otf|JPG)$/, loader: "url?limit=10000"},
          {test: '/\.js$/',exclude: /node_modules/,loader: ['babel-loader', 'eslint-loader']}
    ]
  },
  resolve: {
     extensions: ['', '.js']
 }
}
