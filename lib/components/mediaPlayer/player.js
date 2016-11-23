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

var _player = require('./player.css');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('jquery');

var Player = function (_get__2) {
    _inherits(Player, _get__2);

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
                _get__('$')(ele).width(_get__('$')(window).width());
                _get__('$')(ele).height(_get__('$')(window).height());
                _get__('$')(this.refs.playground).height(_get__('$')(window).height() - 50);
            } else {
                this.state.fullscreen = false;
                this.setState({ fullscreen: false });
                _get__('$')(ele).width("730px");
                _get__('$')(ele).height("480px");
                _get__('$')(this.refs.playground).height("89.6%");
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

            return _get__('React').createElement(
                'div',
                { ref: 'player', styleName: 'player', tabIndex: '1' },
                _get__('React').createElement(
                    'div',
                    { ref: 'playground', styleName: 'playground' },
                    this.state.loading && _get__('React').createElement('div', { styleName: 'loading', className: 'ui loading' }),
                    _get__('React').createElement('img', { ref: 'play_image' })
                ),
                _get__('React').createElement(
                    'div',
                    { styleName: 'controls' },
                    _get__('React').createElement(
                        'span',
                        { styleName: 'controls_item' },
                        _get__('React').createElement(
                            'span',
                            { styleName: 'direction' },
                            _get__('React').createElement('i', { onClick: function onClick(e) {
                                    return _this2.previous(e);
                                }, className: 'icon left_arrow' })
                        ),
                        _get__('React').createElement(
                            'span',
                            { styleName: 'count' },
                            _get__('React').createElement('input', { value: this.state.currentIndex + 1, onChange: function onChange(e) {
                                    return _this2.jump(e);
                                } }),
                            '/',
                            this.state.imagesCount
                        ),
                        _get__('React').createElement(
                            'span',
                            { styleName: 'direction' },
                            _get__('React').createElement('i', { onClick: function onClick(e) {
                                    return _this2.next(e);
                                }, className: 'icon right_arrow' })
                        )
                    ),
                    _get__('React').createElement(
                        'span',
                        { styleName: 'fullscreen' },
                        !this.state.fullscreen && _get__('React').createElement('i', { onClick: function onClick() {
                                return _this2.fullscreen();
                            }, className: 'icon maximize' }),
                        this.state.fullscreen && _get__('React').createElement('i', { onClick: function onClick() {
                                return _this2.fullscreen();
                            }, className: 'zoom icon' })
                    )
                )
            );
        }
    }]);

    return Player;
}(_get__('Component'));

var PlayerCss = _get__('CSSModules')(_get__('Player'), _get__('css'), { allowMultiple: true });

exports.default = _get__('PlayerCss');

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
        case '$':
            return $;

        case 'Component':
            return _react.Component;

        case 'CSSModules':
            return _reactCssModules2.default;

        case 'Player':
            return Player;

        case 'css':
            return _player2.default;

        case 'PlayerCss':
            return PlayerCss;

        case 'React':
            return _react2.default;
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

var _typeOfOriginalExport = typeof PlayerCss === 'undefined' ? 'undefined' : _typeof(PlayerCss);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(PlayerCss, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(PlayerCss)) {
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