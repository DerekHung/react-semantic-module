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

var mentionPlugin = _get__('createMentionPlugin')({ theme: _get__('style') });
var LinkPlugin = _get__('creatLinkPlugin')();
var plugins = [_get__('mentionPlugin'), _get__('LinkPlugin')];

var RichEditor = function (_get__2) {
	_inherits(RichEditor, _get__2);

	function RichEditor(props) {
		_classCallCheck(this, RichEditor);

		var _this = _possibleConstructorReturn(this, (RichEditor.__proto__ || Object.getPrototypeOf(RichEditor)).call(this, props));

		var editorState = null;

		if (props.editorState) {
			editorState = props.editorState;
		} else if (props.content) {
			var blocks = _get__('convertFromRaw')(props.content);
			_this.propsContent = props.content;
			editorState = _get__('EditorState').createWithContent(blocks);
		} else {
			editorState = _get__('EditorState').createEmpty();
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
				src: URL.createObjectURL(file.originFile),
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
							fileProps.fileId = this.fileSystemObject[id].fileId;

							this._insertBlockComponent(entityKey, fileData.type, fileProps);

							/*
       				}).fail(function(error){
       
       					props.error = true;
       
       					that._insertBlockComponent(entityKey, type, props);
       					
       					that.setLoadingState(that.uploading - 1);
       
       				})
       */

						case 13:
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
					component: _get__('CustomComponent'),
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
				var selectionRange = _get__('getSelectionRange')(window);
				var popoverControlVisible = false,
				    popoverControlTop = null,
				    popoverControlLeft = null,
				    selectedBlock = void 0;
				if (selectionRange) {
					var rangeBounds = selectionRange.getBoundingClientRect();
					selectedBlock = _get__('getSelectedBlockElement')(selectionRange);
					if (selectedBlock && !selectionRange.collapsed) {
						popoverControlVisible = true;
						popoverControlTop = _get__('getSelectionCoords')(selectionRange).offsetTop;
						popoverControlLeft = _get__('getSelectionCoords')(selectionRange).offsetLeft;
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
			var newState = _get__('RichUtils').handleKeyCommand(editorState, command);
			if (newState) {
				this.onChange(newState);
				return true;
			}
			return false;
		}
	}, {
		key: '_toggleBlockType',
		value: function _toggleBlockType(blockType) {
			this.onChange(_get__('RichUtils').toggleBlockType(this.state.editorState, blockType));
		}
	}, {
		key: '_toggleInlineStyle',
		value: function _toggleInlineStyle(inlineStyle) {
			this.onChange(_get__('RichUtils').toggleInlineStyle(this.state.editorState, inlineStyle));
		}
	}, {
		key: '_onLinkKeyDown',
		value: function _onLinkKeyDown(value) {

			var entityKey = _get__('Entity').create('LINK', 'MUTABLE', { url: value });
			var that = this;

			this.onChange(_get__('RichUtils').toggleLink(this.state.editorState, this.state.editorState.getSelection(), entityKey), function () {
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
				_get__('Entity').replaceData(entityKey, props);
				newState = _get__('EditorState').forceSelection(this.state.editorState, selection);
			} else {
				entityKey = _get__('Entity').create(type, mutablity, props);
				newState = _get__('AtomicBlockUtils').insertAtomicBlock(this.state.editorState, entityKey, ' ');
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
				_get__('getFileUrl')(id).done(function (res) {
					if (res[0].convertStatus === 'pending' || res[0].convertStatus === 'uploading') {
						setTimeout(function () {
							time = time + 500;
							getJSONLoop(id, callback);
						}, 500);
					} else if (res[0].convertStatus === 'success') {

						callback(res);
					} else {
						setTimeout(function () {
							time = time + 500;
							getJSONLoop(id, callback);
						}, 500);
						that._linkFail(props, entityKey, type, url);
					}
				});
			};

			_get__('getURLData')(this.props.apnum, this.props.pid, props.url, 'HYPERLINK').done(function (res) {
				//console.log(res);
				getJSONLoop(res[0].fileId, function (urlResult) {

					_get__('$').getJSON(urlResult[0].url[0], function (result) {

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
			props.loading = false;
			that._insertBlockComponent(entityKey, type, props, 'IMMUTABLE');

			props.linkError = null;
			//that._insertBlockComponent(null, 'LINK', props, 'MUTABLE');
			var startKey = that.state.editorState.getSelection().getAnchorKey();
			that.setState({
				editorState: _get__('InsertUtils').InsertText(that.state.editorState, url)
			}, function () {

				var endKey = that.state.editorState.getCurrentContent().getSelectionAfter().getFocusKey();
				var targetRange = new (_get__('SelectionState'))({
					anchorKey: startKey,
					anchorOffset: 0,
					focusKey: endKey,
					focusOffset: url.length
				});

				var entityKey = _get__('Entity').create('LINK', 'MUTABLE', { url: url });
				var linkState = _get__('RichUtils').toggleLink(that.state.editorState, targetRange, entityKey);
				var newState = _get__('EditorState').forceSelection(linkState, that.state.editorState.getCurrentContent().getSelectionAfter());
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

			var targetRange = new (_get__('SelectionState'))({
				anchorKey: blockKey,
				anchorOffset: 0,
				focusKey: blockKey,
				focusOffset: block.getLength()
			});

			var withoutBlock = _get__('Modifier').removeRange(content, targetRange, 'backward');
			var resetBlock = _get__('Modifier').setBlockType(withoutBlock, withoutBlock.getSelectionAfter(), 'unstyled');

			var newState = _get__('EditorState').push(editorState, resetBlock, 'remove-range');

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
			//console.log(value.length);

			this.setState({
				suggestions: _get__('defaultSuggestionsFilter')(value, this.props.mentions)
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.content !== this.propsContent) {
				var blocks = _get__('convertFromRaw')(nextProps.content);
				var editorState = _get__('EditorState').createWithContent(blocks);
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

			var _get__3 = _get__('mentionPlugin');

			var MentionSuggestions = _get__3.MentionSuggestions;

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

			return _get__('React').createElement(
				'div',
				{ styleName: 'editor', className: _get__('editorStyles').editor, id: 'richEditor' },
				selectedBlock ? _get__('React').createElement(_get__('SideToolbar'), _extends({
					apnum: this.props.apnum,
					pid: this.props.pid,
					editorState: editorState,
					style: { top: sideToolbarOffsetTop },
					onToggle: this.toggleBlockType,
					onUploadImage: this.handleUploadImage,
					mediaInfo: this.props.mediaInfo
				}, fileUploadFunction)) : null,
				this.state.inlineToolbar.show ? _get__('React').createElement(_get__('InlineToolbar'), {
					editorState: editorState,
					onToggle: this.toggleInlineStyle,
					onLink: this.onLinkKeyDown,
					position: this.state.inlineToolbar.position
				}) : null,
				_get__('React').createElement(_get__('Editor'), {
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
					plugins: _get__('plugins'),
					handleReturn: this.handleReturn
				}),
				this.props.mentions && _get__('React').createElement(MentionSuggestions, {
					onSearchChange: this.onSearchChange,
					suggestions: this.state.suggestions
				}),
				_get__('React').createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
					onChange: this.handleFileInput })
			);
		}
	}]);

	return RichEditor;
}(_get__('Component'));

var _DefaultExportValue = _get__('CSSModules')(_get__('RichEditor'), _get__('style'), { allowMultiple: true });

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
		case 'createMentionPlugin':
			return _draftJsMentionPlugin2.default;

		case 'style':
			return _style2.default;

		case 'creatLinkPlugin':
			return _link2.default;

		case 'mentionPlugin':
			return mentionPlugin;

		case 'LinkPlugin':
			return LinkPlugin;

		case 'convertFromRaw':
			return _draftJs.convertFromRaw;

		case 'EditorState':
			return _draftJs.EditorState;

		case 'CustomComponent':
			return _component2.default;

		case 'getSelectionRange':
			return _selection.getSelectionRange;

		case 'getSelectedBlockElement':
			return _selection.getSelectedBlockElement;

		case 'getSelectionCoords':
			return _selection.getSelectionCoords;

		case 'RichUtils':
			return _draftJs.RichUtils;

		case 'Entity':
			return _draftJs.Entity;

		case 'AtomicBlockUtils':
			return _draftJs.AtomicBlockUtils;

		case 'getFileUrl':
			return _fileUpload.getFileUrl;

		case 'getURLData':
			return _fileUpload.getURLData;

		case '$':
			return _jquery2.default;

		case 'InsertUtils':
			return _insertUtils2.default;

		case 'SelectionState':
			return _draftJs.SelectionState;

		case 'Modifier':
			return _draftJs.Modifier;

		case 'defaultSuggestionsFilter':
			return _draftJsMentionPlugin.defaultSuggestionsFilter;

		case 'editorStyles':
			return _plugin2.default;

		case 'plugins':
			return plugins;

		case 'Component':
			return _react.Component;

		case 'CSSModules':
			return _reactCssModules2.default;

		case 'RichEditor':
			return RichEditor;

		case 'React':
			return _react2.default;

		case 'SideToolbar':
			return _SideToolbar2.default;

		case 'InlineToolbar':
			return _InlineToolbar2.default;

		case 'Editor':
			return _draftJsPluginsEditor2.default;
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