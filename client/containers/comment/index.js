import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
import { Entity,convertToRaw,EditorState } from 'draft-js';

import Comment from 'client/components/comment';
import testData from '../editor/test.json';

import { fromJS } from 'immutable';
import $ from 'jquery';

import ReactHtmlParser from '../editor/react-html-parser/src';
import {convertToHTML, convertFromHTML} from 'draft-convert';
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
		//console.log(entity);
		switch( entity.type ){
			case 'IMAGE':
			return `<img tagType="IMAGE" fileId="${entity.data.fileId}"/>`;
			case 'DOCUMENT':
			return `<img tagType="DOCUMENT" fileId="${entity.data.fileId}"/>`;
			case 'HYPERLINK':
			return `<img tagType="HYPERLINK" fileId="${entity.data.fileId}" url="${entity.data.url}"/>`;
			case 'YOUTUBE':
			return `<img tagType="YOUTUBE" file="${entity.data.file}" url="${entity.data.url}" src="${entity.data.src}"/>`;
			case 'VIDEO':
			return `<img tagType="VIDEO" fileId="${entity.data.fileId}"/>`;
			case 'AUDIO':
			return `<img tagType="AUDIO" fileId="${entity.data.fileId}"/>`;
			case 'mention':
			if( typeof( entity.data.mention.get ) === 'undefined' ) {
				return `<span tagType="MEMBER" pid="${entity.data.mention.id}">${entity.data.mention.name}</span>`;
			}else {
				return `<span tagType="MEMBER" pid="${entity.data.mention.get('id')}">${entity.data.mention.get('name')}</span>`;	
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
			case 'span':
			if ( node.getAttribute('tagtype') === 'MEMBER' ){
				let transData = {
					mention: {
						id: data.pid,
						link: data.pid,
						name: node.innerText,
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
let metion = [];
if(typeof(window) !== 'undefined'){
	$.each(testData.response, function(index,value){
		let item = {id:index, link: value.pid, name: value.userName, avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'};
		metion.push(item);
	})
}
const mentions = fromJS(metion);

class CommentPage extends Component {
	constructor(props){
		super(props);
        this.state = {
            viewMode: false
        }
        this.onClick = (e) => {
            this.refs.copy.cleanData();
        }
        this.submit = (e) => {
            let HTML = convertToHTML(convertPattern)(this.currentContent);
            this.setState({
                comment: HTML,
                viewMode: true
            })
        }
        this.edit = (e) => {
            let contentState = convertToRaw(convertFromHTML(convertPattern)(this.state.comment));
            this.setState({
                comment: contentState,
                viewMode: false
            })
        }
        this.onChange = (contentState) => {
            this.currentContent = contentState;
            this.entityMap = convertToRaw(contentState).entityMap;
        }
	}

	render() {
		return (
			<div>
            { this.state.viewMode ? 
                <div>
                    {ReactHtmlParser(this.state.comment)}
                    <button onClick={this.edit}>編輯</button>
                </div>    
                : 
                <div>
                    <Comment content={this.state.comment}
                            mentions={mentions}
                            ref="copy"
                            onChange={this.onChange}/>
                    <button onClick={this.submit}>送出</button>
                </div>
             }
                
                
			</div>
		);
	}
}

export default connect()(CSSModules(CommentPage,style,{allowMultiple:true}));