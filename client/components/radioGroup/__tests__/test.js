let group = [
	{label:'項目1',value: '111'},
	{label:'項目2',value: '222'},
	{label:'項目3',value: '333'},
	{label:'項目4',value: '444'},
	{label:'項目5',value: '555'},
];

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

import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils';

import RadioGroup from '../index.js';


describe('Radio', () => {
	const component = renderer.create(
		<RadioGroup group={group}/>
	); 
	
	beforeEach(() => {
		
	})

	it('initial component test', () => {	
		
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		let radioElement = TestUtils.scryRenderedDOMComponentsWithClassName() 
		expext(component.scryRenderedDOMComponentsWithTag)

	})
})