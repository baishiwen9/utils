const _ = require('lodash');

const configMonitor = {
  devtool: 'source-map',
  entry: './src/index.js',  
  output: {
    path: __dirname + '/dist',   
    filename: 'utils.js',       
    library: 'utils',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }  
}

module.exports = function(env, options){
  return [
    _.defaultsDeep({mode: 'development'}, configMonitor),
    _.defaultsDeep({
      mode: 'production',
      output: {
        filename: 'utils.min.js',    
      },
      plugins: [
        // new UglifyJsPlugin({
        //   test: /\.js($|\?)/i,
        //   exclude: /\/node_modules/
        // })
      ]
    }, configMonitor),
  ]
}