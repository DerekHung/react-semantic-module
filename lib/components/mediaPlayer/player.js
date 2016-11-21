'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _player = require('./player.css');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('jquery');

var Player = function (_Component) {
    _inherits(Player, _Component);

    function Player(props) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

        _this.state = {};
        _this.state.images = props.src;
        _this.state.currentIndex = props.index || 0;
        _this.state.imagesCount = _this.state.images.length;
        _this.state.loading = true;
        _this.state.fullscreen = false;
        _this.handleKeydown = _this.handleKeydown.bind(_this);
        _this.fullscreenChange = _this.fullscreenChange.bind(_this);
        return _this;
    }

    _createClass(Player, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.play_image.onload = this.imgLoad.bind(this);
            this.refs.play_image.src = this.state.images[this.state.currentIndex];
            this.refs.player.addEventListener('keydown', this.handleKeydown);
            if (document.addEventListener) {
                document.addEventListener('webkitfullscreenchange', this.fullscreenChange, false);
                document.addEventListener('mozfullscreenchange', this.fullscreenChange, false);
                document.addEventListener('fullscreenchange', this.fullscreenChange, false);
                document.addEventListener('MSFullscreenChange', this.fullscreenChange, false);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.player.removeEventListener('keydown', this.handleKeydown);
        }
    }, {
        key: 'imgLoad',
        value: function imgLoad() {
            this.state.loading = false;
            this.setState({ loading: false });
        }
    }, {
        key: 'handleKeydown',
        value: function handleKeydown(e) {
            switch (e.keyCode) {
                case 37:
                    //left
                    this.previous();
                    break;
                case 39:
                    //right
                    this.next();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'previous',
        value: function previous() {
            this.state.loading = true;
            this.state.currentIndex--;
            if (this.state.currentIndex < 0) {
                this.state.currentIndex = this.state.imagesCount - 1;
            }
            this.refs.play_image.src = this.state.images[this.state.currentIndex];
            this.setState({ currentIndex: this.state.currentIndex, loading: true });
        }
    }, {
        key: 'next',
        value: function next() {
            this.state.loading = true;
            this.state.currentIndex++;
            if (this.state.currentIndex > this.state.imagesCount - 1) {
                this.state.currentIndex = 0;
            }
            this.refs.play_image.src = this.state.images[this.state.currentIndex];
            this.setState({ currentIndex: this.state.currentIndex, loading: true });
        }
    }, {
        key: 'jump',
        value: function jump(e) {
            try {
                this.state.loading = true;
                this.state.currentIndex = parseInt(e.target.value) - 1;
                if (this.state.currentIndex > this.state.imagesCount - 1) {
                    this.state.currentIndex = 0;
                }
                if (this.state.currentIndex < 0) {
                    this.state.currentIndex = this.state.imagesCount;
                }
                this.refs.play_image.src = this.state.images[this.state.currentIndex];
                this.setState({ currentIndex: this.state.currentIndex, loading: true });
            } catch (err) {}
        }
    }, {
        key: 'fullscreenChange',
        value: function fullscreenChange() {
            var ele = this.refs.player;
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                this.state.fullscreen = true;
                this.setState({ fullscreen: true });
                $(ele).width($(window).width());
                $(ele).height($(window).height());
                $(this.refs.playground).height($(window).height() - 50);
            } else {
                this.state.fullscreen = false;
                this.setState({ fullscreen: false });
                $(ele).width("730px");
                $(ele).height("480px");
                $(this.refs.playground).height("89.6%");
            }
        }
    }, {
        key: 'fullscreen',
        value: function fullscreen() {
            var ele = this.refs.player;
            if (this.state.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (ele.requestFullscreen) {
                    ele.requestFullscreen();
                } else if (ele.webkitRequestFullscreen) {
                    ele.webkitRequestFullscreen();
                } else if (ele.mozRequestFullScreen) {
                    ele.mozRequestFullScreen();
                } else if (ele.msRequestFullscreen) {
                    ele.msRequestFullscreen();
                } else {
                    console.log('Fullscreen API is not supported.');
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { ref: 'player', styleName: 'player', tabIndex: '1' },
                _react2.default.createElement(
                    'div',
                    { ref: 'playground', styleName: 'playground' },
                    this.state.loading && _react2.default.createElement('div', { styleName: 'loading', className: 'ui loading' }),
                    _react2.default.createElement('img', { ref: 'play_image' })
                ),
                _react2.default.createElement(
                    'div',
                    { styleName: 'controls' },
                    _react2.default.createElement(
                        'span',
                        { styleName: 'controls_item' },
                        _react2.default.createElement(
                            'span',
                            { styleName: 'direction' },
                            _react2.default.createElement('i', { onClick: function onClick(e) {
                                    return _this2.previous(e);
                                }, className: 'icon left_arrow' })
                        ),
                        _react2.default.createElement(
                            'span',
                            { styleName: 'count' },
                            _react2.default.createElement('input', { value: this.state.currentIndex + 1, onChange: function onChange(e) {
                                    return _this2.jump(e);
                                } }),
                            '/',
                            this.state.imagesCount
                        ),
                        _react2.default.createElement(
                            'span',
                            { styleName: 'direction' },
                            _react2.default.createElement('i', { onClick: function onClick(e) {
                                    return _this2.next(e);
                                }, className: 'icon right_arrow' })
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { styleName: 'fullscreen' },
                        !this.state.fullscreen && _react2.default.createElement('i', { onClick: function onClick() {
                                return _this2.fullscreen();
                            }, className: 'icon maximize' }),
                        this.state.fullscreen && _react2.default.createElement('i', { onClick: function onClick() {
                                return _this2.fullscreen();
                            }, className: 'zoom icon' })
                    )
                )
            );
        }
    }]);

    return Player;
}(_react.Component);

var PlayerCss = (0, _reactCssModules2.default)(Player, _player2.default, { allowMultiple: true });

exports.default = PlayerCss;