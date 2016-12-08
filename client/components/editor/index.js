import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import creatLinkPlugin from './decorator/link.js';

import {
	EditorState,
	Entity,
	RichUtils,
	ContentState,
	CompositeDecorator,
	convertToRaw,
	convertFromRaw,
	convertFromHTML,
	AtomicBlockUtils,
	getDefaultKeyBinding,
	KeyBindingUtil,
	SelectionState,
	Modifier
} from 'draft-js';
import {
	getSelectionRange,
	getSelectedBlockElement,
	getSelectionCoords
} from '../../utils/selection.js';


import SideToolbar from './SideToolbar';
import InlineToolbar from './InlineToolbar';
import CustomComponent from './customComponent/component.js';
import { getSignature, uploadToS3, getFileUrl, getURLData, MIMEMap } from '../../utils/fileUpload.js';

import InsertUtils from './insertUtils.js';

import $ from 'jquery';





class RichEditor extends Component {
	constructor(props) {
		super(props);
		let editorState = null;
		if (props.editorState) {
			editorState = props.editorState
		} else if (props.content) {
			const blocks = convertFromRaw(props.content);
			this.propsContent = props.content;
			editorState = EditorState.createWithContent(
				blocks
			)
		} else {
			editorState = EditorState.createEmpty()
		}

		this.mentionPlugin = createMentionPlugin({theme: style});
		this.LinkPlugin = creatLinkPlugin();
		this.plugins = [this.mentionPlugin,this.LinkPlugin];

		this.uploadingArr = {};
		this.fileSystemObject = {};

		this.state = {
			editorState: editorState,
			inlineToolbar: { show: false },
			suggestions: this.props.mentions
		};
		/* Editor onChange event (core render method) */
		this.onChange = (editorState, callback) => {
			this.setState({ editorState });
			if (props.onChange) props.onChange(editorState.getCurrentContent());
			setTimeout(this.updateSelection, 0);
			if (typeof (callback) === 'function') callback();
		}
		/* Editor component public method */
		this.focus = () => this.refs.editor.focus();
		this.blur = () => this.refs.editor.blur();
		this.log = () => {
			const content = this.state.editorState.getCurrentContent();
		}
		this.getFileUploadObject = () => { return Object.assign({}, this.fileSystemObject); }

		this.updateSelection = () => this._updateSelection();
		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

		this.onLinkKeyDown = (e) => this._onLinkKeyDown(e);
		this.insertBlockComponent = (type, data) => this._insertBlockComponent(type, data);
		this.insertImage = (file) => this._insertImage(file);
		this.blockRenderer = (block) => this._blockRenderer(block);
		this.blockStyler = (block) => {
			if (block.getType() === 'unstyled') {
				return 'paragraph';
			}
			return null;
		}
		this.cleanInput = () => { this.refs.fileInput.value = null; }
		this.handlePaste = (text) => this._handlePaste(text);
		this.onSearchChange = ({value}) => this._onSearchChange({ value });

		this.onTriggerUpload = (e) => { };
		this.getFileInfo = (file) => this._handleFileInput(file);
		this._handleFileInput = (file) => {

			file = Object.assign({}, file);

			let props = {
				loading: true,
				src: URL.createObjectURL(file.originFile),
				id: file.id
			}

			if (file.type === 'AUDIO' || file.type === 'DOCUMENT') props.name = file.name;

			this.fileSystemObject[file.id] = {
				fileData: file,
				fileProps: props,
				fileId: null,
				generator: this._insertAsyncBlockComponent(file.id)
			};


			this.fileSystemObject[file.id].generator.next();
		}
		this.getSignatureDone = (file) => {

			if (typeof (this.fileSystemObject[file.id]) !== 'undefined') {
				this.fileSystemObject[file.id].fileData = file;
				this.fileSystemObject[file.id].generator.next(file.signature.fileId);
			}
		}
		this.uploadToS3Done = (file) => {

			if (typeof (this.fileSystemObject[file.id]) !== 'undefined') {
				this.fileSystemObject[file.id].fileData = file;
				this.fileSystemObject[file.id].generator.next(file);
			}

		}
		this._insertAsyncBlockComponent = function* (id) {

			const { fileData, fileProps } = this.fileSystemObject[id];

			let entityKey = this._insertBlockComponent(null, fileData.type, fileProps);

			this.fileSystemObject[id].entityKey = entityKey;
			this.fileSystemObject[id].fileId = yield "get fileId";

			yield "uploadDone";

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

		}
	}

	/* Draft js block render function*/
	_blockRenderer(block) {
		let type = block.getType();
		let that = this;
		if (type === 'atomic') {
			return {
				component: CustomComponent,
				editable: false,
				props: {
					onRequestRemove: function (blockKey, id) {
						that._removeBlock(blockKey, id);
					}
				}
			}
		}
	}

