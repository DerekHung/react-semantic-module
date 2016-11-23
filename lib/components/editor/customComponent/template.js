'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = exports.LoadingBlock = exports.YoutubeBlock = exports.LinkBlock = exports.HyperLinkBlock = exports.DocumentBlock = exports.AudioBlock = exports.VideoBlock = exports.ImgBlock = exports.ErrorBlock = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingBlock = _get__('CSSModules')(function (parent) {

    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _get__('React').createElement(
        'div',
        { styleName: 'loading-preset' },
        _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
        _get__('React').createElement('div', { styleName: 'play-icon video' }),
        _get__('React').createElement('div', { styleName: 'loader' })
    );
}, _get__('style'), { allowMultiple: true });

var ErrorBlock = _get__('CSSModules')(function (parent) {
    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _get__('React').createElement(
        'div',
        { styleName: 'block' },
        _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
        _get__('React').createElement(
            'div',
            { styleName: 'loading-preset' },
            _get__('React').createElement('div', { styleName: 'play-icon error' }),
            _get__('React').createElement(
                'p',
                { styleName: 'errorText' },
                '\u4E0A\u50B3\u767C\u751F\u932F\u8AA4\uFF0C\u8ACB\u91CD\u65B0\u4E0A\u50B3'
            )
        )
    );
}, _get__('style'), { allowMultiple: true });

var ProcessingBlock = _get__('CSSModules')(function (parent) {

    return _get__('React').createElement(
        'div',
        { styleName: 'block' },
        _get__('React').createElement(
            'div',
            { styleName: 'loading-preset' },
            _get__('React').createElement('div', { styleName: 'play-icon process' }),
            _get__('React').createElement(
                'p',
                { styleName: 'errorText' },
                '\u6A94\u6848\u4ECD\u5728\u8655\u7406\u4E2D'
            )
        )
    );
}, _get__('style'), { allowMultiple: true });

var ImgBlock = _get__('CSSModules')(function (_ref) {
    var parent = _ref.parent;
    var props = _ref.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _get__('React').createElement(
        'div',
        { styleName: 'block', style: { 'textAlign': 'center' } },
        props.loading ? _get__('React').createElement(
            'div',
            { styleName: 'mask-block loading' },
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            _get__('React').createElement('img', { styleName: 'article-image', src: props.src }),
            _get__('React').createElement('div', { styleName: 'loading' }),
            _get__('React').createElement('div', { styleName: 'mask' })
        ) : _get__('React').createElement(
            'div',
            null,
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            _get__('React').createElement('img', { styleName: 'article-image', src: props.src })
        )
    );
}, _get__('style'), { allowMultiple: true });

var VideoBlock = _get__('CSSModules')(function (_ref2) {
    var parent = _ref2.parent;
    var props = _ref2.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _get__('React').createElement(
        'div',
        { styleName: 'block' },
        props.loading ? _get__('React').createElement(
            'div',
            { styleName: 'loading-preset' },
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            _get__('React').createElement('div', { styleName: 'play-icon video' }),
            _get__('React').createElement('div', { styleName: 'loader' })
        ) : _get__('React').createElement(
            'div',
            null,
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            props.poster ? _get__('React').createElement(
                'div',
                { styleName: 'loading-preset', style: { background: 'url(' + props.poster + ') no-repeat center ' } },
                _get__('React').createElement('div', { styleName: 'play-icon video' }),
                _get__('React').createElement('img', { src: props.poster })
            ) : _get__('React').createElement('video', { controls: true, src: props.src })
        )
    );
}, _get__('style'), { allowMultiple: true });

