import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Button from 'client/components/button';
import DropdownMenu from 'client/components/dropdownMenu';
import DropdownTarget from 'client/components/dropdownMenu/target';
import DropdownList from 'client/components/dropdownMenu/list';

import html from 'doc/dropdownMenu.md';

class DropdownPage extends Component {
	constructor(){
		super();
		this.state = {
			dropOpen: false,
			lightbox: false,
			test: '123',
			ui:{
				public:{
					targetStyle: null,
					targetIcon: 'fa-globe'
				},
				editor: {
					targetStyle: null,
					targetIcon: 'fa-pencil'
				},
				viewpoint: {
					targetStyle: null,
					defaultSelect: 1,
				}
			},
			viewpoint: ['公開', '朋友'],
			DynamicTitle: '編輯'
		}
		this.testDynamic = (e) => {
			this.setState({
				DynamicTitle: '編輯編輯編輯編輯編輯編輯編輯編輯編輯編輯編輯編輯編輯'
			})
		}
	}
	
	onSelected(index,value,key,icon) {
		console.log(index,value);
		if( typeof(icon) === 'string' ){
			this.state.ui[key].targetIcon = icon;
			this.setState({
				ui: this.state.ui
			})
		}
		if( key === 'viewpoint') {
			this.state.ui.viewpoint.defaultSelect = index;
			this.setState({
				ui: this.state.ui
			})
		}
		
	}
	toggleOpen(key,open) {
		if( key === 'public' || key === 'editor') {
			this.state.ui[key].targetStyle = open? {color:'rgb(38,151,185)'} : null;
			this.setState({
				ui: this.state.ui
			})
		}
	}
	render() {
		return (
			<div>
				<h3>DropDown Menu</h3>
				<table style={{'tableLayout':'fixed'}}>
					<tbody>
						<tr className="tbheader">
							<td>選擇可更換ICON</td><td>一般選單</td><td>選擇後觸發勾選</td><td>diolag型態</td>
						</tr>
						<tr>
							<td>
								<div>公開設定 &nbsp;&nbsp;
									<DropdownMenu
										toggleOpen={this.toggleOpen.bind(this,'public')}>
										<DropdownTarget>
											<i className={"fa "+this.state.ui.public.targetIcon} aria-hidden="true" style={this.state.ui.public.targetStyle}></i>
										</DropdownTarget>
										<DropdownList>
											<ul styleName="list" >
												<li onClick={this.onSelected.bind(this,1,'公開','public','fa-globe')}>
													<i className="fa fa-globe" aria-hidden="true" ></i>
													公開
												</li>
												<li  onClick={this.onSelected.bind(this,2,'只限本人','public','fa-lock')}>
													<i className="fa fa-lock" aria-hidden="true"></i>
													只限本人
												</li>
											</ul>
										</DropdownList>
									</DropdownMenu>
								</div>
							</td>
							<td>
							<button onClick={this.testDynamic}>換title</button>
								<div>編輯&nbsp;&nbsp;
									<DropdownMenu
										toggleOpen={this.toggleOpen.bind(this,'editor')}>
										<DropdownTarget>
											{this.state.DynamicTitle}
											<i className={"fa "+this.state.ui.editor.targetIcon} aria-hidden="true" style={this.state.ui.editor.targetStyle}></i>
										</DropdownTarget>
										<DropdownList>
											<ul styleName="list editor" >
												<li onClick={this.onSelected.bind(this,1,'編輯','editor')}>
													編輯
												</li>
												<li  onClick={this.onSelected.bind(this,2,'刪除','editor')}>
													刪除
												</li>
												<li  onClick={this.onSelected.bind(this,2,'刪除特定對象','editor')}>
													刪除特定對象
												</li>
											</ul>
										</DropdownList>
									</DropdownMenu>
								</div>
							</td>
							<td>
								<DropdownMenu
									toggleOpen={this.toggleOpen.bind(this,'viewpoint')}>
									<DropdownTarget>
										<button styleName="viewButton">檢視角度</button>
									</DropdownTarget>
									<DropdownList>
										<ul styleName="list viewpoint" >
											<li onClick={this.onSelected.bind(this,1,'公開','viewpoint')}>
												{ this.state.ui.viewpoint.defaultSelect === 1 && <i className="fa fa-check" aria-hidden="true" styleName="check"/> }
												公開
											</li>
											<li  onClick={this.onSelected.bind(this,2,'朋友','viewpoint')}>
												{ this.state.ui.viewpoint.defaultSelect === 2 && <i className="fa fa-check" aria-hidden="true" styleName="check"/> }
												朋友
											</li>
										</ul>
									</DropdownList>
								</DropdownMenu>
							</td>
							<td>
								<DropdownMenu
									toggleOpen={this.toggleOpen.bind(this,'viewpoint')}>
									<DropdownTarget>
										<i className="fa fa-trash" aria-hidden="true" style={this.state.ui.editor.targetStyle}></i>
									</DropdownTarget>
									<DropdownList>
										<div styleName="content">
											<p>是否要刪除此筆讚美</p>
											<button styleName="viewButton sure">確定</button>
											<button styleName="viewButton cancel">取消</button>
										</div>
									</DropdownList>
								</DropdownMenu>
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

export default connect()(CSSModules(DropdownPage,style,{allowMultiple:true}));