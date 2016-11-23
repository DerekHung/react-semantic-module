'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownList = function (_get__2) {
	_inherits(DropdownList, _get__2);

	function DropdownList(props) {
		_classCallCheck(this, DropdownList);

		var _this = _possibleConstructorReturn(this, (DropdownList.__proto__ || Object.getPrototypeOf(DropdownList)).call(this, props));

		_this.state = {
			open: false,
			selected: props.defaultIndex || null
		};
		_this.toggleOpen = _this.toggleOpen.bind(_this);
		return _this;
	}

	_createClass(DropdownList, [{
		key: 'toggleOpen',
		value: function toggleOpen() {
			if (!this.props.disabled) {
				this.setState({
					open: !this.state.open
				});
			}
		}
	}, {
		key: 'onSelect',
		value: function onSelect(data, index) {

			this.setState({
				open: false,
				selected: index + 1
			});
			data.index = index + 1;

			var _props$onSelected = this.props.onSelected;
			var onSelected = _props$onSelected === undefined ? _.noop : _props$onSelected;

			onSelected(data);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var that = this;
			var status = '';
			if (this.props.disabled) status = 'disabled';else if (this.state.open) status = 'active';

			return _get__('React').createElement(
				'div',
				{ styleName: 'droplist', className: this.props.className },
				_get__('React').createElement(
					'div',
					{ onClick: this.toggleOpen.bind(this), className: 'Droplist_listInput', styleName: 'listInput ' + status, style: { width: this.props.width } },
					function () {
						if (_this2.state.selected) {
							var defaultSelect = _this2.props.listContent[_this2.state.selected - 1];
							if (defaultSelect.iconFont) return _get__('React').createElement(
								'div',
								{ style: { color: "#333" } },
								_get__('React').createElement('i', { className: "fa " + defaultSelect.iconFont, 'aria-hidden': 'true' }),
								defaultSelect.label
							);else return _get__('React').createElement(
								'span',
								{ style: { color: "#333" } },
								defaultSelect.label,
								' '
							);
						} else {
							return _this2.props.placeHolder;
						}
					}(),
					_get__('React').createElement('span', { 'aria-hidden': 'true', styleName: 'caret-down' })
				),
				this.state.open && _get__('React').createElement(
					_get__('List'),
					{ type: this.state.posType,
						open: this.state.open,
						clickAway: this.toggleOpen,
						width: this.props.width },
					this.props.listContent.map(function (data, index) {
						var style = index === that.state.selected - 1 ? { background: '#def6ff' } : {};
						return _get__('React').createElement(
							'li',
							{ key: index,
								ref: "listItem" + index,
								onClick: that.onSelect.bind(that, data, index),
								style: style },
							typeof data.iconFont !== 'undefined' && _get__('React').createElement('i', { className: "fa " + data.iconFont, 'aria-hidden': 'true' }),
							data.label
						);
					})
				)
			);
		}
	}]);

	return DropdownList;
}(_get__('Component'));

_get__('DropdownList').defaultProps = {
	placeHolder: '請選擇',
	listContent: [],
	disabled: false
};

var _DefaultExportValue = _get__('CSSModules')(_get__('DropdownList'), _get__('style'), { allowMultiple: true });

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
		case 'Component':
			return _react.Component;

		case 'DropdownList':
			return DropdownList;

		case 'CSSModules':
			return _reactCssModules2.default;

		case 'style':
			return _style2.default;

		case 'React':
			return _react2.default;

		case 'List':
			return _list2.default;
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