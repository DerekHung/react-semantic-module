import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'client/components/header';
import Navigation from 'client/components/navigation';
import Footer from 'client/components/footer';
import CSSModules from 'react-css-modules';

import style from './style.css';



class App extends Component {
	render() {
		return (
			<div className="wrap">
				<Header />
				<Navigation />
				<div styleName="container">{this.props.children}</div>
			</div>
		);
	}
}

export default connect()(CSSModules(App,style,{allowMultiple:true}));