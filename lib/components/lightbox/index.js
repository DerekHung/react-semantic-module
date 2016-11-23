'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _overlay = require('../../utils/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _windowScroll = require('../../utils/windowScroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lightbox = function (_get__2) {
    _inherits(Lightbox, _get__2);

    function Lightbox() {
        _classCallCheck(this, Lightbox);

        return _possibleConstructorReturn(this, (Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).apply(this, arguments));
    }

    _createClass(Lightbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get__('disableDocScroll')();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _get__('enableDocScroll')();
        }
    }, {
        key: 'handleClose',
        value: function handleClose(type) {
            console.log(type);
            if (type === 'overlay' && this.props.clickOverlayToClose === false) {} else {
                if (this.props.onClose) this.props.onClose();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var contentPadding = '0 10px',
                contentHeight = 'auto';
            if (this.props.option.contentHeight) {
                contentHeight = this.props.option.contentHeight;
            }
            var _props$option$submit = this.props.option.submit;
            var text = _props$option$submit.text;
            var action = _props$option$submit.action;

            var gtm = _objectWithoutProperties(_props$option$submit, ['text', 'action']);

            return _get__('React').createElement(
                'div',
                { styleName: 'container' },
                _get__('React').createElement(_get__('Overlay'), {
                    onRequestClose: this.handleClose.bind(this, 'overlay'),
                    styleName: 'overlay' }),
                _get__('React').createElement(
                    'div',
                    { styleName: 'lightbox', className: this.props.className },
                    this.props.option.title && _get__('React').createElement(
                        'div',
                        { styleName: 'title' },
                        this.props.option.title
                    ),
                    _get__('React').createElement(
                        'div',
                        { styleName: 'content', style: { padding: contentPadding, maxHeight: contentHeight } },
                        this.props.children,
                        this.props.option.submit && _get__('React').createElement(
                            'button',
                            _extends({ onClick: this.props.option.submit.action }, gtm, { styleName: 'submit' }),
                            this.props.option.submit.text
                        ),
                        this.props.option.cancel && _get__('React').createElement(
                            'button',
                            { onClick: this.handleClose.bind(this, 'cancel') },
                            this.props.option.cancel.text
                        )
                    ),
                    this.props.option.closeIcon && _get__('React').createElement('div', { styleName: 'close', onClick: this.handleClose.bind(this, 'closeIcon') })
                )
            );
        }
    }]);

    return Lightbox;
}(_get__('Component'));

_get__('Lightbox').defaultProps = {
    onClose: function onClose() {
        console.log("you should have onClose props declartion on your component ! ");
    }
};

var _DefaultExportValue = _get__('CSSModules')(_get__('Lightbox'), _get__('style'), { allowMultiple: true });

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
        case 'disableDocScroll':
            return _windowScroll.disableDocScroll;

        case 'enableDocScroll':
            return _windowScroll.enableDocScroll;

        case 'Component':
            return _react.Component;

        case 'Lightbox':
            return Lightbox;

        case 'CSSModules':
            return _reactCssModules2.default;

        case 'style':
            return _style2.default;

        case 'React':
            return _react2.default;

        case 'Overlay':
            return _overlay2.default;
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