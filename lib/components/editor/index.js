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

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

var _link = require('./decorator/link.js');

var _link2 = _interopRequireDefault(_link);

var _plugin = require('draft-js-mention-plugin/lib/plugin.css');

var _plugin2 = _interopRequireDefault(_plugin);

var _draftJs = require('draft-js');

var _selection = require('../../utils/selection.js');

var _SideToolbar = require('./SideToolbar');

var _SideToolbar2 = _interopRequireDefault(_SideToolbar);

var _InlineToolbar = require('./InlineToolbar');

var _InlineToolbar2 = _interopRequireDefault(_InlineToolbar);

var _component = require('./customComponent/component.js');

var _component2 = _interopRequireDefault(_component);

var _fileUpload = require('../../utils/fileUpload.js');

var _insertUtils = require('./insertUtils.js');

var _insertUtils2 = _interopRequireDefault(_insertUtils);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mentionPlugin = (0, _draftJsMentionPlugin2.default)({ theme: _style2.default });
var LinkPlugin = (0, _link2.default)();
var plugins = [mentionPlugin, LinkPlugin];

var RichEditor = function (_Component) {
	_inherits(RichEditor, _Component);

	function RichEditor(props) {
		_classCallCheck(this, RichEditor);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RichEditor).call(this, props));

		var editorState = null;

		if (props.editorState) {
			editorState = props.editorState;
		} else if (props.content) {
			var blocks = (0, _draftJs.convertFromRaw)(props.content);
			_this.propsContent = props.content;
			editorState = _draftJs.EditorState.createWithContent(blocks);
		} else {
			editorState = _draftJs.EditorState.createEmpty();
		}

		_this.uploadingArr = {};
		_this.fileSystemObject = {};

		_this.state = {
			editorState: editorState,
			inlineToolbar: { show: false },
			suggestions: _this.props.mentions
		};
		/* Editor onChange event (core render method) */
		_this.onChange = function (editorState, callback) {
			_this.setState({ editorState: editorState });
			if (props.onChange) props.onChange(editorState.getCurrentContent());
			setTimeout(_this.updateSelection, 0);
			if (typeof callback === 'function') callback();
		};
		/* Editor component public method */
		_this.focus = function () {
			return _this.refs.editor.focus();
		};
		_this.blur = function () {
			return _this.refs.editor.blur();
		};
		_this.log = function () {
			var content = _this.state.editorState.getCurrentContent();
		};
		_this.getFileUploadObject = function () {
			return Object.assign({}, _this.fileSystemObject);
		};

		_this.updateSelection = function () {
			return _this._updateSelection();
		};
		_this.handleKeyCommand = function (command) {
			return _this._handleKeyCommand(command);
		};
		_this.toggleBlockType = function (type) {
			return _this._toggleBlockType(type);
		};
		_this.toggleInlineStyle = function (style) {
			return _this._toggleInlineStyle(style);
		};

		_this.onLinkKeyDown = function (e) {
			return _this._onLinkKeyDown(e);
		};
		_this.insertBlockComponent = function (type, data) {
			return _this._insertBlockComponent(type, data);
		};
		_this.insertImage = function (file) {
			return _this._insertImage(file);
		};
		_this.blockRenderer = function (block) {
			return _this._blockRenderer(block);
		};
		_this.blockStyler = function (block) {
			if (block.getType() === 'unstyled') {
				return 'paragraph';
			}
			return null;
		};
		_this.cleanInput = function () {
			_this.refs.fileInput.value = null;
		};
		_this.handlePaste = function (text) {
			return _this._handlePaste(text);
		};
		_this.onSearchChange = function (_ref) {
			var value = _ref.value;
			return _this._onSearchChange({ value: value });
		};

		_this.onTriggerUpload = function (e) {};
		_this.getFileInfo = function (file) {
			return _this._handleFileInput(file);
		};
		_this._handleFileInput = function (file) {

			file = Object.assign({}, file);

			var props = {
				loading: true,
				fakeSrc: URL.createObjectURL(file.originFile),
				id: file.id
			};

			if (file.type === 'AUDIO' || file.type === 'DOCUMENT') props.name = file.name;

			_this.fileSystemObject[file.id] = {
				fileData: file,
				fileProps: props,
				fileId: null,
				generator: _this._insertAsyncBlockComponent(file.id)
			};

			_this.fileSystemObject[file.id].generator.next();
		};
		_this.getSignatureDone = function (file) {

			if (typeof _this.fileSystemObject[file.id] !== 'undefined') {
				_this.fileSystemObject[file.id].fileData = file;
				_this.fileSystemObject[file.id].generator.next(file.signature.fileId);
			}
		};
		_this.uploadToS3Done = function (file) {

			if (typeof _this.fileSystemObject[file.id] !== 'undefined') {
				_this.fileSystemObject[file.id].fileData = file;
				_this.fileSystemObject[file.id].generator.next(file);
			}
		};
		_this._insertAsyncBlockComponent = regeneratorRuntime.mark(function _callee(id) {
			var _fileSystemObject$id, fileData, fileProps, entityKey;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_fileSystemObject$id = this.fileSystemObject[id];
							fileData = _fileSystemObject$id.fileData;
							fileProps = _fileSystemObject$id.fileProps;
							entityKey = this._insertBlockComponent(null, fileData.type, fileProps);


							this.fileSystemObject[id].entityKey = entityKey;
							_context.next = 7;
							return "get fileId";

						case 7:
							this.fileSystemObject[id].fileId = _context.sent;
							_context.next = 10;
							return "uploadDone";

						case 10:

							fileProps.loading = false;
							fileProps.src = fileProps.fakeSrc;
							fileProps.fileId = this.fileSystemObject[id].fileId;

							this._insertBlockComponent(entityKey, fileData.type, fileProps);

							/*
       				}).fail(function(error){
       
       					props.error = true;
       
       					that._insertBlockComponent(entityKey, type, props);
       					
       					that.setLoadingState(that.uploading - 1);
       
       				})
       */

						case 14:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		});
		return _this;
	}

	/* Draft js block render function*/


	_createClass(RichEditor, [{
		key: '_blockRenderer',
		value: function _blockRenderer(block) {
			var type = block.getType();
			var that = this;
			if (type === 'atomic') {
				return {
					component: _component2.default,
					editable: false,
					props: {
						onRequestRemove: function onRequestRemove(blockKey, id) {
							that._removeBlock(blockKey, id);
						}
					}
				};
			}
		}

		/* handle inlineToolbar position and if show */

	}, {
		key: '_updateSelection',
		value: function _updateSelection() {
			if (typeof window !== 'undefined') {
				var selectionRange = (0, _selection.getSelectionRange)(window);
				var popoverControlVisible = false,
				    popoverControlTop = null,
				    popoverControlLeft = null,
				    selectedBlock = void 0;
				if (selectionRange) {
					var rangeBounds = selectionRange.getBoundingClientRect();
					selectedBlock = (0, _selection.getSelectedBlockElement)(selectionRange);
					if (selectedBlock && !selectionRange.collapsed) {
						popoverControlVisible = true;
						popoverControlTop = (0, _selection.getSelectionCoords)(selectionRange).offsetTop;
						popoverControlLeft = (0, _selection.getSelectionCoords)(selectionRange).offsetLeft;
						this.tempTop = popoverControlTop;
						this.tempLeft = popoverControlLeft;
					} else if (selectionRange.startContainer.id === 'toolbar-icon') {
						popoverControlVisible = true;
						popoverControlTop = this.tempTop;
						popoverControlLeft = this.tempLeft;
					}
				}

				this.setState({
					selectedBlock: selectedBlock,
					inlineToolbar: {
						show: popoverControlVisible,
						position: {
							top: popoverControlTop,
							left: popoverControlLeft
						}
					}
				});
			}
		}
	}, {
		key: '_handleKeyCommand',
		value: function _handleKeyCommand(command) {
			var editorState = this.state.editorState;

			if (command === 'backspace') {
				var selection = editorState.getSelection();
				var content = editorState.getCurrentContent();
				var startKey = selection.getStartKey();
				var blockBefore = content.getBlockBefore(startKey);

				if (blockBefore && blockBefore.getType() === 'atomic') {
					for (var key in this.fileSystemObject) {

						if (this.fileSystemObject[key].entityKey === blockBefore.getEntityAt(0)) {
							delete this.fileSystemObject[key];
							break;
						}
					}
				}
			}
			var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				this.onChange(newState);
				return true;
			}
			return false;
		}
	}, {
		key: '_toggleBlockType',
		value: function _toggleBlockType(blockType) {
			this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
		}
	}, {
		key: '_toggleInlineStyle',
		value: function _toggleInlineStyle(inlineStyle) {
			this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
		}
	}, {
		key: '_onLinkKeyDown',
		value: function _onLinkKeyDown(value) {

			var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: value });
			var that = this;

			this.onChange(_draftJs.RichUtils.toggleLink(this.state.editorState, this.state.editorState.getSelection(), entityKey), function () {
				that.setState({
					inlineToolbar: { show: false }
				});
				setTimeout(function () {
					return that.refs.editor.focus();
				}, 0);
			});
		}
	}, {
		key: '_insertTextBlock',
		value: function _insertTextBlock() {
			var blockArray = this.state.editorState.getCurrentContent().getBlocksAsArray();
		}
	}, {
		key: '_insertBlockComponent',
		value: function _insertBlockComponent(entityKey, type, props, mutablity) {
			var currentSelection = this.state.editorState.getSelection();
			var newState = null;

			if (entityKey) {
				var selection = currentSelection.set('hasFocus', false);
				_draftJs.Entity.replaceData(entityKey, props);
				newState = _draftJs.EditorState.forceSelection(this.state.editorState, selection);
			} else {
				entityKey = _draftJs.Entity.create(type, mutablity, props);
				newState = _draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ');
			}

			this.onChange(newState);

			return entityKey;
		}
	}, {
		key: '_handleHyperLink',
		value: function _handleHyperLink(url) {

			var that = this;
			var type = 'HYPERLINK';
			var props = {
				loading: true,
				url: url
			};
			var entityKey = this._insertBlockComponent(null, type, props, 'IMMUTABLE');

			var getJSONLoop = function getJSONLoop(id, callback) {
				var time = 0;
				(0, _fileUpload.getFileUrl)(id).done(function (res) {
					if (res[0].convertStatus === 'pending' || res[0].convertStatus === 'uploading') {
						setTimeout(function () {
							time = time + 500;
							getJSONLoop(id, callback);
						}, 500);
					} else if (res[0].convertStatus === 'success') {
						callback(res);
					} else {
						that._linkFail(props, entityKey, type, url);
					}
				});
			};

			(0, _fileUpload.getURLData)(this.props.apnum, this.props.pid, props.url, 'HYPERLINK').done(function (res) {
				//console.log(res);
				getJSONLoop(res[0].fileId, function (urlResult) {

					_jquery2.default.getJSON(urlResult[0].url[0], function (result) {

						props.loading = false;
						props.title = result.title;
						props.description = result.description;
						props.img = result.imgUrls[0];
						props.fileId = res[0].fileId;
						props.url = url;
						//timeoutTest(result.imgUrls[0].fileId);

						that._insertBlockComponent(entityKey, type, props, 'IMMUTABLE');
					}).fail(function (res) {
						//props.loading = false;
						that._linkFail(props, entityKey, type, url);
					});
				});
			});
		}
	}, {
		key: '_linkFail',
		value: function _linkFail(props, entityKey, type, url) {
			var that = this;

			props.linkError = true;
			that._insertBlockComponent(entityKey, type, props, 'IMMUTABLE');
			props.loading = false;
			props.linkError = null;
			//that._insertBlockComponent(null, 'LINK', props, 'MUTABLE');
			var startKey = that.state.editorState.getSelection().getAnchorKey();
			that.setState({
				editorState: _insertUtils2.default.InsertText(that.state.editorState, url)
			}, function () {

				var endKey = that.state.editorState.getCurrentContent().getSelectionAfter().getFocusKey();
				var targetRange = new _draftJs.SelectionState({
					anchorKey: startKey,
					anchorOffset: 0,
					focusKey: endKey,
					focusOffset: url.length
				});

				var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: url });
				var linkState = _draftJs.RichUtils.toggleLink(that.state.editorState, targetRange, entityKey);
				var newState = _draftJs.EditorState.forceSelection(linkState, that.state.editorState.getCurrentContent().getSelectionAfter());
				that.onChange(newState);
			});
		}
	}, {
		key: '_removeBlock',
		value: function _removeBlock(blockKey, id) {
			var editorState = this.state.editorState;
			var content = editorState.getCurrentContent();

			var block = content.getBlockForKey(blockKey);
			var blockAfter = content.getKeyAfter(blockKey);
			var blockBefore = content.getKeyBefore(blockKey);
			var entityKey = block.getEntityAt(0);

			var targetRange = new _draftJs.SelectionState({
				anchorKey: blockKey,
				anchorOffset: 0,
				focusKey: blockKey,
				focusOffset: block.getLength()
			});

			var withoutBlock = _draftJs.Modifier.removeRange(content, targetRange, 'backward');
			var resetBlock = _draftJs.Modifier.setBlockType(withoutBlock, withoutBlock.getSelectionAfter(), 'unstyled');

			var newState = _draftJs.EditorState.push(editorState, resetBlock, 'remove-range');

			if (this.fileSystemObject[id]) {
				delete this.fileSystemObject[id];
			}

			this.onChange(newState);
		}
	}, {
		key: '_handlePaste',
		value: function _handlePaste(text) {
			var _this2 = this;

			var youtubeReg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
			var URLReg = /^(http|https):\/\//i;

			var youtubeTest = text.match(youtubeReg);
			var URLTest = text.match(URLReg);

			if (youtubeTest) {

				setTimeout(function () {
					_this2._insertBlockComponent(null, "YOUTUBE", { src: youtubeTest[0], file: youtubeTest[1], url: text });
				}, 500);

				return true;
			} else if (URLTest) {

				this._handleHyperLink(text);
				return true;
			}
		}
	}, {
		key: '_onSearchChange',
		value: function _onSearchChange(_ref2) {
			var value = _ref2.value;

			//this.props.onRequestSearch(value);
			console.log(value.length);
			if (value.length < 2) {
				return true;
			} else {
				this.setState({
					suggestions: (0, _draftJsMentionPlugin.defaultSuggestionsFilter)(value, this.props.mentions)
				});
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.content !== this.propsContent) {
				var blocks = (0, _draftJs.convertFromRaw)(nextProps.content);
				var editorState = _draftJs.EditorState.createWithContent(blocks);
				this.setState({ editorState: editorState });
				this.propsContent = nextProps.content;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state;
			var editorState = _state.editorState;
			var selectedBlock = _state.selectedBlock;
			var selectionRange = _state.selectionRange;
			var MentionSuggestions = mentionPlugin.MentionSuggestions;

			var fileUploadFunction = {
				onTriggerUpload: this.onTriggerUpload,
				getFileInfo: this.getFileInfo,
				getSignatureDone: this.getSignatureDone,
				uploadToS3Done: this.uploadToS3Done,
				urlTransformDone: this.urlTransformDone
			};
			var sideToolbarOffsetTop = 0;

			if (selectedBlock) {
				var editor = document.getElementById('richEditor');
				var editorBounds = editor.getBoundingClientRect();
				var blockBounds = selectedBlock.getBoundingClientRect();

				sideToolbarOffsetTop = blockBounds.bottom - editorBounds.top - 31; // height of side toolbar
			}

			var contentState = editorState.getCurrentContent();

			return _react2.default.createElement(
				'div',
				{ styleName: 'editor', className: _plugin2.default.editor, id: 'richEditor' },
				selectedBlock ? _react2.default.createElement(_SideToolbar2.default, _extends({
					apnum: this.props.apnum,
					pid: this.props.pid,
					editorState: editorState,
					style: { top: sideToolbarOffsetTop },
					onToggle: this.toggleBlockType,
					onUploadImage: this.handleUploadImage,
					mediaInfo: this.props.mediaInfo
				}, fileUploadFunction)) : null,
				this.state.inlineToolbar.show ? _react2.default.createElement(_InlineToolbar2.default, {
					editorState: editorState,
					onToggle: this.toggleInlineStyle,
					onLink: this.onLinkKeyDown,
					position: this.state.inlineToolbar.position
				}) : null,
				_react2.default.createElement(_draftJsPluginsEditor2.default, {
					blockRendererFn: this.blockRenderer,
					blockStyleFn: this.blockStyler,
					editorState: editorState,
					handleKeyCommand: this.handleKeyCommand,
					onChange: this.onChange,
					placeholder: this.props.placeholder,
					spellCheck: true,
					readOnly: this.props.readOnly,
					ref: 'editor',
					handlePastedText: this.handlePaste,
					plugins: plugins,
					handleReturn: this.handleReturn
				}),
				this.props.mentions && _react2.default.createElement(MentionSuggestions, {
					onSearchChange: this.onSearchChange,
					suggestions: this.state.suggestions
				}),
				_react2.default.createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
					onChange: this.handleFileInput })
			);
		}
	}]);

	return RichEditor;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(RichEditor, _style2.default, { allowMultiple: true });