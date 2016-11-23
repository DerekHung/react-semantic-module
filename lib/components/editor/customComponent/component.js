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

var _template = require('./template.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
上層傳來的props有幾個主要的key : fakeSrc / src  / snap
1. 有 fakeSrc => 

*/
var CustomComponent = function (_Component) {
	_inherits(CustomComponent, _Component);

	function CustomComponent(props) {
		_classCallCheck(this, CustomComponent);

		var _this = _possibleConstructorReturn(this, (CustomComponent.__proto__ || Object.getPrototypeOf(CustomComponent)).call(this, props));

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
			/*if( !this.state.props.src && this.state.props.fileId ) {
   	getFileUrl(this.state.props.fileId).done(function(res){
   		that.state.props.src = res[0].url[0];
   		that.setState({
   			props: that.state.props
   		});
   	})
   }*/
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.state.props;
			var type = this.state.type;
			var that = this;

			//if( !props.fakeSrc ) props.fakeSrc = props.src;

			if (props.error) {
				/* 當error block出現之後隔5秒將其刪除 */
				setTimeout(function () {
					that.props.blockProps.onRequestRemove(that.props.block.getKey());
				}, 5000);

				return _react2.default.createElement(_template.ErrorBlock, { parent: this });
			}

			if (props.loading) {
				return _react2.default.createElement(_template.LoadingBlock, { parent: this });
			}

			if (props.linkError) {
				that.props.blockProps.onRequestRemove(that.props.block.getKey());
				return false;
			}

			switch (type) {
				case 'IMAGE':
					return _react2.default.createElement(_template.ImgBlock, { parent: this, props: props });
				case 'VIDEO':
					return _react2.default.createElement(_template.VideoBlock, { parent: this, props: props });
				case 'AUDIO':
					return _react2.default.createElement(_template.AudioBlock, { parent: this, props: props });
				case 'DOCUMENT':
					return _react2.default.createElement(_template.DocumentBlock, { parent: this, props: props });
				case 'HYPERLINK':
					return _react2.default.createElement(_template.HyperLinkBlock, { parent: this, props: props });
				case 'YOUTUBE':
					return _react2.default.createElement(_template.YoutubeBlock, { parent: this, props: props });
				case 'LINK':
					return _react2.default.createElement(_template.LinkBlock, { parent: this, props: props });
				default:
					return false;
			}
		}
	}]);

	return CustomComponent;
}(_react.Component);

;
exports.default = (0, _reactCssModules2.default)(CustomComponent, _style2.default, { allowMultiple: true });