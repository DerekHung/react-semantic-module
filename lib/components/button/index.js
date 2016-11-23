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

var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button(props) {
		_classCallCheck(this, Button);

		var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

		_this.state = {
			newLabel: null,
			focus: false
		};
		return _this;
	}

	_createClass(Button, [{
		key: 'handleClick',
		value: function handleClick() {
			if (this.props.onClick) this.props.onClick();
			if (this.props.onFocusLabel && !this.state.focus) {
				this.setState({ newLabel: this.props.onFocusLabel, focus: true });
			} else {
				this.setState({ newLabel: null, focus: false });
			}
		}
	}, {
		key: 'handleBlur',
		value: function handleBlur() {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'button',
				{ styleName: 'button',
					onClick: this.handleClick.bind(this),
					onBlur: this.handleBlur.bind(this) },
				this.state.newLabel || this.props.label
			);
		}
	}]);

	return Button;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(Button, _style2.default, { allowMultiple: true });