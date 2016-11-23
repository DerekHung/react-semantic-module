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

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

var _player = require('./player.js');

var _player2 = _interopRequireDefault(_player);

var _fileUpload = require('../../utils/fileUpload.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getMappingData = function getMappingData(fileFromDocApiSrc) {

	if (!fileFromDocApiSrc) fileFromDocApiSrc = [];
	var docApiMap = {
		'VIDEO': {
			tag: ['720p'],
			template: _get__('React').createElement('video', { src: fileFromDocApiSrc[0], controls: true, autoPlay: 'autoplay' })
		},
		'AUDIO': {
			tag: [],
			template: _get__('React').createElement('audio', { src: fileFromDocApiSrc[0], controls: true })
		},
		'IMAGE': {
			tag: ['activityGrid'],
			template: _get__('React').createElement('img', { src: fileFromDocApiSrc[0] })
		},
		'DOCUMENT': {
			tag: ['activityPlay'],
			template: _get__('React').createElement(_get__('Player'), { src: fileFromDocApiSrc })
		}
	};

	return docApiMap;
};

var MediaPlayer = function (_get__2) {
	_inherits(MediaPlayer, _get__2);

	function MediaPlayer(props) {
		_classCallCheck(this, MediaPlayer);

		var _this = _possibleConstructorReturn(this, (MediaPlayer.__proto__ || Object.getPrototypeOf(MediaPlayer)).call(this, props));

		_this.state = {
			transformed: false,
			tagType: props.property.tagtype,
			carrier: null,
			data: {}
		};
		console.log(props);
		_this.handleClick = function (e) {
			return _this._handleClick(e);
		};
		return _this;
	}

	_createClass(MediaPlayer, [{
		key: '_handleClick',
		value: function _handleClick(e) {
			var that = this;
			if (!this.state.transformed) {
				_get__('getFileUrl')(this.props.property.fileid, this.state.tagType, _get__('getMappingData')()[this.state.tagType].tag).done(function (res) {
					console.log(res);
					that.state.carrier = _get__('getMappingData')(res[0].url)[that.state.tagType].template;
					that.setState({
						transformed: true,
						carrier: that.state.carrier
					});
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			console.log(this.state.carrier);
			if (this.state.tagType === 'HYPERLINK') {
				return _get__('React').createElement(
					'div',
					{ styleName: 'block' },
					_get__('React').createElement(
						'a',
						{ href: this.props.property.linkurl, target: '_blank' },
						_get__('React').createElement(
							'span',
							{ styleName: 'link' },
							this.props.property.linkurl
						),
						_get__('React').createElement(
							'div',
							{ styleName: 'linkBlock' },
							_get__('React').createElement('img', { src: this.props.property.src }),
							_get__('React').createElement(
								'div',
								{ styleName: 'info' },
								_get__('React').createElement(
									'h3',
									null,
									this.props.property.linktitle
								),
								_get__('React').createElement(
									'p',
									null,
									this.props.property.linkcontent
								)
							)
						)
					)
				);
			} else if (this.state.tagType === 'YOUTUBE') {
				return _get__('React').createElement(
					'div',
					{ styleName: 'block' },
					_get__('React').createElement(
						'a',
						{ href: this.props.property.url, target: '_blank' },
						this.props.property.url
					),
					_get__('React').createElement(
						'div',
						null,
						_get__('React').createElement('iframe', { width: '476', height: '267.5',
							src: 'http' + "//www.youtube.com/embed/" + this.props.property.file })
					)
				);
			} else {
				var blockStyle = this.state.transformed ? '' : this.state.tagType.toLowerCase();
				return _get__('React').createElement(
					'div',
					{ styleName: blockStyle + ' block', onClick: this.handleClick },
					this.state.transformed ? this.state.carrier : _get__('React').createElement('img', { src: this.props.property.src })
				);
			}
		}
	}]);

	return MediaPlayer;
}(_get__('Component'));

var _DefaultExportValue = _get__('CSSModules')(_get__('MediaPlayer'), _get__('style'), { allowMultiple: true });

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
		case 'getFileUrl':
			return _fileUpload.getFileUrl;

		case 'getMappingData':
			return getMappingData;

		case 'Component':
			return _react.Component;

		case 'CSSModules':
			return _reactCssModules2.default;

		case 'MediaPlayer':
			return MediaPlayer;

		case 'style':
			return _index2.default;

		case 'React':
			return _react2.default;

		case 'Player':
			return _player2.default;
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