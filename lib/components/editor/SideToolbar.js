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

var _fileUploader = require('../fileUploader');

var _fileUploader2 = _interopRequireDefault(_fileUploader);

var _mediaInfo = require('./mediaInfo.js');

var _mediaInfo2 = _interopRequireDefault(_mediaInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BLOCK_TYPES = [{ icon: 'icon h1', style: 'header-one' }, { icon: 'icon h2', style: 'header-two' }, { icon: 'icon list ul', style: 'unordered-list-item' }, { icon: 'icon list ol', style: 'ordered-list-item' }, { icon: 'icon left_double_quote', style: 'blockquote' }];

var SideToolbarExtras = (0, _reactCssModules2.default)(function (_ref) {
	var editorState = _ref.editorState;
	var onToggle = _ref.onToggle;

	var selection = editorState.getSelection();
	var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
	return _react2.default.createElement(
		'div',
		{ styleName: 'toolbar side' },
		_react2.default.createElement(
			'ul',
			{ styleName: 'toolbar-icons' },
			BLOCK_TYPES.map(function (type) {
				return _react2.default.createElement(_ToolbarIcon2.default, {
					key: type.label || type.icon,
					active: type.style === blockType,
					label: type.label,
					icon: type.icon,
					onToggle: onToggle,
					style: type.style
				});
			})
		)
	);
}, _style2.default, { allowMultiple: true });

var SideToolbar = function (_Component) {
	_inherits(SideToolbar, _Component);

	function SideToolbar(props) {
		_classCallCheck(this, SideToolbar);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SideToolbar).call(this, props));

		_this.state = {
			isExpanded: false
		};
		return _this;
	}

	_createClass(SideToolbar, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var isExpanded = this.state.isExpanded;
			var _props = this.props;
			var editorState = _props.editorState;
			var onUploadImage = _props.onUploadImage;
			var onToggle = _props.onToggle;
			var onTriggerUpload = _props.onTriggerUpload;
			var getFileInfo = _props.getFileInfo;
			var getSignatureDone = _props.getSignatureDone;
			var uploadToS3Done = _props.uploadToS3Done;
			var urlTransformDone = _props.urlTransformDone;

			return _react2.default.createElement(
				'div',
				{ style: this.props.style, styleName: 'side-toolbar' },
				_react2.default.createElement(
					_fileUploader2.default,
					{
						apnum: this.props.apnum,
						pid: this.props.pid,
						mediaInfo: _mediaInfo2.default,
						onTriggerUpload: onTriggerUpload,
						getFileInfo: getFileInfo,
						getSignatureDone: getSignatureDone,
						uploadToS3Done: uploadToS3Done,
						urlTransformDone: urlTransformDone,
						dontWaitSuccess: true },
					_react2.default.createElement('i', { className: 'icon picture',
						'aria-hidden': 'true',
						onMouseDown: function onMouseDown(e) {
							return e.preventDefault();
						},
						onClick: onUploadImage
					})
				),
				_react2.default.createElement(
					'i',
					{ className: 'icon bars',
						'aria-hidden': 'true',
						onMouseEnter: function onMouseEnter() {
							return _this2.setState({ isExpanded: true });
						},
						onMouseDown: function onMouseDown(e) {
							return e.preventDefault();
						},
						onMouseLeave: function onMouseLeave() {
							return _this2.setState({ isExpanded: false });
						}
					},
					isExpanded ? _react2.default.createElement(SideToolbarExtras, { editorState: editorState, onToggle: onToggle }) : null
				)
			);
		}
	}]);

	return SideToolbar;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(SideToolbar, _style2.default, { allowMultiple: true });