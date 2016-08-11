import {
	Modifier,
	EditorState,
	CharacterMetadata,
	ContentBlock,
	genKey,
	BlockMapBuilder
} from 'draft-js';

import Immutable from 'immutable';
const {
  List,
  Repeat,
} = Immutable;
const InsertUtils = {
	InsertText : function(editorState, text){
		const contentState = editorState.getCurrentContent();
		const selectionState = editorState.getSelection();

		console.log(selectionState);
		const newContentState = Modifier.insertText(contentState, selectionState, text);

		return EditorState.push(editorState, newContentState, 'insert-fragment');
	},
}
module.exports = InsertUtils;