var AudioBlock = _get__('CSSModules')(function (_ref3) {
    var parent = _ref3.parent;
    var props = _ref3.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _get__('React').createElement(
        'div',
        { styleName: 'block' },
        props.loading ? _get__('React').createElement(
            'div',
            { styleName: 'loading-preset audio' },
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            _get__('React').createElement('div', { styleName: 'play-icon audio' }),
            _get__('React').createElement('div', { styleName: 'loader' })
        ) : _get__('React').createElement(
            'div',
            { styleName: 'mid-block' },
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            _get__('React').createElement(
                'div',
                { styleName: 'title' },
                props.name
            ),
            _get__('React').createElement('audio', { controls: true, src: props.src })
        )
    );
}, _get__('style'), { allowMultiple: true });

var DocumentBlock = _get__('CSSModules')(function (_ref4) {
    var parent = _ref4.parent;
    var props = _ref4.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _get__('React').createElement(
        'div',
        { styleName: 'block' },
        props.loading ? _get__('React').createElement(
            'div',
            { styleName: 'loading-preset document' },
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            _get__('React').createElement('div', { styleName: 'play-icon document' }),
            _get__('React').createElement('div', { styleName: 'loader' })
        ) : _get__('React').createElement(
            'div',
            null,
            _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
            _get__('React').createElement(
                'div',
                { styleName: 'loading-preset', style: { background: 'url(' + props.src + ') no-repeat center' } },
                _get__('React').createElement('div', { styleName: 'play-icon document' }),
                _get__('React').createElement(
                    'div',
                    { styleName: 'mid-title' },
                    props.name
                )
            )
        )
    );
}, _get__('style'), { allowMultiple: true });

var YoutubeBlock = _get__('CSSModules')(function (_ref5) {
    var parent = _ref5.parent;
    var props = _ref5.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _get__('React').createElement(
        'div',
        { styleName: 'block' },
        _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
        _get__('React').createElement(
            'a',
            { href: props.url, target: '_blank' },
            props.url
        ),
        _get__('React').createElement(
            'div',
            null,
            _get__('React').createElement('iframe', { width: '476', height: '267.5',
                src: location.protocol + "//www.youtube.com/embed/" + props.file })
        )
    );
}, _get__('style'), { allowMultiple: true });

var HyperLinkBlock = _get__('CSSModules')(function (_ref6) {
    var parent = _ref6.parent;
    var props = _ref6.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };
    console.log(props);
    if (!props.img) props.img = {};

    return _get__('React').createElement(
        'div',
        { styleName: 'block' },
        _get__('React').createElement('div', { styleName: 'close', onClick: removeBlock }),
        _get__('React').createElement(
            'a',
            { href: props.url, target: '_blank' },
            _get__('React').createElement(
                'span',
                { styleName: 'link' },
                props.url
            ),
            _get__('React').createElement(
                'div',
                { styleName: 'linkBlock' },
                _get__('React').createElement('img', { src: props.img.url }),
                _get__('React').createElement(
                    'div',
                    { styleName: 'info' },
                    _get__('React').createElement(
                        'h3',
                        null,
                        props.title
                    ),
                    _get__('React').createElement(
                        'p',
                        null,
                        props.description
                    ),
                    _get__('React').createElement(
                        'span',
                        { styleName: 'tag104' },
                        'plus.104.com.tw'
                    )
                )
            )
        )
    );
}, _get__('style'), { allowMultiple: true });

var LinkBlock = _get__('CSSModules')(function (_ref7) {
    var parent = _ref7.parent;
    var props = _ref7.props;


    return _get__('React').createElement(
        'a',
        { href: props.url, target: '_blank' },
        props.url
    );
}, _get__('style'), { allowMultiple: true });

exports.ErrorBlock = ErrorBlock;
exports.ImgBlock = ImgBlock;
exports.VideoBlock = VideoBlock;
exports.AudioBlock = AudioBlock;
exports.DocumentBlock = DocumentBlock;
exports.HyperLinkBlock = HyperLinkBlock;
exports.LinkBlock = LinkBlock;
exports.YoutubeBlock = YoutubeBlock;
exports.LoadingBlock = LoadingBlock;

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

        case 'style':
            return _style2.default;

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

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
exports.default = _RewireAPI__;