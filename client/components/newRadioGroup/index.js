import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class NewRadioGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customValue: props.customValue,
			customDisable: !(props.customValue),
			checkedIndex: props.customValue ? props.group.length : props.defaultChecked
		};
		this.mainRefs = null;
		this.customInputRefs = null;
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
		this.setState({
			checkedIndex: this.props.group.length,
			customDisable: false,
		});
		setTimeout(function(){
			that.customInputRefs.focus();
		}, 100);
	}
	handleBlur() {
		this.props.onSelected(this.state.customValue, this.props.group.length);
	}
	handleClick(index, e) {
		if (this.props.disabled && e) e.preventDefault();
		this.setState({
			checkedIndex: index,
			customDisable: true
		});
		this.props.onSelected(this.props.group[index].value, index);
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
				checked={ index === this.state.checkedIndex }
				defaultChecked={ data.checked }
			/>
		);
	}

	render() {
		const { checkBox, name, custom, customValue, group, type } = this.props;
		const that = this;
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
							type={ 'radio' }
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
