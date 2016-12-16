'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_Component) {
    _inherits(Tab, _Component);

    function Tab(props) {
        _classCallCheck(this, Tab);

        var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

        _this.flag = false;
        return _this;
    }

    _createClass(Tab, [{
        key: 'componentWillUnMount',
        value: function componentWillUnMount() {
            console.log(this.props.name + 'unmount');
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props);
            if (this.props.name === this.props.currentTab) this.flag = true;
            var componentShouldMount = this.props.name === this.props.currentTab || this.flag;
            var componentStyle = this.props.name === this.props.currentTab ? { display: 'block' } : { display: 'none' };
            return _react2.default.createElement(
                'div',
                { style: componentStyle },
                componentShouldMount && this.props.children
            );
        }
    }]);

    return Tab;
}(_react.Component);

Tab.defaultProps = {};
exports.default = (0, _reactCssModules2.default)(Tab, _style2.default, { allowMultiple: true });