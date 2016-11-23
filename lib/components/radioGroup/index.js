'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getSelectedChbox(frm) {
	var selchbox = []; // array that will store the value of selected checkboxes
	// gets all the input tags in frm, and their number
	var inpfields = frm.getElementsByTagName('input');
	var nr_inpfields = inpfields.length;
	// traverse the inpfields elements, and adds the value of selected (checked) checkbox in selchbox
	for (var i = 0; i < nr_inpfields; i++) {
		if (inpfields[i].checked == true) {
			selchbox.push({
				label: inpfields[i].getAttribute("label"),
				value: inpfields[i].value
			});
		}
	}
	//multiChoose = selchbox;
	return selchbox;
}

var RadioGroup = function (_get__2) {
	_inherits(RadioGroup, _get__2);

	function RadioGroup(props) {
		_classCallCheck(this, RadioGroup);

		var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

		_this.state = {
			customValue: props.customValue,
			customDisable: props.customValue ? false : true,
			errorMessage: props.errorMessage
		};
		_this.multiChoose = [];
		if (props.customValue) {
			_this.multiChoose.push({
				label: '自訂',
				value: props.checkedValue
			});
		}
		return _this;
	}

	_createClass(RadioGroup, [{
		key: 'handleChange',
		value: function handleChange(index, e) {
			this.multiChoose = _get__('getSelectedChbox')(this.refs.main);
			if (this.multiChoose.length > this.props.maxChoose) {
				e.target.checked = false;
				this.setState({ errorMessage: '最多選擇' + this.props.maxChoose + '個項目' });
			} else {
				this.setState({ errorMessage: '' });
				this.props.onSelected(this.multiChoose, index + 1);
			}
			var check = true;
			for (var i = 0; i < this.multiChoose.length; i++) {
				if (this.multiChoose[i].label === '自訂') {
					check = false;
				}
			}
			this.setState({
				customDisable: check
			});
		}
	}, {
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
			this.handleChange(this.props.group.length, e);
			this.setState({
				customDisable: !e.target.checked
			});

			setTimeout(function () {
				that.refs.customInput.focus();
			}, 100);
		}
	}, {
		key: 'handleBlur',
		value: function handleBlur() {
			this.props.onSelected(_get__('getSelectedChbox')(this.refs.main), this.props.group.length + 1);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.errorMessage !== this.props.errorMessage || this.props.errorMessage !== nextProps.errorMessage) {
				this.setState({ errorMessage: nextProps.errorMessage });
			}
			if (this.state.customValue !== this.props.customValue || this.props.customValue !== nextProps.customValue) {
				this.setState({ customValue: nextProps.customValue });
			}
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
			if (this.props.disabled) e.preventDefault();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var checkBox = _props.checkBox;
			var name = _props.name;
			var group = _props.group;
			var custom = _props.custom;
			var customChoose = _props.customChoose;
			var customValue = _props.customValue;

			var that = this;
			var type = checkBox ? 'checkbox' : 'radio';

			return _get__('React').createElement(
				'div',
				{ className: this.props.className, ref: 'main', styleName: 'radioGroup' },
				group.map(function (data, index) {
					return _get__('React').createElement(
						'div',
						{ key: index, styleName: 'radioItem' },
						_get__('React').createElement('input', {
							type: type,
							id: name + 'radio' + index,
							name: name,
							value: data.value,
							label: data.label,
							onChange: that.handleChange.bind(that, index),
							defaultChecked: data.checked ? 'checked' : null }),
						_get__('React').createElement(
							'label',
							{ htmlFor: name + 'radio' + index, onClick: that.handleClick.bind(that) },
							_get__('React').createElement('div', { styleName: 'check' }),
							data.label
						)
					);
				}),
				custom && _get__('React').createElement(
					'div',
					{ styleName: 'radioItem' },
					_get__('React').createElement('input', {
						id: name + 'custom',
						type: type,
						value: this.state.customValue,
						name: name,
						label: '\u81EA\u8A02',
						onChange: this.customChoose.bind(this),
						defaultChecked: customValue ? group.length + 1 : null }),
					_get__('React').createElement(
						'label',
						{ htmlFor: name + 'custom', onClick: that.handleClick.bind(that) },
						_get__('React').createElement('div', { styleName: 'check' }),
						'\u81EA\u8A02'
					),
					that.props.disabled ? _get__('React').createElement('input', _defineProperty({
						type: 'text',
						ref: 'customInput',
						value: this.state.customValue,
						onChange: this.customChange.bind(this),
						disabled: this.state.customDisable,
						onBlur: this.handleBlur.bind(this)
					}, 'disabled', true)) : _get__('React').createElement('input', {
						type: 'text',
						ref: 'customInput',
						value: this.state.customValue,
						onChange: this.customChange.bind(this),
						disabled: this.state.customDisable,
						onBlur: this.handleBlur.bind(this) })
				),
				this.state.errorMessage && _get__('React').createElement(
					'div',
					{ styleName: 'error' },
					this.state.errorMessage
				)
			);
		}
	}]);

	return RadioGroup;
}(_get__('Component'));

_get__('RadioGroup').defaultProps = {
	errorMessage: '',
	maxChoose: 99,
	custom: false
};

var _DefaultExportValue = _get__('CSSModules')(_get__('RadioGroup'), _get__('style'), { allowMultiple: true });

exports.default = _DefaultExportValue;

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _get_original__(variableName);
	} else {
		var value = _RewiredData__[variableName];

		if (value === INTENTIONAL_UNDEFINED) {
			return undefined;
		} else {
			return value;
		}
	}
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'getSelectedChbox':
			return getSelectedChbox;

		case 'Component':
			return _react.Component;

		case 'RadioGroup':
			return RadioGroup;

		case 'CSSModules':
			return _reactCssModules2.default;

		case 'style':
			return _style2.default;

		case 'React':
			return _react2.default;
	}

	return undefined;
}

function _assign__(variableName, value) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return _RewiredData__[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
		Object.keys(variableName).forEach(function (name) {
			_RewiredData__[name] = variableName[name];
		});
	} else {
		if (value === undefined) {
			_RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
		} else {
			_RewiredData__[variableName] = value;
		}

		return function () {
			_reset__(variableName);
		};
	}
}

function _reset__(variableName) {
	delete _RewiredData__[variableName];
}

function _with__(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			_RewiredData__[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = _RewiredData__[variableName];
			_RewiredData__[variableName] = object[variableName];
		});
		var result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

var _typeOfOriginalExport = typeof _DefaultExportValue === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue);

function addNonEnumerableProperty(name, value) {
	Object.defineProperty(_DefaultExportValue, name, {
		value: value,
		enumerable: false,
		configurable: true
	});
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
	addNonEnumerableProperty('__get__', _get__);
	addNonEnumerableProperty('__GetDependency__', _get__);
	addNonEnumerableProperty('__Rewire__', _set__);
	addNonEnumerableProperty('__set__', _set__);
	addNonEnumerableProperty('__reset__', _reset__);
	addNonEnumerableProperty('__ResetDependency__', _reset__);
	addNonEnumerableProperty('__with__', _with__);
	addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;