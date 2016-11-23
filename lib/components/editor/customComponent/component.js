'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _fileUpload = require('../../../utils/fileUpload.js');

var _template = require('./template.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
上層傳來的props有幾個主要的key : fakeSrc / src  / snap
1. 有 fakeSrc => 

*/
var CustomComponent = function (_get__2) {
	_inherits(CustomComponent, _get__2);

	function CustomComponent(props) {
		_classCallCheck(this, CustomComponent);

		var _this = _possibleConstructorReturn(this, (CustomComponent.__proto__ || Object.getPrototypeOf(CustomComponent)).call(this, props));

		var entity = _get__('Entity').get(props.block.getEntityAt(0));
		var entityProps = entity.getData();
		var type = entity.getType();

		_this.state = {
			props: entityProps,
			type: type
		};
		return _this;
	}

	_createClass(CustomComponent, [{
		key: 'handleClick',
		value: function handleClick(e) {
			this.props.blockProps.onRequestRemove(this.props.block.getKey(), this.state.props.id);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			var that = this;
			/*if( !this.state.props.src && this.state.props.fileId ) {
   	getFileUrl(this.state.props.fileId).done(function(res){
   		that.state.props.src = res[0].url[0];
   		that.setState({
   			props: that.state.props
   		});
   	})
   }*/
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.state.props;
			var type = this.state.type;
			var that = this;

			//if( !props.fakeSrc ) props.fakeSrc = props.src;

			if (props.error) {
				/* 當error block出現之後隔5秒將其刪除 */
				setTimeout(function () {
					that.props.blockProps.onRequestRemove(that.props.block.getKey());
				}, 5000);

				return _get__('React').createElement(_get__('ErrorBlock'), { parent: this });
			}

			if (props.loading) {
				return _get__('React').createElement(_get__('LoadingBlock'), { parent: this });
			}

			if (props.linkError) {
				that.props.blockProps.onRequestRemove(that.props.block.getKey());
				return false;
			}

			switch (type) {
				case 'IMAGE':
					return _get__('React').createElement(_get__('ImgBlock'), { parent: this, props: props });
				case 'VIDEO':
					return _get__('React').createElement(_get__('VideoBlock'), { parent: this, props: props });
				case 'AUDIO':
					return _get__('React').createElement(_get__('AudioBlock'), { parent: this, props: props });
				case 'DOCUMENT':
					return _get__('React').createElement(_get__('DocumentBlock'), { parent: this, props: props });
				case 'HYPERLINK':
					return _get__('React').createElement(_get__('HyperLinkBlock'), { parent: this, props: props });
				case 'YOUTUBE':
					return _get__('React').createElement(_get__('YoutubeBlock'), { parent: this, props: props });
				case 'LINK':
					return _get__('React').createElement(_get__('LinkBlock'), { parent: this, props: props });
				default:
					return false;
			}
		}
	}]);

	return CustomComponent;
}(_get__('Component'));

;

var _DefaultExportValue = _get__('CSSModules')(_get__('CustomComponent'), _get__('style'), { allowMultiple: true });

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
		case 'Entity':
			return _draftJs.Entity;

		case 'Component':
			return _react.Component;

		case 'CSSModules':
			return _reactCssModules2.default;

		case 'CustomComponent':
			return CustomComponent;

		case 'style':
			return _style2.default;

		case 'React':
			return _react2.default;

		case 'ErrorBlock':
			return _template.ErrorBlock;

		case 'LoadingBlock':
			return _template.LoadingBlock;

		case 'ImgBlock':
			return _template.ImgBlock;

		case 'VideoBlock':
			return _template.VideoBlock;

		case 'AudioBlock':
			return _template.AudioBlock;

		case 'DocumentBlock':
			return _template.DocumentBlock;

		case 'HyperLinkBlock':
			return _template.HyperLinkBlock;

		case 'YoutubeBlock':
			return _template.YoutubeBlock;

		case 'LinkBlock':
			return _template.LinkBlock;
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