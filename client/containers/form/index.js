import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Validators from 'client/utils/validator';
import TextField from 'client/components/textfeild';


var config = {
			'data': {
				'username' : [ 'notEmpty', {maxLength: 10}, 'isName'],
				'email':['notEmpty','isEmail'],
				'url':['notEmpty','isURL'],
				'editor':['notEmpty']
			},
			'customValidator' : {
				dontUseThis: function(value){
				}
			}
		}
let val = new Validators(config);	

class Form extends Component {
	constructor(){
		super();
		this.state = {
			data: {
				username:"",
				job:"",
				editor:"野豬騎士來囉野",
			},
			ACData: []		
		}
	}
	onChange(key,value) {
		/* call AC api and get ACDATA*/
		console.log(value);
		if( key === 'job') {
			if (value.length <= 0 ) {
				this.setState({ ACData: [] });
			}else {
			this.setState({
				ACData: [
					{
						id: 1,
						value: 'aa',
						info: ''
					},
					{
						id: 2,
						value: 'aaa',
						info: ''
					},
					{
						id: 3,
						value: 'aaaa',
						info: ''
					},
					{
						id: 4,
						value: 'aabbc',
						info: ''
					},
					{
						id: 5,
						value: 'aasdas',
						info: ''
					},
					{
						id: 6,
						value: 'aasdda',
						info: ''
					},
					{
						id: 7,
						value: 'aaaaaaaaa',
						info: ''
					},
					{
						id: 8,
						value: 'aaddssaasd',
						info: ''
					},
					{
						id: 9,
						value: 'aaasdddas',
						info: ''
					},
					{
						id: 10,
						value: 'dsaddddaa',
						info: ''
					},
				]			
			})
			}
		}
		
	}
	onBlur(key,value){
		console.log(key, value); 
		this.state.data[key] = value;
		this.setState({
			data: this.state.data,
			ACData: []
		})
	}
	radioSelect(index, value) {
		console.log(index);
		console.log(value);
	}
	onSelected(value,index) {
		console.log(value,index);
	}
	onError(name, errorMessage){
		console.log(name);
		console.log(errorMessage);
	}
	onRequestOpenAC(){
		this.setState({
				ACData: [
					{
						id: 1,
						value: 'aa',
						info: ''
					},
					{
						id: 2,
						value: 'aaa',
						info: ''
					},
					{
						id: 3,
						value: 'aaaa',
						info: ''
					},
					{
						id: 4,
						value: 'aabbc',
						info: ''
					},
					{
						id: 5,
						value: 'aasdas',
						info: ''
					},
					{
						id: 6,
						value: 'aasdda',
						info: ''
					},
					{
						id: 7,
						value: 'aaaaaaaaa',
						info: ''
					},
					{
						id: 8,
						value: 'aaddssaasd',
						info: ''
					},
					{
						id: 9,
						value: 'aaasdddas',
						info: ''
					},
					{
						id: 10,
						value: 'dsaddddaa',
						info: ''
					},
				]			
			})
	}
	render() {
		let group = [
			'項目1',
			'項目2',
			'項目3',
			'項目4',
			'項目5'
		];
		return (
			<div>
				<h2>Form</h2>
				<div className="content">
					<p>Form表單的設計原則，會讓每個form元素在觸發某個行為之後提供事件給使用者取得資料，再決定是否要更新父層的state</p>
					<p>目前的自由度依照UI盤點原則制定，開發者如果有自由度需求可以提出</p>
				</div>
				<h3>TextFeild</h3>
				<div className="content">
					<p>1. 一般的input，提供onChange事件偵測實時輸入，以及onBlur事件做驗證&自動寫入state值</p>
					<p>2. allowMultiLine ＝ true 則改成以textarea型態顯示</p>
					<p>3. 提供AutoComplete UI （送api拉回值必須由使用者實作，只要改變傳入的obj的值即可改變AC的內容）</p>
				</div>
				<TextField
					name="username" 
					value={this.state.data.username}
					onChange={this.onChange.bind(this)}
					onBlur={this.onBlur.bind(this)}
					placeHolder="請輸入"
					styleName="input1"
					validator={val}
					maxWords={10}
					onError={this.onError.bind(this)}/>
				<TextField
					name="editor" 
					value={this.state.data.editor}
					onChange={this.onChange.bind(this)}
					onBlur={this.onBlur.bind(this)}
					placeHolder="請輸入"
					styleName="textarea"
					validator={val}
					allowMultiLine={true}
					maxWords={50}/>
				<TextField
					name="job" 
					value={this.state.data.job}
					onChange={this.onChange.bind(this)}
					onBlur={this.onBlur.bind(this)}
					placeHolder="AC測試"
					styleName="input1"
					maxWords={10}
					ACData={this.state.ACData}
					onSelected={this.onSelected.bind(this)}
					onRequestOpenAC={this.onRequestOpenAC.bind(this)}>
				</TextField>
				<i className="icon privacy"></i>
				
			</div>
		);
	}
}

export default connect()(CSSModules(Form,style,{allowMultiple:true}));