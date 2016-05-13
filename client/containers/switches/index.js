import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

//import { RadioGroup } from 'c_wap_module';
import RadioGroup from 'client/components/radioGroup';
class Switches extends Component {
	constructor(){
		super();
		this.state = {
			customValue: '123'
		}
	}
	radioSelect(value,index) {
		console.log(value, index);
	}
	test(){
		this.setState({
			customValue: '234'
		})
	}
	render() {
		let group = [
			{label:'項目1',value: '111'},
			{label:'項目2',value: '222'},
			{label:'項目3',value: '333'},
			{label:'項目4',value: '444'},
			{label:'項目5',value: '555'},
		];
		return (
			<div>
				<h3>RadioGroup</h3>
				<div className="content">
					<p>單選且可指定預設選項，custom = true的時候產生自訂欄位，選擇之後會自動focus在input區塊</p>
				</div>
				<button onClick={this.test.bind(this)}>123</button>
				<RadioGroup
					group={group}
					name="radio"
					checkedIndex={2}
					onSelected={this.radioSelect.bind(this)}
					custom={true}
					styleName="radioGroup"
					customValue={this.state.customValue}>
				</RadioGroup>
				<div className="content">
				<p>表單送出沒有選擇的時候</p>
				</div>
				<RadioGroup
					group={group}
					name="radio_none"
					onSelected={this.radioSelect.bind(this)}
					custom={true}
					styleName="radioGroup"
					errorMessage="請選擇項目">
				</RadioGroup>
				<h3>CheckBox</h3>
				<div className="content">
					<p>可多選，每次選擇之後會回傳已選擇項目的陣列給使用者得知</p>
				</div>
				<RadioGroup
					group={group}
					name="checkbox"
					onSelected={this.radioSelect.bind(this)}
					custom={true}
					styleName="radioGroup"
					checkBox={true}
					maxChoose={3}
					customValue={this.state.customValue}>
				</RadioGroup>
			</div>
		);
	}
}

export default connect()(CSSModules(Switches,style,{allowMultiple:true}));