'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_Component) {
	_inherits(Navigation, _Component);

	function Navigation() {
		_classCallCheck(this, Navigation);

		return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
	}

	_createClass(Navigation, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'nav',
				{ className: 'navigation' },
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/dropdown' },
					'DropDown'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/droplist' },
					'DropList'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/lightbox' },
					'Lightbox'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/form' },
					'Form'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/switches' },
					'Switches'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/editor' },
					'Editor'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/file' },
					'FileUploader'
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'navigation-link', to: '/comment' },
					'Comment'
				)
			);
		}
	}]);

	return Navigation;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(Navigation);