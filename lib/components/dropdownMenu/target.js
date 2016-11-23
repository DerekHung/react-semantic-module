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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Target = function (_Component) {
	_inherits(Target, _Component);

	function Target() {
		_classCallCheck(this, Target);

		return _possibleConstructorReturn(this, (Target.__proto__ || Object.getPrototypeOf(Target)).apply(this, arguments));
	}

	_createClass(Target, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.context.getThisDOM(this.refs.target);
		}
	}, {
		key: 'render',
		value: function render() {
			//console.log(this.props.children);
			var children = _react2.default.Children.map(this.props.children, function (child) {
				if (_react2.default.isValidElement(child)) return _react2.default.cloneElement(child);else return _react2.default.createElement(
					'div',
					null,
					child
				);
			});

			return _react2.default.createElement(
				'div',
				{ onClick: this.context.toggleOpen, styleName: 'target', className: this.props.className, ref: 'target' },
				children
			);
		}
	}]);

	return Target;
}(_react.Component);

Target.contextTypes = {
	toggleOpen: _react2.default.PropTypes.func,
	getThisDOM: _react2.default.PropTypes.func
};
exports.default = (0, _reactCssModules2.default)(Target, _style2.default, { allowMultiple: true });