'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var Lightbox = function (_Component) {
    _inherits(Lightbox, _Component);

    function Lightbox() {
        _classCallCheck(this, Lightbox);

        return _possibleConstructorReturn(this, (Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).apply(this, arguments));
    }

    _createClass(Lightbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _windowScroll.disableDocScroll)();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _windowScroll.enableDocScroll)();
        }
    }, {
        key: 'handleClose',
        value: function handleClose(type, e) {
            if (type === 'overlay' && this.props.clickOverlayToClose === false) {} else {
                if (this.props.onClose) this.props.onClose(e);
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
            if (this.props.option.submit) {
                var _props$option$submit = this.props.option.submit,
                    text = _props$option$submit.text,
                    action = _props$option$submit.action,
                    gtm = _objectWithoutProperties(_props$option$submit, ['text', 'action']);
            }

            return _react2.default.createElement(
                'div',
                { styleName: 'container' },
                _react2.default.createElement(_overlay2.default, {
                    onRequestClose: this.handleClose.bind(this, 'overlay'),
                    styleName: 'overlay' }),
                _react2.default.createElement(
                    'div',
                    { styleName: 'lightbox', className: this.props.className },
                    this.props.option.title && _react2.default.createElement(
                        'div',
                        { styleName: 'title' },
                        this.props.option.title
                    ),
                    _react2.default.createElement(
                        'div',
                        { styleName: 'content', style: { padding: contentPadding, maxHeight: contentHeight } },
                        this.props.children,
                        this.props.option.submit && _react2.default.createElement(
                            'button',
                            _extends({ onClick: this.props.option.submit.action }, gtm, { styleName: 'submit' }),
                            this.props.option.submit.text
                        ),
                        this.props.option.cancel && _react2.default.createElement(
                            'button',
                            { onClick: this.handleClose.bind(this, 'cancel') },
                            this.props.option.cancel.text
                        )
                    ),
                    this.props.option.closeIcon && _react2.default.createElement('div', { styleName: 'close', onClick: this.handleClose.bind(this, 'closeIcon') })
                )
            );
        }
    }]);

    return Lightbox;
}(_react.Component);

Lightbox.defaultProps = {
    onClose: function onClose() {
        console.log("you should have onClose props declartion on your component ! ");
    }
};
exports.default = (0, _reactCssModules2.default)(Lightbox, _style2.default, { allowMultiple: true });