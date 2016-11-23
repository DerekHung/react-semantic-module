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

var _target = require('./target');

var _target2 = _interopRequireDefault(_target);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownMenu = function (_get__2) {
	_inherits(DropdownMenu, _get__2);

	function DropdownMenu(props) {
		_classCallCheck(this, DropdownMenu);

		var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props));

		_this.state = {
			open: false
		};
		_this.toggleOpen = _this.toggleOpen.bind(_this);
		_this.getChildDOM = _this.getChildDOM.bind(_this);
		_this.getListDom = _this.getListDom.bind(_this);

		_this.target = null;
		_this.list = [];
		_this.targetStyle = null;
		_this.ListNode = null;
		_this.ArrowNode = null;
		_this.TrueHeight = null;
		_this.InitialProp = null;
		return _this;
	}

	_createClass(DropdownMenu, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var that = this;
			_get__('React').Children.map(this.props.children, function (child, index) {
				if (child.type === _get__('Target')) {
					that.target = _get__('React').cloneElement(child);
				} else {
					that.list.push(_get__('React').cloneElement(child));
				}
			});
		}
	}, {
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				toggleOpen: this.toggleOpen,
				getSelect: this.updateSelected,
				getThisDOM: this.getChildDOM,
				getListDom: this.getListDom,
				open: this.state.open
			};
		}
	}, {
		key: 'getChildDOM',
		value: function getChildDOM(DOM) {
			this.targetStyle = DOM.getBoundingClientRect();
		}
	}, {
		key: 'toggleOpen',
		value: function toggleOpen() {
			if (!this.state.open) {
				this.testPostiion();
			}
			if (this.props.toggleOpen) this.props.toggleOpen(!this.state.open);
			this.setState({
				open: !this.state.open
			});
		}
	}, {
		key: 'testPostiion',
		value: function testPostiion() {
			var ContainerProp = this.ListNode.getBoundingClientRect();
			var OrginLeft = this.targetStyle.width / 2 - ContainerProp.width / 2;
			var ContainerLeft = OrginLeft;

			if (OrginLeft + this.targetStyle.left + this.targetStyle.width < 0) {
				ContainerLeft = 0;
			} else if (this.targetStyle.left + this.targetStyle.width / 2 + ContainerProp.width / 2 > window.innerWidth) {
				ContainerLeft = window.innerWidth - ContainerProp.width - 10 - this.targetStyle.left;
			}

			this.ListNode.style.left = ContainerLeft + 'px';
			this.ArrowNode.style.marginLeft = OrginLeft - ContainerLeft - 6 + 'px';

			if (ContainerProp.top + this.TrueHeight <= window.innerHeight) {
				this.ListNode.style.bottom = "";
				this.ArrowNode.style.bottom = "";
				this.ArrowNode.style.top = 0;
				this.ArrowNode.className = _get__('style').arrow;
			} else if (ContainerProp.top + this.TrueHeight > window.innerHeight) {
				this.ListNode.style.bottom = this.targetStyle.height - 15 + 'px';
				this.ArrowNode.style.bottom = -12 + 'px';
				this.ArrowNode.style.top = 'initial';
				this.ArrowNode.className += " " + _get__('style').top;
			}
		}
	}, {
		key: 'getListDom',
		value: function getListDom(Node, Arrow, trueHeight) {
			if (!this.ListNode || !this.ArrowNode || !this.TrueHeight) {
				this.ListNode = Node;
				this.ArrowNode = Arrow;
				this.TrueHeight = trueHeight;
				this.InitialProp = this.ListNode.getBoundingClientRect();
				this.testPostiion();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var that = this;
			if (this.props.children !== nextProps.children) {
				that.list = [];
				_get__('React').Children.map(nextProps.children, function (child, index) {
					if (child.type === _get__('Target')) {
						that.target = _get__('React').cloneElement(child);
					} else {
						that.list.push(_get__('React').cloneElement(child));
					}
				});
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.ListNode = null;
			this.ArrowNode = null;
			this.TrueHeight = null;
			this.InitialProp = null;
			this.list = [];
		}
	}, {
		key: 'render',
		value: function render() {
			//console.log(this.target);
			return _get__('React').createElement(
				'div',
				{ className: this.props.className, styleName: 'root' },
				this.target,
				this.list
			);
		}
	}]);

	return DropdownMenu;
}(_get__('Component'));

_get__('DropdownMenu').childContextTypes = {
	toggleOpen: _get__('React').PropTypes.func,
	getSelect: _get__('React').PropTypes.func,
	getThisDOM: _get__('React').PropTypes.func,
	getListDom: _get__('React').PropTypes.func,
	open: _get__('React').PropTypes.bool
};

var _DefaultExportValue = _get__('CSSModules')(_get__('DropdownMenu'), _get__('style'), { allowMultiple: true });

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
		case 'React':
			return _react2.default;

		case 'Target':
			return _target2.default;

		case 'style':
			return _style2.default;

		case 'Component':
			return _react.Component;

		case 'DropdownMenu':
			return DropdownMenu;

		case 'CSSModules':
			return _reactCssModules2.default;
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