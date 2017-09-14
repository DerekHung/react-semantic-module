'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewRadioGroup = function (_Component) {
	_inherits(NewRadioGroup, _Component);

	function NewRadioGroup(props) {
		_classCallCheck(this, NewRadioGroup);

		var _this = _possibleConstructorReturn(this, (NewRadioGroup.__proto__ || Object.getPrototypeOf(NewRadioGroup)).call(this, props));

		_this.state = {
			customValue: props.customValue,
			customDisable: !props.customValue,
			checkedIndex: props.customValue ? props.group.length : props.defaultChecked || null
		};
		_this.mainRefs = null;
		_this.customInputRefs = null;
		return _this;
	}
	// handleChange(index) {
	// 	this.setState({
	// 		customDisable: !(index === this.state.group.length)
	// 	});
	// 	this.props.onSelected(this.state.group[index].value, index);
	// }


	_createClass(NewRadioGroup, [{
		key: 'customChange',
		value: function customChange(e) {
			this.setState({
				customValue: e.target.value
			});
		}
	}, {
		key: 'customChoose',
		value: function customChoose(e) {
			var that = this;
			this.setState({
				checkedIndex: this.props.group.length,
				customDisable: false
			});
			setTimeout(function () {
				that.customInputRefs.focus();
			}, 100);
		}
	}, {
		key: 'handleBlur',
		value: function handleBlur() {
			this.props.onSelected(this.state.customValue, this.props.group.length);
		}
	}, {
		key: 'handleClick',
		value: function handleClick(index, e) {
			if (this.props.disabled && e) e.preventDefault();
			this.setState({
				checkedIndex: index,
				customDisable: true
			});
			this.props.onSelected(this.props.group[index].value, index);
		}
	}, {
		key: 'typeComponent',
		value: function typeComponent(that, data, index) {
			var name = this.props.name;

			return _react2.default.createElement('input', {
				type: 'radio',
				id: name + 'radio' + index,
				name: name,
				value: data.value,
				label: data.label,
				checked: index === this.state.checkedIndex,
				defaultChecked: data.checked
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    checkBox = _props.checkBox,
			    name = _props.name,
			    custom = _props.custom,
			    customValue = _props.customValue,
			    group = _props.group,
			    type = _props.type;

			var that = this;
			return _react2.default.createElement(
				'div',
				{ className: this.props.className, ref: function ref(refs) {
						_this2.mainRefs = refs;
					}, styleName: 'radioGroup' },
				group.map(function (data, index) {
					return _react2.default.createElement(
						'div',
						{ key: index, styleName: 'radioItem' },
						that.typeComponent(that, data, index),
						_react2.default.createElement(
							'label',
							{ htmlFor: name + 'radio' + index, onClick: that.handleClick.bind(that, index) },
							_react2.default.createElement('div', { styleName: 'check' }),
							data.label
						)
					);
				}),
				custom && _react2.default.createElement(
					'div',
					{ styleName: 'radioItem' },
					_react2.default.createElement('input', {
						id: name + 'custom',
						type: 'radio',
						value: this.state.customValue,
						name: name,
						label: '\u81EA\u8A02',
						defaultChecked: customValue ? group.length : null
					}),
					_react2.default.createElement(
						'label',
						{ htmlFor: name + 'custom', onClick: that.customChoose.bind(that) },
						_react2.default.createElement('div', { styleName: 'check' }),
						'\u81EA\u8A02'
					),
					_react2.default.createElement('input', {
						type: 'text',
						ref: function ref(refs) {
							_this2.customInputRefs = refs;
						},
						value: this.state.customValue,
						onChange: this.customChange.bind(this),
						disabled: this.state.customDisable,
						onBlur: this.handleBlur.bind(this)
					})
				)
			);
		}
	}]);

	return NewRadioGroup;
}(_react.Component);

NewRadioGroup.defaultProps = {
	errorMessage: '',
	maxChoose: 99,
	custom: false,
	onSelected: function onSelected() {}
};

exports.default = (0, _reactCssModules2.default)(NewRadioGroup, _style2.default, { allowMultiple: true });