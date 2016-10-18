const webpack = require('webpack');
var path = require("path");
//var rootPath = path.resolve(__dirname, path.relative(__dirname,''));

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'draft-js',
    'immutable',
    'jquery',
    'lodash',
    'underscore',
    'mocha',
    'redux',
    'react-css-modules',
    'react-proxy',
    'validator',
    'draft-js-plugins-editor',
    'draft-convert',
    'core-js',
    'react-redux',
    'superagent',
    'html-entities'
    // ...其它库
];

module.exports = {
    output: {
        path: path.join(__dirname, '/public/build/'),
        filename: '[name].js',
        library: '[name]',
    },
    debug: true,
	devtool: 'eval',
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.IgnorePlugin(new RegExp("asyncBeApi")),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
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
            loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]",
            include: __dirname
        },
        { test: /\.md$/, loader: "html!markdownattrs?config=markdownattrsLoaderCustomConfig" },
        {
            test: /\.(png|svg|ttf|woff)$/,
            loader: 'file'
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        ]
    },
};