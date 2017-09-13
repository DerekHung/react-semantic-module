import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class NewRadioGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			group: props.group,
			customValue: props.customValue,
			customDisable: !(props.customValue)
		};
		this.mainRefs = null;
		this.customInputRefs = null;
		if (props.defaultChecked) this.state.group[props.defaultChecked].checked = true;
		this.selected = props.defaultChecked;
		if (props.customValue) this.selected = this.state.group.length;
	}
	// handleChange(index) {
	// 	this.setState({
	// 		customDisable: !(index === this.state.group.length)
	// 	});
	// 	this.props.onSelected(this.state.group[index].value, index);
	// }
	customChange(e) {
		this.setState({
			customValue: e.target.value
		});
	}
	customChoose(e) {
		const that = this;
		// this.handleChange(this.props.group.length, e);
		if (this.selected < this.state.group.length) this.state.group[this.selected].checked = false;
		this.selected = this.state.group.length;
		this.setState({
			group: this.state.group,
			customDisable: false,
		});
		setTimeout(function(){
			that.customInputRefs.focus();
		}, 100);
	}
	handleBlur() {
		this.props.onSelected(this.state.customValue, this.state.group.length + 1);
	}
	handleClick(index, e) {
		if (this.props.disabled && e) e.preventDefault();
		if (this.selected && this.selected < this.state.group.length) this.state.group[this.selected].checked = false;
		this.state.group[index].checked = true;
		this.selected = index;
		this.setState({
			group: this.state.group,
			customDisable: true
		});
		this.props.onSelected(this.state.group[index].value, index + 1);
	}
	typeComponent(that, data, index) {
		const { name } = this.props;
		return (
			<input
				type="radio"
				id={ name + 'radio' + index }
				name={ name }
				value={ data.value }
				label={ data.label }
				checked={ data.checked }
				defaultChecked={ data.checked }
			/>
		);
	}

	render() {
		const { checkBox, name, custom, customValue } = this.props;
		const group = this.state.group;
		const that = this;
		const type = checkBox ? 'checkbox' : 'radio';
		return (
			<div className={ this.props.className } ref={ (refs) => { this.mainRefs = refs; } } styleName="radioGroup">
				{
					group.map((data, index) => {
						return (
							<div key={ index } styleName="radioItem">
								{ that.typeComponent(that, data, index) }
								<label htmlFor={ name + 'radio' + index } onClick={ that.handleClick.bind(that, index) }>
									<div styleName="check" />
									{data.label}
								</label>
							</div>
						);
					})
				}
				{custom &&
					<div styleName="radioItem">
						<input
							id={ name + 'custom' }
							type={ type }
							value={ this.state.customValue }
							name={ name }
							label="自訂"
							defaultChecked={ customValue ? group.length : null }
						/>
						<label htmlFor={ name + 'custom' } onClick={ that.customChoose.bind(that) }>
							<div styleName="check" />
							自訂
						</label>
						<input
							type="text"
							ref={ (refs) => { this.customInputRefs = refs; } }
							value={ this.state.customValue }
							onChange={ this.customChange.bind(this) }
							disabled={ this.state.customDisable }
							onBlur={ this.handleBlur.bind(this) }
						/>
					</div>
				}
			</div>
		);
	}
}
NewRadioGroup.defaultProps = {
	errorMessage: '',
	maxChoose: 99,
	custom: false,
	onSelected: () => {},
};

export default CSSModules(NewRadioGroup, style, { allowMultiple: true });
