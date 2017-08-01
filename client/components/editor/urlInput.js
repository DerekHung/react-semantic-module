import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

import TextField from '../textfeild';

class urlInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: ''
		}
	}
	onChange(e) {
		this.setState({ data: e.target.value });
	}
	_onKeyDown (e){
		
		if(this.state.data.length <= 0 ) return false;

		if (e.which === 13) {
			e.preventDefault();
			this.props.onKeyDown(this.state.data);
		}
	} 
	render (){
		return(
			<input 
				onKeyDown={this._onKeyDown.bind(this)} 
				onChange={this.onChange.bind(this)} 
				styleName="linkInput" 
				type="text"/>
		);
	}
	
}

export default CSSModules(urlInput, style, { allowMultiple: true });