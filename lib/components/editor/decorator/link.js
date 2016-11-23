'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findLinkEntities(contentBlock, callback) {
	contentBlock.findEntityRanges(function (character) {
		var entityKey = character.getEntity();
		return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
	}, callback);
}

var Link = function Link(props) {
	var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData();

	var url = _Entity$get$getData.url;

	var styleLink = {
		color: '#3b5998',
		textDecoration: 'underline'
	};
	return _react2.default.createElement(
		'a',
		{ href: url, style: styleLink, target: '_blank' },
		props.children
	);
};

var creatLinkPlugin = function creatLinkPlugin() {
	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return {
		decorators: [{
			strategy: findLinkEntities,
			component: Link
		}]
	};
};

exports.default = creatLinkPlugin;