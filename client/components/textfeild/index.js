import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';


function highlightString( keyword, targetString ){
	let pattern = new RegExp(keyword,'gi'),
		replace = '<span>' + keyword + '</span>';

		return targetString.replace(pattern,replace);
}


class TextFeild extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.value,
			errorMessage: props.errorMessage || '',
			ACData: props.ACData,
			highlightedIndex: null
		}
		this._onChange = this._onChange.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
		this.ACStyle = {};
		this.keyDownHandlers = {
			ArrowDown(event) {
				event.preventDefault()
				if(this.state.ACData.length === 0) {
					if(props.onRequestOpenAC) props.onRequestOpenAC();
					this.setState({
						highlightedIndex: 0
					})
				}else {
					let { highlightedIndex } = this.state
					let index = (
						highlightedIndex === null ||
						highlightedIndex === this.state.ACData.length - 1
					) ? 0 : highlightedIndex + 1
					this._performAutoCompleteOnKeyUp = true
					this.setState({
						highlightedIndex: index,
					})
				}

			},
			ArrowUp(event) {
				event.preventDefault()
				let { highlightedIndex } = this.state
				let index = (
					highlightedIndex === 0 ||
					highlightedIndex === null
				) ? this.state.ACData.length - 1 : highlightedIndex - 1
				this._performAutoCompleteOnKeyUp = true
				this.setState({
					highlightedIndex: index,
				})
			},

			Enter(event) {
				console.log(event);
				if (this.state.ACData.length === 0) {
					// menu is closed so there is no selection to accept -> do nothing
					return
				}
				else if (this.state.highlightedIndex == null) {
					// input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
				}
				else {
					// text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
					this.select(this.state.ACData[this.state.highlightedIndex].value, this.state.highlightedIndex);
				}
			},

			Escape(event) {
				this.setState({
					highlightedIndex: null,
					ACData: []
				})
			}
		}
	}
	componentDidMount() {
		if( this.props.allowMultiLine ){
			let target = ReactDOM.findDOMNode(this.refs.textarea);
			target.style.height = Math.max(target.scrollHeight,target.clientHeight) + 'px';
			this.initHeight = Math.max(target.scrollHeight,target.clientHeight);
		}

		let MainElement = this.refs.textFeildMain.getBoundingClientRect();
		this.ACStyle.width = MainElement.width;
		//ACStyle.maxHeight = window.innerHeight - MainElement.top - MainElement.height - 10;
	}
	_onBlur(e){
		if( this.props.validator ) {
			let validObject = {};
			validObject[this.props.name] = e.target.value;
			let validResult = this.props.validator.validate(validObject);
			if(validResult.status) {
				this.setState({
					errorMessage: ''
				})
			}else {
				if( !validResult.errorMessage[this.props.name] ) validResult.errorMessage[this.props.name] = '';
				this.setState({
					errorMessage:validResult.errorMessage[this.props.name]
				},function(){
					this.handleError();
				})
			}
		}
		if( this.state.highlightedIndex !== null ) this.setState({ highlightedIndex: null});
		let that = this;
		setTimeout(function(){
			that.props.onBlur(that.props.name, that.state.data);
		},200);


	}
	_onChange(e){
		let event = e;
		if( this.props.allowMultiLine ) {
			e.target.style.height = Math.max(e.target.scrollHeight,e.target.clientHeight,this.initHeight) + 'px';
		}

		if( this.props.maxWords && e.target.value.length > this.props.maxWords ) {
			this.setState({
				data:  e.target.value,
				errorMessage: '輸入的字數已達上限',
				ACData: [],
				highlightedIndex: null
			},function(){
				this.handleError();
			})
		}else {
			this.setState({
				data:  e.target.value,
				errorMessage: '',
				highlightedIndex: null,
			},function(){
				this.props.onChange(this.props.name, this.state.data);
			})
		}


	}

	_onKeyDown(e) {
		if (this.props.onKeyDown) {
			const { keyName, action, ignoreShift } = this.props.onKeyDown;
			if (e.key === keyName && (ignoreShift ? !e.shiftKey: true)) {
				const text = this.refs.textarea.value
				action(text);
			}
		}
	}

	handleKeyDown (event) {
		if (this.keyDownHandlers[event.key] && this.props.ACData){
			this.keyDownHandlers[event.key].call(this, event)
		}
		if( this.props.onKeyDown ) this.props.onKeyDown(event);
	}

	ACMouseOver(index) {
		this.setState({
			highlightedIndex:index
		})
	}

	select(value,index) {
		this.setState({
			data: value,
			errorMessage: '',
			ACData: []
		})
		this.props.onSelected(value,index+1);
	}

	componentWillReceiveProps(nextProps) {
		if( this.state.data !== nextProps.value && this.props.value !== nextProps.value) {
			this.setState({ data: nextProps.value });
		}
		if( this.state.ACData !== nextProps.ACData && this.props.ACData !== nextProps.ACData) {
			this.setState({ ACData: nextProps.ACData });
		}
		if( this.props.errorMessage !== nextProps.errorMessage && this.props.errorMessage !== nextProps.errorMessage) {
			this.setState({ errorMessage: nextProps.errorMessage });
		}
	}

	handleError(){
		if(this.state.errorMessage.length > 0 && this.props.onError) {
			this.props.onError(this.props.name, this.state.errorMessage);
		}
	}

	render() {
		const option = {
			onBlur: this._onBlur,
			onChange: this._onChange,
			value: this.state.data,
			placeholder: this.props.placeHolder,
			disabled: this.props.disabled,
			onKeyDown: this._onKeyDown
		}
		let status = '';
		let that = this;

		if( this.state.errorMessage.length > 0 ) status = 'error ';
		return (
			<div className={this.props.className} styleName="inputRoot">
				<div styleName={status + 'input'}  ref="textFeildMain">
					{ this.props.allowMultiLine ?
						<textarea {...option}
							ref="textarea"/>
						:
						<input {...option} onKeyDown={this.handleKeyDown.bind(this)}/>
					}
					{ this.props.maxWords && <span styleName="maxWord"><span styleName="front">{this.state.data.length}</span>/{this.props.maxWords}</span>}
					<div styleName="errorMessage">{ this.state.errorMessage }</div>
				</div>
				{ this.state.ACData && this.state.ACData.length > 0  &&
					<div style={this.ACStyle} styleName="AClist">
						{ this.state.ACData.map(function(item,index){
							let style = index === this.state.highlightedIndex ? { background: '#def6ff' }: null;
							let transformString = highlightString(this.state.data ,item.value);
							return (
								<li key={index}
									onClick={this.select.bind(this, item.value, index)}
									onMouseOver={this.ACMouseOver.bind(this,index)}
									style={style}
									dangerouslySetInnerHTML={{ __html: transformString }} ></li>
							);
						},this) }
					</div>
				}
			</div>
		);
	}
}
TextFeild.propTypes = {
	onBlur: PropTypes.func
}
TextFeild.defaultProps = {
	errorMessage: '',
	data: '',
	onRequestOpenAC: {},
	onBlur: function(){}
}

export default CSSModules(TextFeild,style,{allowMultiple:true});
