'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactCssModules2.default)(function (_ref) {
  var label = _ref.label,
      icon = _ref.icon,
      active = _ref.active,
      onToggle = _ref.onToggle,
      onLink = _ref.onLink,
      style = _ref.style;
  return _react2.default.createElement(
    'li',
    {
      styleName: "toolbar-icon " + (0, _classnames2.default)({ active: active }),
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        if (style === 'LINK') {
          onLink();
        } else onToggle(style);
      }
    },
    label ? label : _react2.default.createElement('i', { className: icon })
  );
}, _style2.default, { allowMultiple: true });