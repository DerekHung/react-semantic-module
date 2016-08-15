import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import css from './style.css';



class Header extends Component {
	render() {
		return (
			<header styleName="header">
				<img src="https://tleunen.github.io/react-mdl/react.svg" styleName="react"/>
				<h1>
					<a href="/">BIG-C UI Module</a>
				</h1>
			</header>
		);
	}
}

export default connect()(CSSModules(Header,css));