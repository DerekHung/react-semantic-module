import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import editorStyles from 'draft-js-mention-plugin/lib/plugin.css';

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
import { getSignature,uploadToS3,getFileUrl,getURLData,MIMEMap } from '../../utils/fileUpload.js';

import InsertUtils from './insertUtils.js';

import $ from 'jquery';

const mentionPlugin = createMentionPlugin({
  theme: style,
});
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

function findLinkEntities(contentBlock, callback) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				Entity.get(entityKey).getType() === 'LINK'
			);
		},
		callback
	);
}

const Link = (props) => {
	console.log(props);
	const {url} = Entity.get(props.entityKey).getData();
	const styleLink = {
		color: '#3b5998',
		textDecoration: 'underline',
	}
	return (
		<a href={url} style={styleLink} target="_blank">
			{props.children}
		</a>
	);
};

const decorator = new CompositeDecorator([
						{
							strategy: findLinkEntities,
							component: Link,
						},
					]);

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
				blocks,
				decorator
			)
		} else {
			editorState = EditorState.createEmpty(decorator)
		}
		
		this.uploading = 0;

		this.state = {
			editorState,
			inlineToolbar: { show: false },
			suggestions: this.props.mentions
		};
		/* Editor onChange event (core render method) */ 
		this.onChange = (editorState, callback) => {
			this.setState({ editorState });
			if( props.onChange ) props.onChange(editorState.getCurrentContent());
			setTimeout(this.updateSelection, 0);
			if( typeof(callback) === 'function' ) callback();
		}
		/* Editor component public method */ 
		this.focus = () => this.refs.editor.focus();
		this.blur = () => this.refs.editor.blur();

		this.updateSelection = () => this._updateSelection();
		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
		
		this.handleFileInput = (e) => this._handleFileInput(e);
		
		this.onLinkKeyDown = (e) => this._onLinkKeyDown(e);
		this.insertBlockComponent = (type, data) => this._insertBlockComponent(type,data);
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
		this.onSearchChange = ({value}) => this._onSearchChange({value});
		this.setLoadingState = (counter) => {
			this.uploading = counter;
			if( this.props.onUploadStatusChange ) this.props.onUploadStatusChange(this.uploading);
		}

		this.onTriggerUpload = (e) => {}; 
		this.getFileInfo = (f, type) =>  this._handleFileInput(f, type);
		this._handleFileInput = (f, type) => {

			let props = {
				loading: true,
				fakeSrc: URL.createObjectURL(f)
			}

			if( type === 'AUDIO' ) props.name = f.name;
			this.gen = this._insertAsyncBlockComponent(type, f, props);

			this.gen.next();
		}
		this.getSignatureDone = (signature) => {
			this.gen.next(signature.fileId);
		}
		this.uploadToS3Done = () => {
			this.gen.next();
		} 
		this._insertAsyncBlockComponent = function* (type, file, props){
			let that = this;

			this.setLoadingState(this.uploading + 1);

			let entityKey = this._insertBlockComponent(null, type, props);		
			yield "loading";
			let fileId = yield "get fileId";

			let uploadDone = yield function (){
				props.loading = false;
				props.src = props.fakeSrc;
				props.fileId = fileId;
				
				that._insertBlockComponent(entityKey, type, props);

				that.setLoadingState(that.uploading - 1);
			}();
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
		if(type === 'atomic') {
			return {
				component: CustomComponent,
				editable: false,
				props:{
					onRequestRemove: function(blockKey){
						 that._removeBlock(blockKey);
					}
				}
			}
		}
	}

	/* handle inlineToolbar position and if show */ 
	_updateSelection() {
		if( typeof(window) !== 'undefined') {
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
				}else if( selectionRange.startContainer.id === 'toolbar-icon') {
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
		
		const entityKey = Entity.create('LINK', 'MUTABLE', {url: value});
		let that = this;
		
		this.onChange(RichUtils.toggleLink(
              this.state.editorState,
              this.state.editorState.getSelection(),
              entityKey
            ),function(){
				that.setState({
					inlineToolbar: { show: false }
				})
			});
	}

	_insertTextBlock(){
		let blockArray = this.state.editorState.getCurrentContent().getBlocksAsArray();
		console.log(blockArray);
	}

	_insertBlockComponent(entityKey, type, props, mutablity) {
		console.log("insert");
		const currentSelection = this.state.editorState.getSelection();
		let newState = null;

		if( entityKey ){
			let selection = currentSelection.set('hasFocus', false);
			Entity.replaceData(entityKey, props);
			newState = EditorState.forceSelection(this.state.editorState,selection);
		}else {
			entityKey = Entity.create(type, mutablity, props);
			newState = AtomicBlockUtils.insertAtomicBlock( this.state.editorState,entityKey,' ');
			
		}

		this.onChange(newState);

		return entityKey;
	};

	

	_handleHyperLink(url){
		
		let that = this;
		let type = 'HYPERLINK';
		let props = {
			loading: true,
			url: url
		}		
		let entityKey = this._insertBlockComponent(null, type, props, 'IMMUTABLE');

		let getJSONLoop = function(id, callback){
			let time = 0;
			getFileUrl(id).done(function(res){
				if(res[0].convertStatus === 'pending' || res[0].convertStatus === 'uploading') {
					setTimeout(() => {
						time = time + 500;
						getJSONLoop(id, callback);
					},500);
					
				}else if( res[0].convertStatus === 'success'){
					callback(res);
				}else if( res[0].convertStatus === 'noResponse' ) {
					that._linkFail(props);
				}
			})
		};

		getURLData(props.url).done(function(res){
				//console.log(res);
			getJSONLoop(res[0].fileId, function(urlResult){

				$.getJSON(urlResult[0].url[0],function(result){
					
					console.log(result);

					props.loading = false;
					props.title = result.title; 
					props.description = result.description;
					props.img = result.imgUrls[0];
					props.fileId = res[0].fileId;
					props.url = url; 
					//timeoutTest(result.imgUrls[0].fileId);

					that._insertBlockComponent(entityKey, type, props, 'IMMUTABLE');


				}).fail(function(res){
					//props.loading = false;
					that._linkFail(props);
				})
			})
		})
	}

	_linkFail(props) {
		let that = this;

		props.linkError = true;
		that._insertBlockComponent(entityKey, type, props, 'IMMUTABLE');
		props.loading = false;
		props.linkError = null;
		//that._insertBlockComponent(null, 'LINK', props, 'MUTABLE');
		let startKey = that.state.editorState.getSelection().getAnchorKey();
		that.setState({
			editorState: InsertUtils.InsertText(that.state.editorState, url)
		},function(){

			let endKey = that.state.editorState.getCurrentContent().getSelectionAfter().getFocusKey();
			let targetRange = new SelectionState({
				anchorKey: startKey,
				anchorOffset: 0,
				focusKey: endKey,
				focusOffset: url.length
			});

			const entityKey = Entity.create('LINK', 'MUTABLE', {url: url});
			const linkState = RichUtils.toggleLink(
					that.state.editorState,
					targetRange,
					entityKey);
			const newState = EditorState.forceSelection(linkState, that.state.editorState.getCurrentContent().getSelectionAfter());
			that.onChange(newState);
		});
	}

	_removeBlock(blockKey) {
		const editorState = this.state.editorState;
		const content = editorState.getCurrentContent();

		let block = content.getBlockForKey(blockKey);
		let blockAfter = content.getKeyAfter(blockKey);
		let blockBefore = content.getKeyBefore(blockKey);

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
			
		this.onChange(newState);
	}
	

	_handlePaste(text){
		const youtubeReg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		const URLReg = /^(http|https):\/\//i;

		let youtubeTest = text.match(youtubeReg);
		let URLTest = text.match(URLReg);

		if( youtubeTest ){

			setTimeout(() => {
				this._insertBlockComponent( null, "YOUTUBE", {src: youtubeTest[0], file: youtubeTest[1], url: text});
			},500)

			return true;
		}
		else if( URLTest ) {			

			this._handleHyperLink(text);
			return true;
		}
	}

	_onSearchChange({value}) {
		//this.props.onRequestSearch(value);
		this.setState({
			suggestions: defaultSuggestionsFilter(value, this.props.mentions),
		});
	}

	componentWillReceiveProps(nextProps) {
		if( nextProps.content !== this.propsContent ) {
			const blocks = convertFromRaw(nextProps.content);
			const editorState = EditorState.createWithContent(
				blocks,
				decorator
			)
			this.setState({ editorState });
			this.propsContent = nextProps.content;
		}
	}
	
	
	render() {
		const { editorState, selectedBlock, selectionRange } = this.state;
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
			
			<div styleName="editor" className={ editorStyles.editor } id="richEditor" >
				{selectedBlock
					? <SideToolbar
						editorState={editorState}
						style={{ top: sideToolbarOffsetTop }}
						onToggle={this.toggleBlockType}
						onUploadImage={this.handleUploadImage}
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
						placeholder="Write something..."
						spellCheck={true}
						readOnly={this.props.readOnly}
						ref="editor"
						handlePastedText={this.handlePaste}
						plugins={plugins}
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