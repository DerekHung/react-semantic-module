'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require("chai");
var expect = chai.expect;

module.exports = describe("React Tesrt", function () {
	it("should render something", function () {
		var button = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_index2.default, null));
		expect(_reactDom2.default.findDOMNode(button)).to.exist; // 看有沒有 render 出 DOM
	});
});