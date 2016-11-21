import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';


function getSelectedChbox(frm) {
	var selchbox = [];// array that will store the value of selected checkboxes
	// gets all the input tags in frm, and their number
	var inpfields = frm.getElementsByTagName('input');
	var nr_inpfields = inpfields.length;
	// traverse the inpfields elements, and adds the value of selected (checked) checkbox in selchbox
	for(var i=0; i<nr_inpfields; i++) {
		if(inpfields[i].checked == true) {
			selchbox.push({
				label: inpfields[i].getAttribute("label"),
				value: inpfields[i].value
			});
		} 
	}
	//multiChoose = selchbox;
	return selchbox;
} 

class RadioGroup extends Component {
	constructor(props){
		super(props);
		this.state = {
			customValue: props.customValue,
			customDisable: props.customValue? false: true,
			errorMessage: props.errorMessage
		}
		this.multiChoose = [];
		if( props.customValue ){
			this.multiChoose.push({
				label: '自訂',
				value: props.checkedValue 
			})
		} 
	}
	handleChange(index,e) {
		this.multiChoose = getSelectedChbox(this.refs.main);
		if( this.multiChoose.length > this.props.maxChoose ) {
			e.target.checked = false;
			this.setState({ errorMessage: '最多選擇'+this.props.maxChoose+'個項目' });
		}else {
			this.setState({ errorMessage: ''});
			this.props.onSelected(this.multiChoose,index+1);
		}
		let check=true;
		for ( let i=0; i< this.multiChoose.length ; i++) {
			if(this.multiChoose[i].label === '自訂'){
				check = false;
			}
		}
		this.setState({
			customDisable: check,
		})
	}
	customChange(e) {
		this.setState({
			customValue: e.target.value
		})	
	}
	customChoose(e) {
		let that = this;
		this.handleChange(this.props.group.length, e);
		this.setState({
			customDisable: !e.target.checked,
		}) 
		
		setTimeout(function(){
			that.refs.customInput.focus();
		},100);
		
	}
	handleBlur() {
		this.props.onSelected(getSelectedChbox(this.refs.main),this.props.group.length+1);
	}
	componentWillReceiveProps(nextProps) {
		if( this.state.errorMessage !== this.props.errorMessage || this.props.errorMessage !== nextProps.errorMessage ) {
			this.setState({ errorMessage: nextProps.errorMessage });
		}
		if( this.state.customValue !== this.props.customValue || this.props.customValue !== nextProps.customValue ) {
			this.setState({ customValue: nextProps.customValue });
		}
	} 
	
	handleClick(e){
		if( this.props.disabled ) e.preventDefault();
	}

	render() {
		
		const { checkBox,name,group,custom,customChoose,customValue } = this.props;
		let that = this;
		let type = checkBox ? 'checkbox' : 'radio'; 
		
		return (
			<div className={this.props.className} ref="main" styleName="radioGroup">
			<img src={file}/>
				{group.map(function (data, index) {
					return(
					<div key={index} styleName="radioItem">
						
						<input
							type={type}
							id={name + 'radio' + index}
							name={name}
							value={data.value} 
							label={data.label}
							onChange={that.handleChange.bind(that,index)}
							defaultChecked={ data.checked ? 'checked' : null } />
						
						<label htmlFor={name + 'radio' + index} onClick={that.handleClick.bind(that)}><div styleName="check"></div>{data.label}</label>
						
					</div>
					);
				})}
				{custom && 
					<div styleName="radioItem">
						<input 
							id={name + 'custom'}
							type={type}
							value={this.state.customValue}
							name={name}
							label="自訂"
							onChange={this.customChoose.bind(this)}
							defaultChecked={ customValue? group.length + 1 : null} />
						<label htmlFor={name + 'custom'} onClick={that.handleClick.bind(that)}><div styleName="check"></div>自訂</label>
						{ that.props.disabled ? 
							<input
							type="text" 
							ref="customInput"
							value={this.state.customValue} 
							onChange={this.customChange.bind(this)} 
							disabled={this.state.customDisable}
							onBlur={this.handleBlur.bind(this)}
							disabled={true}/> 
							:
							<input
							type="text" 
							ref="customInput"
							value={this.state.customValue} 
							onChange={this.customChange.bind(this)} 
							disabled={this.state.customDisable}
							onBlur={this.handleBlur.bind(this)}/>	
						}
						
						
					</div>
				}
				{this.state.errorMessage && <div styleName="error">{this.state.errorMessage}</div>}
			</div>
		);
	}
}
RadioGroup.defaultProps = {
	errorMessage: '',
	maxChoose: 99,
	custom: false
}
export default CSSModules(RadioGroup,style,{allowMultiple:true});