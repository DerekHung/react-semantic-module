'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BLOCK_TYPES = [{ icon: 'icon h1', style: 'header-one' }, { icon: 'icon h2', style: 'header-two' }, { icon: 'icon list ul', style: 'unordered-list-item' }, { icon: 'icon list ol', style: 'ordered-list-item' }, { icon: 'icon left_double_quote', style: 'blockquote' }];

var SideToolbarExtras = _get__('CSSModules')(function (_ref) {
	var editorState = _ref.editorState;
	var onToggle = _ref.onToggle;

	var selection = editorState.getSelection();
	var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
	return _get__('React').createElement(
		'div',
		{ styleName: 'toolbar side' },
		_get__('React').createElement(
			'ul',
			{ styleName: 'toolbar-icons' },
			_get__('BLOCK_TYPES').map(function (type) {
				return _get__('React').createElement(_get__('ToolbarIcon'), {
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
}, _get__('style'), { allowMultiple: true });

var SideToolbar = function (_get__2) {
	_inherits(SideToolbar, _get__2);

	function SideToolbar(props) {
		_classCallCheck(this, SideToolbar);

		var _this = _possibleConstructorReturn(this, (SideToolbar.__proto__ || Object.getPrototypeOf(SideToolbar)).call(this, props));

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

			return _get__('React').createElement(
				'div',
				{ style: this.props.style, styleName: 'side-toolbar' },
				_get__('React').createElement(
					_get__('FileUploader'),
					{
						apnum: this.props.apnum,
						pid: this.props.pid,
						mediaInfo: this.props.mediaInfo,
						onTriggerUpload: onTriggerUpload,
						getFileInfo: getFileInfo,
						getSignatureDone: getSignatureDone,
						uploadToS3Done: uploadToS3Done,
						urlTransformDone: urlTransformDone,
						dontWaitSuccess: true },
					_get__('React').createElement('i', { className: 'icon picture',
						'aria-hidden': 'true',
						onMouseDown: function onMouseDown(e) {
							return e.preventDefault();
						},
						onClick: onUploadImage
					})
				),
				_get__('React').createElement(
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
					isExpanded ? _get__('React').createElement(_get__('SideToolbarExtras'), { editorState: editorState, onToggle: onToggle }) : null
				)
			);
		}
	}]);

	return SideToolbar;
}(_get__('Component'));

var _DefaultExportValue = _get__('CSSModules')(_get__('SideToolbar'), _get__('style'), { allowMultiple: true });

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
		case 'CSSModules':
			return _reactCssModules2.default;

		case 'BLOCK_TYPES':
			return BLOCK_TYPES;

		case 'style':
			return _style2.default;

		case 'Component':
			return _react.Component;

		case 'SideToolbar':
			return SideToolbar;

		case 'React':
			return _react2.default;

		case 'ToolbarIcon':
			return _ToolbarIcon2.default;

		case 'FileUploader':
			return _fileUploader2.default;

		case 'SideToolbarExtras':
			return SideToolbarExtras;
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