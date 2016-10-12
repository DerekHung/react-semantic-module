import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import CSSModules from 'react-css-modules';
import style from './style.css';

import { getFileUrl } from '../../../utils/fileUpload.js';

class CustomComponent extends Component  {
	
	constructor(props){
		super(props);

		const entity = Entity.get(props.block.getEntityAt(0));
		const entityProps =  entity.getData();
		const type = entity.getType();

		this.state = {
			props: entityProps,
			type: type
		}
	}

	handleClick(e){
		this.props.blockProps.onRequestRemove(this.props.block.getKey(), this.state.props.id);
	}

	componentDidMount() {
		
		let that = this;
		if( !this.state.props.src && this.state.props.fileId ) {
			getFileUrl(this.state.props.fileId).done(function(res){
				that.state.props.src = res[0].url[0];
				that.setState({
					props: that.state.props
				});
			})
		}
	}
	
	render(){
		const props = this.state.props;
		const type = this.state.type;
		let that = this;

		if( !props.fakeSrc ) props.fakeSrc = props.src;
		
		if( props.error ) {
			/* 當error block出現之後隔5秒將其刪除 */ 
			setTimeout(function(){
				that.props.blockProps.onRequestRemove(that.props.block.getKey());
			},3000);

			return <div styleName="block">
				<div styleName="close" onClick={this.handleClick.bind(this)}></div>
				<div styleName="loading-preset">
					<div styleName="play-icon error"></div>
					<p styleName="errorText">上傳發生錯誤，請重新上傳</p>
				</div>
			</div>
		}

		if( props.linkError ) {
			that.props.blockProps.onRequestRemove(that.props.block.getKey());
		}

		switch(type) {
			case 'IMAGE': 
				return <div styleName="block" style={{ 'textAlign': 'center'}}>
					{ props.loading ? 
						<div styleName="mask-block loading"><div styleName="close" onClick={this.handleClick.bind(this)}></div><img styleName="article-image" src={props.fakeSrc} /><div styleName="loading"></div><div styleName="mask"></div></div> : 
						<div >
							<div styleName="close" onClick={this.handleClick.bind(this)}></div>
							<img styleName="article-image"src={props.fakeSrc} />
						</div>
					}		
					</div>;
			case 'VIDEO':
				return <div styleName="block">
				{ props.loading? <div styleName="loading-preset"><div styleName="close" onClick={this.handleClick.bind(this)}></div><div styleName="play-icon video"></div><div styleName="loader"></div></div> : 
					<div>
						<div styleName="close" onClick={this.handleClick.bind(this)}></div>
						<video controls src={props.src} />
					</div>
				}
				</div>;
			case 'AUDIO':
				return <div styleName="block">
				{ props.loading? <div styleName="loading-preset audio"><div styleName="close" onClick={this.handleClick.bind(this)}></div><div styleName="play-icon audio"></div><div styleName="loader"></div></div> : 
					<div styleName="mid-block">
						<div styleName="close" onClick={this.handleClick.bind(this)}></div>
						<div styleName="title">{props.name}</div>
						<audio controls src={props.src} />
					</div>
				}
				</div>;
			case 'DOCUMENT':
				return <div styleName="block">
				{ props.loading? <div styleName="loading-preset document"><div styleName="close" onClick={this.handleClick.bind(this)}></div><div styleName="play-icon document"></div><div styleName="loader"></div></div> : 
					<div>
						<div styleName="close" onClick={this.handleClick.bind(this)}></div>
						
						<div styleName="loading-preset"><div styleName="play-icon document"></div><div styleName="mid-title">{props.name}</div></div>
					</div>
				}
				</div>;
			case 'HYPERLINK':
				return <div styleName="block">
					<div styleName="close" onClick={this.handleClick.bind(this)}></div>
					<a href={props.url } target="_blank">
					<span styleName="link">{props.url}</span>
					{ props.loading ?  
						<div styleName="linkLoading"><div styleName="loading"></div></div> 
						: 
						<div styleName="linkBlock">
							<img src={props.img.url} />
							<div styleName="info">
								<h3>{props.title}</h3>
								<p>{props.description}</p>
								<span styleName="tag104">plus.104.com.tw</span>
							</div>
						</div>
					}
					</a>
				</div>;
				
			case 'YOUTUBE':
				return <div styleName="block">
					<div styleName="close" onClick={this.handleClick.bind(this)}></div>
					<a href={props.url } target="_blank">{props.url}</a>
					<div>
					<iframe width="476" height="267.5"
						src={"https://www.youtube.com/embed/" + props.file}>
						</iframe>
					</div>
				</div>
			case 'LINK':
				return <a href={props.url} target="_blank">
					{props.url}
				</a>
			default:
				return false;
		}
	}
};
export default CSSModules(CustomComponent,style,{allowMultiple:true});