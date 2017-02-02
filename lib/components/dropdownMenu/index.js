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

var DropdownMenu = function (_Component) {
	_inherits(DropdownMenu, _Component);

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
			_react2.default.Children.map(this.props.children, function (child, index) {
				if (child.type === _target2.default) {
					that.target = _react2.default.cloneElement(child);
				} else {
					that.list.push(_react2.default.cloneElement(child));
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
				this.ArrowNode.className = _style2.default.arrow;
			} else if (ContainerProp.top + this.TrueHeight > window.innerHeight) {
				this.ListNode.style.bottom = this.targetStyle.height - 15 + 'px';
				this.ArrowNode.style.bottom = -12 + 'px';
				this.ArrowNode.style.top = 'initial';
				this.ArrowNode.className += " " + _style2.default.top;
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
				_react2.default.Children.map(nextProps.children, function (child, index) {
					if (child.type === _target2.default) {
						that.target = _react2.default.cloneElement(child);
					} else {
						that.list.push(_react2.default.cloneElement(child));
					}
				});
			}
		}
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
			return _react2.default.createElement(
				'div',
				{ className: this.props.className, styleName: 'root' },
				this.target,
				this.list
			);
		}
	}]);

	return DropdownMenu;
}(_react.Component);

DropdownMenu.childContextTypes = {
	toggleOpen: _react2.default.PropTypes.func,
	getSelect: _react2.default.PropTypes.func,
	getThisDOM: _react2.default.PropTypes.func,
	getListDom: _react2.default.PropTypes.func,
	open: _react2.default.PropTypes.bool
};
exports.default = (0, _reactCssModules2.default)(DropdownMenu, _style2.default, { allowMultiple: true });