	/* handle inlineToolbar position and if show */
	_updateSelection() {
		if (typeof (window) !== 'undefined') {
			const selectionRange = getSelectionRange(window);
			let popoverControlVisible = false,
				popoverControlTop = null,
				popoverControlLeft = null,
				selectedBlock;
			if (selectionRange) {
				let rangeBounds = selectionRange.getBoundingClientRect();
				selectedBlock = getSelectedBlockElement(selectionRange);
				if (selectedBlock && !selectionRange.collapsed) {
					popoverControlVisible = true;
					popoverControlTop = getSelectionCoords(selectionRange).offsetTop;
					popoverControlLeft = getSelectionCoords(selectionRange).offsetLeft;
					this.tempTop = popoverControlTop;
					this.tempLeft = popoverControlLeft;
				} else if (selectionRange.startContainer.id === 'toolbar-icon') {
					popoverControlVisible = true;
					popoverControlTop = this.tempTop;
					popoverControlLeft = this.tempLeft;
				}
			}

			this.setState({
				selectedBlock,
				inlineToolbar: {
					show: popoverControlVisible,
					position: {
						top: popoverControlTop,
						left: popoverControlLeft
					}
				}
			})
		}
	}


	_handleKeyCommand(command) {

		const { editorState } = this.state;
		if (command === 'backspace') {
			let selection = editorState.getSelection();
			let content = editorState.getCurrentContent();
			let startKey = selection.getStartKey();
			let blockBefore = content.getBlockBefore(startKey);

			if (blockBefore && blockBefore.getType() === 'atomic') {
				for (let key in this.fileSystemObject) {

					if (this.fileSystemObject[key].entityKey === blockBefore.getEntityAt(0)) {
						delete this.fileSystemObject[key];
						break;
					}
				}
			}
		}
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	_toggleBlockType(blockType) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}

	_onLinkKeyDown(value) {

		const entityKey = Entity.create('LINK', 'MUTABLE', { url: value });
		let that = this;

		this.onChange(RichUtils.toggleLink(
			this.state.editorState,
			this.state.editorState.getSelection(),
			entityKey
		), function () {
			that.setState({
				inlineToolbar: { show: false }
			})
			setTimeout(() => that.refs.editor.focus(), 0);

		});
	}

	_insertTextBlock() {
		let blockArray = this.state.editorState.getCurrentContent().getBlocksAsArray();
	}

	_insertBlockComponent(entityKey, type, props, mutablity) {
		const currentSelection = this.state.editorState.getSelection();
		let newState = null;

		if (entityKey) {
			let selection = currentSelection.set('hasFocus', false);
			Entity.replaceData(entityKey, props);
			newState = EditorState.forceSelection(this.state.editorState, selection);
		} else {
			entityKey = Entity.create(type, mutablity, props);
			newState = AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ');

		}

		this.onChange(newState);

		return entityKey;
	};



	_handleHyperLink(url) {

		let that = this;
		let type = 'HYPERLINK';
		let props = {
			loading: true,
			url: url
		}
		let entityKey = this._insertBlockComponent(null, type, props, 'IMMUTABLE');

		let getJSONLoop = function (id, callback) {
			let time = 0;
			getFileUrl(id).done(function (res) {
				if (res[0].convertStatus === 'pending' || res[0].convertStatus === 'uploading') {
					setTimeout(() => {
						time = time + 500;
						getJSONLoop(id, callback);
					}, 500);

				} else if (res[0].convertStatus === 'success') {
					
					callback(res);
				} else {
					that._linkFail(props, entityKey, type, url);
				}
			})
		};

		getURLData(this.props.apnum, this.props.pid, props.url, 'HYPERLINK').done(function (res) {
			//console.log(res);
			getJSONLoop(res[0].fileId, function (urlResult) {

				$.getJSON(urlResult[0].url[0], function (result) {

					if( result.imgUrls && result.imgUrls.length > 0 ) {
						props.src = result.imgUrls[0].url;
					}
					props.loading = false;
					props.linktitle = result.title;
					props.linkcontent = result.description;
					props.fileId = res[0].fileId;
					props.linkurl = url;
					//timeoutTest(result.imgUrls[0].fileId);

					that._insertBlockComponent(entityKey, type, props, 'IMMUTABLE');


				}).fail(function (res) {
					//props.loading = false;
					that._linkFail(props, entityKey, type, url);
				})
			})
		})
	}

	_linkFail(props, entityKey, type, url) {
		let that = this;

		props.linkError = true;
		props.loading = false;
		that._insertBlockComponent(entityKey, type, props, 'IMMUTABLE');
		
		props.linkError = null;
		//that._insertBlockComponent(null, 'LINK', props, 'MUTABLE');
		let startKey = that.state.editorState.getSelection().getAnchorKey();
		that.setState({
			editorState: InsertUtils.InsertText(that.state.editorState, url)
		}, function () {

			let endKey = that.state.editorState.getCurrentContent().getSelectionAfter().getFocusKey();
			let targetRange = new SelectionState({
				anchorKey: startKey,
				anchorOffset: 0,
				focusKey: endKey,
				focusOffset: url.length
			});

			const entityKey = Entity.create('LINK', 'MUTABLE', { url: url });
			const linkState = RichUtils.toggleLink(
				that.state.editorState,
				targetRange,
				entityKey);
			const newState = EditorState.forceSelection(linkState, that.state.editorState.getCurrentContent().getSelectionAfter());
			that.onChange(newState);
		});
	}

