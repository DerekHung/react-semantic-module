import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
import { convertToRaw } from 'draft-js';

import Comment from 'client/components/comment';
import testData from '../editor/test.json';

import { fromJS } from 'immutable';
import $ from 'jquery';

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
        this.onClick = (e) => {
            console.log(this.entityMap);
        }
        this.onChange = (contentState) => {
            this.entityMap = convertToRaw(contentState).entityMap;
        }
	}
    componentDidMount(){
        console.log(this.refs.comment);
    }

	render() {
		return (
			<div>
                <Comment mentions={mentions}
                         onChange={this.onChange}/>
                <Comment mentions={mentions}
                         onChange={this.onChange}/>
                <button onClick={this.onClick}>123</button>
			</div>
		);
	}
}

export default connect()(CSSModules(CommentPage,style,{allowMultiple:true}));