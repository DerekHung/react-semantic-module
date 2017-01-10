import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import css from './player.css';

var $ = require('jquery');
class Player extends Component {
	constructor( props ){
		super( props );
		this.state = {}
		this.state.images = props.src;
		this.state.currentIndex = props.index||0;
		this.state.imagesCount = this.state.images.length;
		this.state.loading = true;
		this.handleKeydown = this.handleKeydown.bind(this);
	}
	componentDidMount() {
		this.refs.play_image.onload = this.imgLoad.bind(this);
		this.refs.play_image.src = this.state.images[this.state.currentIndex];
		this.refs.player.addEventListener('keydown', this.handleKeydown);
	}
	componentWillUnmount() {
		this.refs.player.removeEventListener('keydown', this.handleKeydown);
	}
	imgLoad() {
		this.state.loading = false;
		this.setState({loading: false})
	}
	handleKeydown(e) {
		switch(e.keyCode) {
			case 37: //left
			this.previous();
			break;
			case 39://right
			this.next();
			break;
			default:
			break;
		}
	}
	previous() {
		this.state.loading = true;
		this.state.currentIndex--;
		if (this.state.currentIndex <0) {
			this.state.currentIndex = this.state.imagesCount-1;
		}
		this.refs.play_image.src = this.state.images[this.state.currentIndex];
		this.setState({currentIndex: this.state.currentIndex, loading: true});
	}
	next() {
		this.state.loading = true;
		this.state.currentIndex++;
		if (this.state.currentIndex > this.state.imagesCount-1) {
			this.state.currentIndex = 0;
		}
		this.refs.play_image.src = this.state.images[this.state.currentIndex];
		this.setState({currentIndex: this.state.currentIndex, loading: true});
	}
	jump(e) {
		try{
			this.state.loading = true;
			this.state.currentIndex = parseInt(e.target.value)-1;
			if (this.state.currentIndex > this.state.imagesCount-1) {
				this.state.currentIndex = 0;
			}
			if (this.state.currentIndex <0) {
				this.state.currentIndex = this.state.imagesCount;
			}
			this.refs.play_image.src = this.state.images[this.state.currentIndex];
			this.setState({currentIndex: this.state.currentIndex, loading: true});
		} catch(err) {

		}
	}
	render() {
		return (
			<div ref="player" styleName="player" tabIndex="1">
				<div ref="playground" styleName="playground">
					{
						this.state.loading &&
						<div styleName="loading" className="ui loading"></div>
					}
					<img ref="play_image"/>
				</div>
				<div styleName='controls'>
					<span styleName="direction">
						<i onClick={(e)=>this.previous(e)} className="icon left_arrow"></i>
					</span>
					<span styleName="count">
						<input value={this.state.currentIndex+1} onChange={(e)=>this.jump(e)} />/{this.state.imagesCount}
					</span>
					<span styleName="direction">
						<i onClick={(e)=>this.next(e)} className="icon right_arrow"></i>
					</span>
				</div>
			</div>
		);
	}
}

const PlayerCss = CSSModules( Player, css, { allowMultiple: true } );
export default  PlayerCss ;
