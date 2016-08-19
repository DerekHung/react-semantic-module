import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
import LightBox from 'client/components/lightbox';
//import html from 'doc/switches.md';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
//import { RadioGroup } from 'c_wap_module';
import Editor from 'client/components/editor';
import html from 'doc/editor.md';
import {
	convertToRaw,
} from 'draft-js';

import $ from 'jquery';

import testData from './test.json';

let metion = [];
if(typeof(window) !== 'undefined'){
	$.each(testData.response, function(index,value){
		let item = {id:index, link: value.pid, name: value.userNcdame, avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'};
		metion.push(item);
	})
}


import { fromJS } from 'immutable';




const mentions = fromJS(metion);

class EditorPage extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			rawStateString: null,
			HTMLString: null,
			rawState: null,
			uploadingCount: 0
		}
		this.onChange = (rawState) => this._onChange(rawState);
		this.toggle = () => this._toggle();
		this.onRequestSearch = (value) => this._onRequestSearch(value);
	}
	_onChange (contentState) {
		this.contentState = contentState;
		this.rawState= convertToRaw(contentState);
	}
	_toggle(){
		let html;
		if( this.state.uploadingCount === 0 ){
			if( this.contentState ) {
				//html = stateToHTML(this.contentState);
			}
			this.setState({ 
				open: !this.state.open,
				rawStateString: JSON.stringify(this.rawState),
				rawState: this.rawState,
				HTMLString: html,
				HTMLtoState: convertToRaw(stateFromHTML(html))
			});
		}
		
	}
	componentDidMount() {
		
	}
	onUploadStatusChange(counter){
		this.setState({
			uploadingCount: counter
		})
	}
	/*_onRequestSearch(value) {

	}*/
	render() {
		let option = {
			submit: {
				text: '完成',
				action: this.toggle
			},
			 closeIcon: true,
		}
		return (
			<div>
				<h3>Rich Editor</h3>
				<button styleName="viewButton" onClick={this.toggle}>發表文章</button>
				
				{ this.state.open && 
					<LightBox option={option}
						  onClose={this.toggle.bind(this,'close')}>
						<div styleName="editorBlock">
							<Editor apnum="10400"
									pid="10400"
									onChange={this.onChange} 
									mentions={mentions}
									onUploadStatusChange={this.onUploadStatusChange.bind(this)}/>
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
						<div className="content">
							<Editor content={this.state.rawState}
									mentions={mentions}
									readOnly={true}/>
						</div>
						<h3> SHOW HTML RESULT </h3>
						<div className="content">
							<p>{ this.state.HTMLString }</p>
						</div>
						<h3> Convert from HTML </h3>

					</div>
				}
				<div className="content" dangerouslySetInnerHTML={{__html: html}}>
					
				</div>
			</div>
			
		);
	}
}

export default connect()(CSSModules(EditorPage,style,{allowMultiple:true}));