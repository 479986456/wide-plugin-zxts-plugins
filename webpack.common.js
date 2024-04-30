const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
      }]
    },
    {
      test: /\.(png|jpg|gif|gltf)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],  
    }, {
      test: /\.(svg)$/i,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }, {
      test: /\.(ttf|woff)$/i,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }, {
      test: /\.(glsl|vs|fs)$/,
      use: [{
        loader: 'webpack-glsl-loader'
      }]
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}