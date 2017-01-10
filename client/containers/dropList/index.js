import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import DropList from 'client/components/dropList';

import html from 'doc/droplist.md';

let listContent = [
	{ label: '公開', value: '111', iconFont: 'fa-globe'},
	{ label: '朋友', value: '222', iconFont: 'fa-user'},
	{ label: '只限本人', value: '333', iconFont: 'fa-lock'}
]
let listContent2 = [
	{ label: '大學', value: '111'},
	{ label: '高中以下', value: '222'},
	{ label: '高中職', value: '333'},
	{ label: '專科', value: '333'},
	{ label: '碩士', value: '333'},
	{ label: '博士', value: '333'},
]
class DropListPage extends Component {
	constructor(props){
		super(props);
	}

	onSelected(value) {
		console.log(value);
	}
	render() {
		return (
			
			<div>
				<h3>Drop List</h3>
				<table>
					<tbody>
						<tr>
							<td>有iconfont＆預設值</td><td>無預設值的狀態</td><td>css設定error框</td><td>Disabled狀態</td>
						</tr>
						<tr>
							<td>
								<DropList 
									listContent={listContent}
									onSelected={this.onSelected.bind(this)}
									defaultIndex={1}
									width={130}/>
							</td>
							<td>
								<DropList 
									listContent={listContent2}
									onSelected={this.onSelected.bind(this)}/>
							</td>
							<td>
								<DropList 
									listContent={listContent2}
									onSelected={this.onSelected.bind(this)}
									styleName="errorStyle"/>
							</td>
							<td>
								<DropList 
									listContent={listContent2}
									onSelected={this.onSelected.bind(this)}
									disabled={true}/>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="content" dangerouslySetInnerHTML={{__html: html}}>
					
				</div>
			</div>
		);
	}
}

export default connect()(CSSModules(DropListPage,style,{allowMultiple:true}));