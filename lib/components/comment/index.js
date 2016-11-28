'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentEditor = function (_Component) {
    _inherits(CommentEditor, _Component);

    function CommentEditor(props) {
        _classCallCheck(this, CommentEditor);

        var _this = _possibleConstructorReturn(this, (CommentEditor.__proto__ || Object.getPrototypeOf(CommentEditor)).call(this, props));

        _this.state = {
            editorState: _draftJs.EditorState.createEmpty(),
            suggestions: props.mentions
        };
        _this.mentionPlugin = (0, _draftJsMentionPlugin2.default)({ theme: _style2.default });
        _this.plugins = [_this.mentionPlugin];

        _this.onChange = function (editorState) {
            if (props.onChange) props.onChange(editorState.getCurrentContent());
            _this.setState({
                editorState: editorState
            });
        };

        _this.onSearchChange = function (_ref) {
            var value = _ref.value;

            _this.setState({
                suggestions: (0, _draftJsMentionPlugin.defaultSuggestionsFilter)(value, _this.props.mentions)
            });
        };

        _this.onAddMention = function () {
            // get the mention object selected
        };

        _this.focus = function () {
            _this.editor.focus();
        };
        return _this;
    }

    _createClass(CommentEditor, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var MentionSuggestions = this.mentionPlugin.MentionSuggestions;

            return _react2.default.createElement(
                'div',
                { styleName: 'editor', onClick: this.focus },
                _react2.default.createElement(_draftJsPluginsEditor2.default, {
                    editorState: this.state.editorState,
                    onChange: this.onChange,
                    plugins: this.plugins,
                    ref: function ref(element) {
                        _this2.editor = element;
                    }
                }),
                _react2.default.createElement(MentionSuggestions, {
                    onSearchChange: this.onSearchChange,
                    suggestions: this.state.suggestions
                })
            );
        }
    }]);

    return CommentEditor;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(CommentEditor, _style2.default, { allowMultiple: true });