var path = require('path');
var webpack = require('webpack');
var ExtracTextPlugin = require('extract-text-webpack-plugin');
var hljs = require('highlight.js'); 

require('asset-require-hook')({
		extensions: ['md']
		})

module.exports = {
	
	entry: [
		'babel-polyfill',
		'./client/client',
	],
	debug: true,
	devtool: 'eval',
	resolve: {
		root: [ __dirname ],
		extensions: ["", ".js", ".jsx"]
	},
	output: {
		path: path.join(__dirname, '/public/build/'),
		publicPath: '/build/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.IgnorePlugin(new RegExp("asyncBeApi")),
		new ExtracTextPlugin('bundle.css', {
			allChunks: true
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			include: __dirname,
			query: {
				plugins: []
			}
		},
		{
			test: /\.css$/,
			loader: ExtracTextPlugin.extract('style',"css?modules&localIdentName=[name]__[local]___[hash:base64:5]"),
			include: __dirname
		},
		{ test: /\.md$/, loader: "html!markdownattrs?config=markdownattrsLoaderCustomConfig" },
		{ test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader?name=[path][name].[ext]" }
		]
	},
	markdownattrsLoaderCustomConfig: {
		html: true,
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
			try {
				return '<pre class="hljs"><code>' +
					hljs.highlight(lang, str, true).value +
					'</code></pre>';
			} catch (__) {}
			}

			return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
		}
	}
};