	_removeBlock(blockKey, id) {
		const editorState = this.state.editorState;
		const content = editorState.getCurrentContent();

		let block = content.getBlockForKey(blockKey);
		let blockAfter = content.getKeyAfter(blockKey);
		let blockBefore = content.getKeyBefore(blockKey);
		let entityKey = block.getEntityAt(0);

		let targetRange = new SelectionState({
			anchorKey: blockKey,
			anchorOffset: 0,
			focusKey: blockKey,
			focusOffset: block.getLength(),
		});

		let withoutBlock = Modifier.removeRange(content, targetRange, 'backward');
		let resetBlock = Modifier.setBlockType(
			withoutBlock,
			withoutBlock.getSelectionAfter(),
			'unstyled'
		);

		let newState = EditorState.push(editorState, resetBlock, 'remove-range');

		if (this.fileSystemObject[id]) {
			delete this.fileSystemObject[id];
		}

		this.onChange(newState);
	}


	_handlePaste(text) {
		const youtubeReg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		const URLReg = /^(http|https):\/\//i;

		let youtubeTest = text.match(youtubeReg);
		let URLTest = text.match(URLReg);

		if (youtubeTest) {

			setTimeout(() => {
				this._insertBlockComponent(null, "YOUTUBE", { src: youtubeTest[0], file: youtubeTest[1], url: text });
			}, 500)

			return true;
		}
		else if (URLTest) {

			this._handleHyperLink(text);
			return true;
		}
	}

	_onSearchChange({value}) {
		//this.props.onRequestSearch(value);
		//console.log(value.length);

			this.setState({
				suggestions: defaultSuggestionsFilter(value, this.props.mentions),
			});
		


	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.content !== this.propsContent) {
			const blocks = convertFromRaw(nextProps.content);
			const editorState = EditorState.createWithContent(
				blocks
			)
			this.setState({ editorState });
			this.propsContent = nextProps.content;
		}else if( this.state.suggestions !== nextprops.mentions && nextprops.mentions) {
            this.setState({ suggestions: nextprops.mentions })
        }
	}


	render() {
		const { editorState, selectedBlock, selectionRange } = this.state;
		const { MentionSuggestions } = this.mentionPlugin;
		const fileUploadFunction = {
			onTriggerUpload: this.onTriggerUpload,
			getFileInfo: this.getFileInfo,
			getSignatureDone: this.getSignatureDone,
			uploadToS3Done: this.uploadToS3Done,
			urlTransformDone: this.urlTransformDone
		}
		let sideToolbarOffsetTop = 0;

		if (selectedBlock) {
			const editor = document.getElementById('richEditor');
			const editorBounds = editor.getBoundingClientRect();
			const blockBounds = selectedBlock.getBoundingClientRect();

			sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top)
				- 31; // height of side toolbar
		}

		let contentState = editorState.getCurrentContent();

		return (

			<div styleName="editor" id="richEditor">
				{selectedBlock
					? <SideToolbar
						apnum={this.props.apnum}
						pid={this.props.pid}
						editorState={editorState}
						style={{ top: sideToolbarOffsetTop }}
						onToggle={this.toggleBlockType}
						onUploadImage={this.handleUploadImage}
						mediaInfo={this.props.mediaInfo}
						{...fileUploadFunction}
						/>
					: null
				}
				{this.state.inlineToolbar.show
					? <InlineToolbar
						editorState={editorState}
						onToggle={this.toggleInlineStyle}
						onLink={this.onLinkKeyDown}
						position={this.state.inlineToolbar.position}
						/>
					: null
				}
				<Editor
					blockRendererFn={this.blockRenderer}
					blockStyleFn={this.blockStyler}
					editorState={editorState}
					handleKeyCommand={this.handleKeyCommand}
					onChange={this.onChange}
					placeholder={this.props.placeholder}
					spellCheck={true}
					readOnly={this.props.readOnly}
					ref="editor"
					handlePastedText={this.handlePaste}
					plugins={this.plugins}
					handleReturn={this.handleReturn}
					/>
				{ this.props.mentions &&
					<MentionSuggestions
						onSearchChange={ this.onSearchChange }
						suggestions={ this.state.suggestions }
						/>
				}
				<input type="file" ref="fileInput" style={{ display: 'none' }}
					onChange={this.handleFileInput}/>
			</div>
		);
	}
}
export default CSSModules(RichEditor, style, { allowMultiple: true }); 