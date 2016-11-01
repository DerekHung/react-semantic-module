import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
import LightBox from 'client/components/lightbox';
//import html from 'doc/switches.md';
import {convertToHTML, convertFromHTML} from 'draft-convert';
//import { RadioGroup } from 'c_wap_module';
import Editor from 'client/components/editor';
import html from 'doc/editor.md';

import {
	convertToRaw,
	Entity
} from 'draft-js';

import $ from 'jquery';

import testData from './test.json';
import { fromJS } from 'immutable';

import mediaInfo from './mediaInfo.js'
import testDataString from './testdata.js';

let metion = [];
if(typeof(window) !== 'undefined'){
	$.each(testData.response, function(index,value){
		let item = {id:index, link: value.pid, name: value.userName, avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'};
		metion.push(item);
	})
}

let convertPattern = {
	/* convert to HTML pattern */ 
	styleToHTML:{},
	blockToHTML:{
		'atomic':{
			start: '<figure>',
			end: '</figure>',
			empty: '<br>'
		},
		'blockquote':{
			start: '<blockquote>',
			end: '</blockquote>'
		}
	},
	entityToHTML: (entity, originalText) => {
		console.log(entity);
		switch( entity.type ){
			case 'IMAGE':
			return `<img tagType="IMAGE" fileId="${entity.data.fileId}"/>`;
			case 'DOCUMENT':
			return `<img tagType="DOCUMENT" fileId="${entity.data.fileId}"/>`;
			case 'HYPERLINK':
			return `<img tagType="HYPERLINK" fileId="${entity.data.fileId}" url="${entity.data.url}"></div>`;
			case 'YOUTUBE':
			return `<img tagType="YOUTUBE" file="${entity.data.file}" url="${entity.data.url}" src="${entity.data.src}"/>`;
			case 'VIDEO':
			return `<img tagType="VIDEO" fileId="${entity.data.fileId}"/>`;
			case 'AUDIO':
			return `<img tagType="AUDIO" fileId="${entity.data.fileId}"/>`;
			case 'mention':
			if( typeof( entity.data.mention.get ) === 'undefined' ) {
				return `<div tagType="MEMBER" pid="${entity.data.mention.id}">${entity.data.mention.name}</div>`;
			}else {
				return `<div tagType="MEMBER" pid="${entity.data.mention.get('id')}">${entity.data.mention.get('name')}</div>`;	
			}
			case 'LINK':
			return `<a href="${entity.data.url}" target="_blank">${entity.data.url}</a>`;
			default:
			return originalText;
		}
	},
	/* convert from HTML pattern (如果沒用到就不必加)*/ 
	htmlToStyle: (nodeName, node, currentStyle) => {return currentStyle;},
	htmlToEntity: (nodeName, node) => {
		let data = {};
		if( typeof (node.attributes) !== 'undefined') {
			Array.prototype.slice.call(node.attributes).forEach(function(item){
				let name = item.name;
				if( name === 'fileid') name = 'fileId';
				else if( name === 'tagtype') name = 'tagType';

				data[name] = item.value;
			})
		}
		
		switch(nodeName){
			case 'img':
			return Entity.create(node.getAttribute('tagtype'),'IMMUTABLE',data);
			case 'a':
			return Entity.create('LINK','MUTABLE',data);
			case 'div':
			if ( node.getAttribute('tagtype') === 'MEMBER' ){
				let transData = {
					mention: {
						id: data.pid,
						link: data.pid,
						name: data.username,
						avatar: ''
					}
				}
				return Entity.create('mention', 'SEGMENTED', transData);
			}
			else return false;
			default:
			return false;
		}
		
	},
	htmlToBlock: (nodeName, node) => {
        if (nodeName === 'blockquote') {
            return {
                type: 'blockquote',
                data: {}
            };
        }else if( nodeName === 'figure') {
			return {
				type: 'atomic',
				data: {}
			}
		}
    }
}




const mentions = fromJS(metion);

class EditorPage extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			rawStateString: null,
			HTMLString: null,
			rawState: null,
			uploadingCount: 0,
			//originState :convertToRaw(convertFromHTML(convertPattern)(testDataString))
		}
		this.onChange = (rawState) => this._onChange(rawState);
		this.toggle = () => this._toggle();
		this.submit = () => this._submit();
		this.onRequestSearch = (value) => this._onRequestSearch(value);
		this.open = () => this.setState({ open: true});
	}
	_onChange (contentState) {
		this.contentState = contentState;
		this.rawState= convertToRaw(contentState);
		//console.log(contentState);
		//console.log(this.rawState);
	}
	_toggle(){
		this.setState({ open: !this.state.open });
	}
	_submit(){
		let html, htmlState;
		let fileStatus = this.refs.editor.getFileUploadObject();
		let uploadDone = true;

		for( var key in fileStatus ) {
			if( fileStatus[key].fileData.status !== 'uploadDone') {
				uploadDone = false;
			}
		}

		if( this.state.uploadingCount === 0 && uploadDone ){
			if( this.contentState ) {
				html = convertToHTML(convertPattern)(this.contentState);		
				htmlState = convertFromHTML(convertPattern)(html);
			}
			this.setState({ 
				rawStateString: JSON.stringify(this.rawState),
				rawState: this.rawState,
				HTMLString: html,
				HTMLtoState: convertToRaw(htmlState)
			});
			//console.log(this.refs.editor.getFileUploadObject());

		}	
	}

	componentDidMount() {
		
	}
	onUploadStatusChange(object){
		console.log(Object.keys(object).length);
		this.setState({
			uploadingCount: Object.keys(object).length
		})
	}
	/*_onRequestSearch(value) {

	}*/
	render() {
		let option = {
			submit: {
				text: '完成',
				action: this.submit
			},
			 closeIcon: true,
		}
		console.log(this.state.HTMLtoState);
		return (
			<div>
				<h3>Rich Editor</h3>
				<button styleName="viewButton" onClick={this.open}>發表文章</button>
				
				{ this.state.open && 
					<LightBox option={option}
						  onClose={this.toggle.bind(this,'close')}>
						<div styleName="editorBlock">
							<Editor content={this.state.originState}
									apnum="10400"
									pid="10400"
									placeholder="welcome"
									onChange={this.onChange} 
									mentions={mentions}
									onUploadStatusChange={this.onUploadStatusChange.bind(this)}
									ref="editor"
									mediaInfo={mediaInfo}/>
						</div>
						{ this.state.uploadingCount > 0 && <div styleName="uploading">有{this.state.uploadingCount}個檔案上傳中...</div>}
					</LightBox>	
				}
				{ this.state.rawStateString &&
					<div>			
						<h3> SHOW JSON RESULT </h3>
						<div className="content">
							<p>{ this.state.rawStateString }</p>
						</div>
						<h3> Convert from JSON </h3>
						<h3> SHOW HTML RESULT </h3>
						<div className="content">
							<p>{ this.state.HTMLString }</p>
						</div>
						<h3> Convert from HTML </h3>
						<div className="content">
							<Editor content={this.state.HTMLtoState}
									apnum="10400"
									pid="10400"
									placeholder="welcome"
									onChange={this.onChange} 
									mentions={mentions}
									onUploadStatusChange={this.onUploadStatusChange.bind(this)}
									ref="editor"
									mediaInfo={mediaInfo}/>
						</div>
					</div>
				}

				<div className="content" dangerouslySetInnerHTML={{__html: html}}>
					
				</div>
			</div>
			
		);
	}
}

export default connect()(CSSModules(EditorPage,style,{allowMultiple:true}));