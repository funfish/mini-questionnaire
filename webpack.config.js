var path = require('path');
module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
	  path: path.resolve(__dirname, 'dist'),
	  filename: "[name].bundle.js",
	  publicPath: "/src"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: "babel-loader",
					options: {presets: ["es2015"]}
				}]
			}, {
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}, {
				test: /\.scss$/,
				use: [{
	                loader: "style-loader" 
	            }, {
	                loader: "css-loader" 
	            }, {
	                loader: "sass-loader" 
	            }]
			}, {
				test: /\.vue$/,
				use: "vue-loader"
			}, {
				test: /\.png|jpg|gif$/,
				use: "file-loader"
			}
		]
	},
	resolve: {
	  	alias: {
	   		"vue$": "vue/dist/vue.common.js"
	  	}
	}
}