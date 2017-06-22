import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Overlay from '../../utils/overlay';
import { enableDocScroll, disableDocScroll } from '../../utils/windowScroll';


class Lightbox extends Component{
	componentDidMount() {
		disableDocScroll();
	}

	componentWillUnmount() {
		enableDocScroll();
	}

    handleClose(type, e){
        if( type === 'overlay' && this.props.clickOverlayToClose === false ) {

        }else {
            if( this.props.onClose ) this.props.onClose(e);
        }
    }

    render(){
        let contentPadding = '0 10px', contentHeight = 'auto';
        if ( this.props.option.contentHeight ) {
            contentHeight = this.props.option.contentHeight;
        }
        if( this.props.option.submit ){
	        var {text, action, ...gtm} = this.props.option.submit;
        }
        
        return(
            <div styleName="container">
                <Overlay
                    onRequestClose={this.handleClose.bind(this,'overlay')}
                    styleName="overlay">
                    <div styleName="lightbox" className={this.props.className}>
                        {
                            this.props.option.title &&
                            <div styleName="title">{ this.props.option.title }</div>
                        }
                        <div styleName="content" style={{padding: contentPadding, maxHeight : contentHeight}}>
                            { this.props.children }
                            { this.props.option.submit && <button onClick={this.props.option.submit.action} {...gtm} styleName="submit">{this.props.option.submit.text}</button>}
                            { this.props.option.cancel && <button onClick={this.handleClose.bind(this,'cancel')}>{this.props.option.cancel.text}</button>}
                        </div>
                        { this.props.option.closeIcon && <div styleName="close" onClick={this.handleClose.bind(this,'closeIcon')}></div>}
                    </div>
                </Overlay>
            </div>
        );
    }
}
Lightbox.defaultProps = {
    onClose: function(){ console.log( "you should have onClose props declartion on your component ! ")},
}
export default CSSModules(Lightbox,style,{allowMultiple:true});
