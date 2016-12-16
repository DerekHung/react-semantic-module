import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import { connect } from 'react-redux';
import Tabs from 'client/components/tab/index';
import Tab from 'client/components/tab/tab';

class TabPage extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
            <div>
				<h3>Tabs</h3>
                <Tabs>
                    <Tab name="動態">123</Tab>
                    <Tab name="個人檔案">456</Tab>
                    <Tab name="我的愛人">789</Tab>
                </Tabs>
            </div>
		);
	}
}

export default connect()(CSSModules(TabPage,style,{allowMultiple:true}));