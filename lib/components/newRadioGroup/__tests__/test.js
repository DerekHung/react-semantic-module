'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var group = [{ label: '項目1', value: '111' }, { label: '項目2', value: '222' }, { label: '項目3', value: '333' }, { label: '項目4', value: '444' }, { label: '項目5', value: '555' }];

/*import React from 'react/addons';
import RadioGroup from '../index.js';

const chai = require("chai");
const expect = chai.expect;



module.exports = describe("React Tesrt", () => {
	 it("should render something", () => {  
		let foo = React.addons.TestUtils.renderIntoDocument(<RadioGroup group={group}/>);
		expect(foo.getDOMNode()).to.exist; // 看有沒有 render 出 DOM
	});
})*/

describe('Radio', function () {
	var component = _reactTestRenderer2.default.create(_react2.default.createElement(_index2.default, { group: group }));

	beforeEach(function () {});

	it('initial component test', function () {

		var tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		var radioElement = TestUtils.scryRenderedDOMComponentsWithClassName();
		expext(component.scryRenderedDOMComponentsWithTag);
	});
});