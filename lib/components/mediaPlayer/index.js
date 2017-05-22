'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
			template: _react2.default.createElement('video', { src: fileFromDocApiSrc[0], controls: true, autoPlay: 'autoplay' })
		},
		'AUDIO': {
			tag: [],
			template: _react2.default.createElement('audio', { src: fileFromDocApiSrc[0], controls: true })
		},
		'IMAGE': {
			tag: ['activityGrid'],
			template: _react2.default.createElement('img', { src: fileFromDocApiSrc[0] })
		},
		'DOCUMENT': {
			tag: ['activityPlay'],
			template: _react2.default.createElement(_player2.default, { src: fileFromDocApiSrc })
		}
	};

	return docApiMap;
};

var MediaPlayer = function (_Component) {
	_inherits(MediaPlayer, _Component);

	function MediaPlayer(props) {
		_classCallCheck(this, MediaPlayer);

		var _this = _possibleConstructorReturn(this, (MediaPlayer.__proto__ || Object.getPrototypeOf(MediaPlayer)).call(this, props));

		_this.state = {
			transformed: false,
			tagType: props.property.tagtype,
			carrier: null,
			hyperImgError: false,
			data: {}
		};
		_this.handleClick = function (e) {
			return _this._handleClick(e);
		};
		_this.hyperImgError = function (e) {
			return _this._hyperImgError(e);
		};
		return _this;
	}

	_createClass(MediaPlayer, [{
		key: '_handleClick',
		value: function _handleClick(e) {
			var that = this;
			if (!this.state.transformed) {
				(0, _fileUpload.getFileUrl)(this.props.property.fileid, this.state.tagType, getMappingData()[this.state.tagType].tag).done(function (res) {
					that.state.carrier = getMappingData(res[0].url)[that.state.tagType].template;
					that.setState({
						transformed: true,
						carrier: that.state.carrier
					});
				});
			}
		}
	}, {
		key: '_hyperImgError',
		value: function _hyperImgError(e) {
			this.setState({
				hyperImgError: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			if (typeof this.props.property.convertstatus !== 'undefined' && this.props.property.convertstatus !== '1') {
				return _react2.default.createElement(
					'div',
					{ styleName: 'loading-preset' },
					_react2.default.createElement('div', { styleName: 'loading' }),
					_react2.default.createElement(
						'p',
						{ styleName: 'handleText' },
						'\u6A94\u6848\u8655\u7406\u4E2D'
					)
				);
			} else if (this.state.tagType === 'HYPERLINK') {
				return _react2.default.createElement(
					'div',
					{ styleName: 'block' },
					_react2.default.createElement(
						'a',
						{ href: this.props.property.linkurl, target: '_blank' },
						_react2.default.createElement(
							'span',
							{ styleName: 'link' },
							this.props.property.linkurl
						),
						_react2.default.createElement(
							'div',
							{ styleName: 'linkBlock' },
							!this.state.hyperImgError && _react2.default.createElement('img', { src: this.props.property.src, onError: this.hyperImgError }),
							_react2.default.createElement(
								'div',
								{ styleName: 'info' },
								_react2.default.createElement(
									'h3',
									null,
									this.props.property.linktitle
								),
								_react2.default.createElement(
									'p',
									null,
									this.props.property.linkcontent
								)
							)
						)
					)
				);
			} else if (this.state.tagType === 'YOUTUBE') {
				return _react2.default.createElement(
					'div',
					{ styleName: 'block' },
					_react2.default.createElement(
						'a',
						{ href: this.props.property.url, target: '_blank' },
						this.props.property.url
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement('iframe', { width: '476', height: '267.5',
							src: 'http' + "://www.youtube.com/embed/" + this.props.property.file })
					)
				);
			} else {
				var blockStyle = this.state.transformed ? '' : this.state.tagType.toLowerCase();
				return _react2.default.createElement(
					'div',
					{ styleName: blockStyle + ' block', onClick: this.handleClick },
					this.state.transformed ? this.state.carrier : _react2.default.createElement('img', { src: this.props.property.src })
				);
			}
		}
	}]);

	return MediaPlayer;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(MediaPlayer, _index2.default, { allowMultiple: true });