import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import CSSModules from 'react-css-modules';
import style from './style.css';

import { getFileUrl } from '../../../utils/fileUpload.js';

import { ErrorBlock, ImgBlock, VideoBlock, AudioBlock, DocumentBlock, HyperLinkBlock, LinkBlock, YoutubeBlock, LoadingBlock } from './template.js';

class CustomComponent extends Component  {
	
	constructor(props){
		super(props);

		const entity = Entity.get(props.block.getEntityAt(0));
		const entityProps =  entity.getData();
		const type = entity.getType();

		this.state = {
			props: entityProps,
			type: type,
			hyperImgError: false
		}
	}

	handleClick(e){
		this.props.blockProps.onRequestRemove(this.props.block.getKey(), this.state.props.id);
	}
	
	hyperImgError(e){
		this.setState({
			hyperImgError: true
		})
	}

	render(){
		const props = this.state.props;
		const type = this.state.type;
		let that = this;

		if( props.error ) {
			/* 當error block出現之後隔5秒將其刪除 */ 
			setTimeout(function(){
				that.props.blockProps.onRequestRemove(that.props.block.getKey());
			},5000);

			return <ErrorBlock parent={this} />
		}

		if( props.loading || props.convertstatus === '0') {
			return <LoadingBlock parent={this} />
		}

		if( props.linkError ) {
			that.props.blockProps.onRequestRemove(that.props.block.getKey());
			return false;
		} 

		switch(type) {
			case 'IMAGE': 
				return <ImgBlock parent={this} props={props}/>;
			case 'VIDEO':
				return <VideoBlock parent={this} props={props}/>;
			case 'AUDIO':
				return <AudioBlock parent={this} props={props}/>;
			case 'DOCUMENT':
				return <DocumentBlock parent={this} props={props}/>;
			case 'HYPERLINK':
				return <HyperLinkBlock parent={this} props={props} onError={this.hyperImgError.bind(this)} hyperImgError={this.state.hyperImgError}/>;		
			case 'YOUTUBE':
				return <YoutubeBlock parent={this} props={props}/>;
			case 'LINK': 
				return <LinkBlock parent={this} props={props}/>;
			default:
				return false;
		}
	}
};
export default CSSModules(CustomComponent,style,{allowMultiple:true});