import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './index.css';
import Player from './player.js';
class MediaPlayer extends Component {
	constructor(props){
		super(props);
		this.state = {
			transformed: false
		}
		this.handleClick = (e) => this._handleClick(e);
	}
	_handleClick(e) {
		this.setState({ transformed: true});
	}
	render() {
		let carrier;
		switch(this.props.tagType) {
			case 'VIDEO':
			carrier = <video src={this.props.src} controls/>;
			case 'AUDIO':
			carrier = <audio src={this.props.src} controls/>;
			case 'IMAGE':
			case 'DOCUMENT':
			carrier = <Player src={this.props.src} />;
			break;
		}
		return (
			<div>
				{ this.state.transformed ? carrier : <img src={this.props.snap} onClick={this.handleClick}/> }
			</div>
		);
	}
}

export default CSSModules(MediaPlayer,style,{allowMultiple:true});