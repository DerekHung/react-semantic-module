'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ToolbarIcon = require('./ToolbarIcon');

var _ToolbarIcon2 = _interopRequireDefault(_ToolbarIcon);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _urlInput = require('./urlInput');

var _urlInput2 = _interopRequireDefault(_urlInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INLINE_STYLES = [{ icon: 'icon bold', style: 'BOLD' }, { icon: 'icon italics', style: 'ITALIC' }, { icon: 'icon link', style: 'LINK' }];

var InlineToolBar = function (_Component) {
	_inherits(InlineToolBar, _Component);

	function InlineToolBar(props) {
		_classCallCheck(this, InlineToolBar);

		var _this = _possibleConstructorReturn(this, (InlineToolBar.__proto__ || Object.getPrototypeOf(InlineToolBar)).call(this, props));

		_this.state = {
			urlInput: false
		};
		return _this;
	}

	_createClass(InlineToolBar, [{
		key: 'openLink',
		value: function openLink() {
			this.setState({ urlInput: true });
		}
	}, {
		key: 'onLinkKeyDown',
		value: function onLinkKeyDown(value) {
			this.props.onLink(value);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var editorState = _props.editorState;
			var onToggle = _props.onToggle;
			var position = _props.position;

			var currentStyle = editorState.getCurrentInlineStyle();
			return _react2.default.createElement(
				'div',
				{
					styleName: 'toolbar',
					id: 'inlineToolbar',
					style: position
				},
				_react2.default.createElement(
					'ul',
					{ styleName: 'toolbar-icons', id: 'toolbar-icon' },
					INLINE_STYLES.map(function (type) {
						return _react2.default.createElement(_ToolbarIcon2.default, {
							key: type.label || type.icon,
							active: currentStyle.has(type.style),
							label: type.label,
							icon: type.icon,
							onToggle: onToggle,
							onLink: _this2.openLink.bind(_this2),
							style: type.style
						});
					}),
					this.state.urlInput && _react2.default.createElement(_urlInput2.default, { onKeyDown: this.onLinkKeyDown.bind(this) })
				)
			);
		}
	}]);

	return InlineToolBar;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(InlineToolBar, _style2.default, { allowMultiple: true });