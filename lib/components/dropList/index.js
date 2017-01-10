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

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownList = function (_Component) {
	_inherits(DropdownList, _Component);

	function DropdownList(props) {
		_classCallCheck(this, DropdownList);

		var _this = _possibleConstructorReturn(this, (DropdownList.__proto__ || Object.getPrototypeOf(DropdownList)).call(this, props));

		_this.state = {
			open: false,
			selected: props.defaultIndex || null
		};
		_this.toggleOpen = _this.toggleOpen.bind(_this);
		return _this;
	}

	_createClass(DropdownList, [{
		key: 'toggleOpen',
		value: function toggleOpen() {
			if (!this.props.disabled) {
				this.setState({
					open: !this.state.open
				});
			}
		}
	}, {
		key: 'onSelect',
		value: function onSelect(data, index) {

			this.setState({
				open: false,
				selected: index + 1
			});
			data.index = index + 1;

			var _props$onSelected = this.props.onSelected,
			    onSelected = _props$onSelected === undefined ? _.noop : _props$onSelected;

			onSelected(data);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var that = this;
			var status = '';
			if (this.props.disabled) status = 'disabled';else if (this.state.open) status = 'active';

			return _react2.default.createElement(
				'div',
				{ styleName: 'droplist', className: this.props.className },
				_react2.default.createElement(
					'div',
					{ onClick: this.toggleOpen.bind(this), className: 'Droplist_listInput', styleName: 'listInput ' + status, style: { width: this.props.width } },
					function () {
						if (_this2.state.selected) {
							var defaultSelect = _this2.props.listContent[_this2.state.selected - 1];
							if (defaultSelect.iconFont) return _react2.default.createElement(
								'div',
								{ style: { color: "#333" } },
								_react2.default.createElement('i', { className: "fa " + defaultSelect.iconFont, 'aria-hidden': 'true' }),
								defaultSelect.label
							);else return _react2.default.createElement(
								'span',
								{ style: { color: "#333" } },
								defaultSelect.label,
								' '
							);
						} else {
							return _this2.props.placeHolder;
						}
					}(),
					_react2.default.createElement('span', { 'aria-hidden': 'true', styleName: 'caret-down' })
				),
				this.state.open && _react2.default.createElement(
					_list2.default,
					{ type: this.state.posType,
						open: this.state.open,
						clickAway: this.toggleOpen,
						width: this.props.width },
					this.props.listContent.map(function (data, index) {
						var style = index === that.state.selected - 1 ? { background: '#def6ff' } : {};
						return _react2.default.createElement(
							'li',
							{ key: index,
								ref: "listItem" + index,
								onClick: that.onSelect.bind(that, data, index),
								style: style },
							typeof data.iconFont !== 'undefined' && _react2.default.createElement('i', { className: "fa " + data.iconFont, 'aria-hidden': 'true' }),
							data.label
						);
					})
				)
			);
		}
	}]);

	return DropdownList;
}(_react.Component);

DropdownList.defaultProps = {
	placeHolder: '請選擇',
	listContent: [],
	disabled: false
};
exports.default = (0, _reactCssModules2.default)(DropdownList, _style2.default, { allowMultiple: true });