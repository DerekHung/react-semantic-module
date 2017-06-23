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

var _reactRouter = require('react-router');

var _lang = require('lodash/lang');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this.state = {
            tabStack: [],
            currentTab: ''
        };
        _this.tabClick = function (e) {
            return _this._tabClick(e);
        };
        _this.mountTabs = _this.mountTabs.bind(_this);
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mountTabs(this.props.children);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var oldKeys = this.props.children.map(function (child) {
                return child.props.text;
            });
            var newKeys = nextProps.children.map(function (child) {
                return child.props.text;
            });
            if (!(0, _lang.isEqual)(oldKeys, newKeys)) {
                this.mountTabs(nextProps.children, 'staySameTab');
            }
        }
    }, {
        key: 'mountTabs',
        value: function mountTabs(childData, staySameTab) {
            var tabStack = [];
            _react2.default.Children.map(childData, function (child) {
                tabStack.push(child.props);
            });
            this.setState({
                tabStack: tabStack,
                currentTab: staySameTab ? this.state.currentTab : tabStack[0].name
            });
        }
    }, {
        key: '_tabClick',
        value: function _tabClick(e) {
            this.setState({
                currentTab: e.target.getAttribute('name')
            });
            if (this.props.onChange) this.props.onChange(this.state.currentTab, e.target.getAttribute('name'));
        }
    }, {
        key: 'render',
        value: function render() {
            var that = this;
            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                _react2.default.createElement(
                    'div',
                    { styleName: 'head-body', id: 'tab-component-head' },
                    this.state.tabStack && this.state.tabStack.map(function (item, index) {
                        var active = that.state.currentTab === item.name ? 'active' : '';
                        return _react2.default.createElement(
                            'div',
                            { styleName: "tab-head " + active,
                                style: { width: 100 / that.state.tabStack.length + '%' },
                                key: index,
                                onClick: that.tabClick,
                                name: item.name },
                            item.text || item.name
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { styleName: 'container', className: this.props.className, id: 'tab-component-body' },
                    _react2.default.Children.map(this.props.children, function (child) {
                        return _react2.default.cloneElement(child, {
                            currentTab: that.state.currentTab
                        });
                    })
                )
            );
        }
    }]);

    return Tabs;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(Tabs, _style2.default, { allowMultiple: true });