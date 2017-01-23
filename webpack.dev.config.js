var hook = require('css-modules-require-hook');
var hljs = require('highlight.js'); 
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
var webpack_isomorphic_tools_plugin = 
  // webpack-isomorphic-tools settings reside in a separate .js file 
  // (because they will be used in the web server code too).
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development()

module.exports = function checkMode(app){
	
	hook({
		generateScopedName: '[name]__[local]___[hash:base64:5]',
	});
	
	require('asset-require-hook')({
		extensions: ['md']
		})
	
	if(app){
		var path = require('path');
		var webpack = require('webpack');
		var config = {
			debug: true,
			context: __dirname,
			devtool: 'eval',
			entry: [
				'babel-polyfill',
				'webpack-hot-middleware/client',
				'./client/client'
			],
			resolve: {
				root: [ __dirname ],
				extensions: ["", ".js", ".jsx"]
			},
			output: {
				path: path.join(__dirname, '/public/build'),
				publicPath: '/build/',
				filename: 'bundle.js'
			},
			plugins: [
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.HotModuleReplacementPlugin(),
				new webpack.NoErrorsPlugin(),
				new webpack.IgnorePlugin(new RegExp("asyncBeApi")),
				new webpack.DllReferencePlugin({
					context: __dirname,
					manifest: require('./manifest.json'),
				}),
				webpack_isomorphic_tools_plugin
			],
			module: {
				loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					include: __dirname,
					query: {
						plugins: [
							[
								'react-transform', 
								{
									'transforms': [{
										'transform': 'react-transform-hmr',
										'imports': ['react'],
										'locals': ['module']
									}]
								}
							]
						]
					}
				},
				{
					test: /\.css$/,
					loader: "style-loader!css-loader?modules&localIdentName=[path][name]__[local]",
					include: __dirname
				},
				{ test: /\.md$/, loader: "html!markdownattrs?config=markdownattrsLoaderCustomConfig" },
				{
					test: webpack_isomorphic_tools_plugin.regular_expression('images'),
					loader: 'file', // any image below or equal to 10K will be converted to inline base64 instead
				},
				/*{
					test: /\.(png|svg|ttf|woff)$/,
					loader: 'file?emitFile=false'
				},*/
				{
					test: /\.json$/,
					loader: 'json'
				},
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
		var compiler = webpack(config);
		
		app.use(require("webpack-dev-middleware")(compiler, {
			noInfo: true, 
			publicPath: config.output.publicPath,
			stats: {
				colors: true 
			}

		}));
		app.use(require("webpack-hot-middleware")(compiler));	
	}
};