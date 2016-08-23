'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _fileUpload = require('../../../utils/fileUpload.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomComponent = function (_Component) {
	_inherits(CustomComponent, _Component);

	function CustomComponent(props) {
		_classCallCheck(this, CustomComponent);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomComponent).call(this, props));

		var entity = _draftJs.Entity.get(props.block.getEntityAt(0));
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
			if (!this.state.props.src && this.state.props.fileId) {
				(0, _fileUpload.getFileUrl)(this.state.props.fileId).done(function (res) {
					that.state.props.src = res[0].url[0];
					that.setState({
						props: that.state.props
					});
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.state.props;
			var type = this.state.type;
			var that = this;

			if (!props.fakeSrc) props.fakeSrc = props.src;

			if (props.error) {
				/* 當error block出現之後隔5秒將其刪除 */
				setTimeout(function () {
					that.props.blockProps.onRequestRemove(that.props.block.getKey());
				}, 3000);

				return _react2.default.createElement(
					'div',
					{ styleName: 'block' },
					_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
					_react2.default.createElement(
						'div',
						{ styleName: 'loading-preset' },
						_react2.default.createElement('div', { styleName: 'play-icon error' }),
						_react2.default.createElement(
							'p',
							{ styleName: 'errorText' },
							'上傳發生錯誤，請重新上傳'
						)
					)
				);
			}

			if (props.linkError) {
				that.props.blockProps.onRequestRemove(that.props.block.getKey());
			}

			switch (type) {
				case 'IMAGE':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block', style: { 'textAlign': 'center' } },
						props.loading ? _react2.default.createElement(
							'div',
							{ styleName: 'mask-block loading' },
							_react2.default.createElement('img', { styleName: 'article-image', src: props.fakeSrc }),
							_react2.default.createElement('div', { styleName: 'loading' }),
							_react2.default.createElement('div', { styleName: 'mask' })
						) : _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement('img', { styleName: 'article-image', src: props.fakeSrc })
						)
					);
				case 'VIDEO':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						props.loading ? _react2.default.createElement(
							'div',
							{ styleName: 'loading-preset' },
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement('div', { styleName: 'play-icon video' }),
							_react2.default.createElement('div', { styleName: 'loader' })
						) : _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement('video', { controls: true, src: props.src })
						)
					);
				case 'AUDIO':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						props.loading ? _react2.default.createElement(
							'div',
							{ styleName: 'loading-preset audio' },
							_react2.default.createElement('div', { styleName: 'play-icon audio' }),
							_react2.default.createElement('div', { styleName: 'loader' })
						) : _react2.default.createElement(
							'div',
							{ styleName: 'mid-block' },
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement(
								'div',
								{ styleName: 'title' },
								props.name
							),
							_react2.default.createElement('audio', { controls: true, src: props.src })
						)
					);
				case 'DOCUMENT':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						props.loading ? _react2.default.createElement(
							'div',
							{ styleName: 'loading-preset document' },
							_react2.default.createElement('div', { styleName: 'play-icon document' }),
							_react2.default.createElement('div', { styleName: 'loader' })
						) : _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement(
								'div',
								{ styleName: 'loading-preset' },
								_react2.default.createElement('div', { styleName: 'play-icon document' }),
								_react2.default.createElement(
									'div',
									{ styleName: 'mid-title' },
									props.name
								)
							)
						)
					);
				case 'HYPERLINK':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
						_react2.default.createElement(
							'a',
							{ href: props.url, target: '_blank' },
							_react2.default.createElement(
								'span',
								{ styleName: 'link' },
								props.url
							),
							props.loading ? _react2.default.createElement(
								'div',
								{ styleName: 'linkLoading' },
								_react2.default.createElement('div', { styleName: 'loading' })
							) : _react2.default.createElement(
								'div',
								{ styleName: 'linkBlock' },
								_react2.default.createElement('img', { src: props.img.url }),
								_react2.default.createElement(
									'div',
									{ styleName: 'info' },
									_react2.default.createElement(
										'h3',
										null,
										props.title
									),
									_react2.default.createElement(
										'p',
										null,
										props.description
									),
									_react2.default.createElement(
										'span',
										{ styleName: 'tag104' },
										'plus.104.com.tw'
									)
								)
							)
						)
					);

				case 'YOUTUBE':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
						_react2.default.createElement(
							'a',
							{ href: props.url, target: '_blank' },
							props.url
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('iframe', { width: '476', height: '267.5',
								src: "https://www.youtube.com/embed/" + props.file })
						)
					);
				case 'LINK':
					return _react2.default.createElement(
						'a',
						{ href: props.url, target: '_blank' },
						props.url
					);
				default:
					return false;
			}
		}
	}]);

	return CustomComponent;
}(_react.Component);

;
exports.default = (0, _reactCssModules2.default)(CustomComponent, _style2.default, { allowMultiple: true });