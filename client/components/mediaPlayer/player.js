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
        this.state.fullscreen = false;
        this.handleKeydown = this.handleKeydown.bind(this);
        this.fullscreenChange = this.fullscreenChange.bind(this);
	}
    componentWillMount() {

	}
	componentDidMount() {
        this.refs.play_image.onload = this.imgLoad.bind(this);
        this.refs.play_image.src = this.state.images[this.state.currentIndex];
        this.refs.player.addEventListener('keydown', this.handleKeydown);
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', this.fullscreenChange, false);
            document.addEventListener('mozfullscreenchange', this.fullscreenChange, false);
            document.addEventListener('fullscreenchange', this.fullscreenChange, false);
            document.addEventListener('MSFullscreenChange', this.fullscreenChange, false);
        }

    }
    
    componentWillReceiveProps(nextProps) {

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
    fullscreenChange() {
        var ele = this.refs.player;
        if (document.fullscreenElement || document.webkitFullscreenElement ||
            document.mozFullScreenElement || document.msFullscreenElement) {
            this.state.fullscreen = true;
            this.setState({fullscreen: true});
            $(ele).width($(window).width());
            $(ele).height($(window).height());
            $(this.refs.playground).height($(window).height()-50);
            
        } else {
            this.state.fullscreen = false;
            this.setState({fullscreen: false});
            $(ele).width("730px");
            $(ele).height("480px");
            $(this.refs.playground).height("89.6%");
        }
    }
    fullscreen() {
        var ele = this.refs.player;
        if (this.state.fullscreen ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            } else if (ele.webkitRequestFullscreen) {
                ele.webkitRequestFullscreen();
            } else if (ele.mozRequestFullScreen) {
                ele.mozRequestFullScreen();
            } else if (ele.msRequestFullscreen) {
                ele.msRequestFullscreen();
            } else {
                console.log('Fullscreen API is not supported.');
            }
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
                    <span styleName="controls_item">
                        <span styleName="direction">
                            <i onClick={(e)=>this.previous(e)} className="icon left_arrow"></i>
                        </span>
                        <span styleName="count">
                            <input value={this.state.currentIndex+1} onChange={(e)=>this.jump(e)} />/{this.state.imagesCount}
                        </span>
                        <span styleName="direction">
                            <i onClick={(e)=>this.next(e)} className="icon right_arrow"></i>    
                        </span>
                    </span>
                    <span styleName="fullscreen">
                        {
                            !this.state.fullscreen &&
                            <i onClick={()=>this.fullscreen()} className="icon maximize"></i>
                        }
                        {
                            this.state.fullscreen &&
                            <i onClick={()=>this.fullscreen()} className="zoom icon"></i>
                        }
                    </span>
                </div>
			</div>
		);
	}
}



const PlayerCss = CSSModules( Player, css, { allowMultiple: true } );

export default  PlayerCss ;
