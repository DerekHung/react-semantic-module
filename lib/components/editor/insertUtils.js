'use strict';

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _immutable2.default.List,
    Repeat = _immutable2.default.Repeat;

var InsertUtils = {
		InsertText: function InsertText(editorState, text) {

				console.log("123456");

				var contentState = editorState.getCurrentContent();
				var selectionState = editorState.getSelection();

				console.log(selectionState);
				var newContentState = _draftJs.Modifier.insertText(contentState, selectionState, text);

				return _draftJs.EditorState.push(editorState, newContentState, 'insert-fragment');
		}
};
module.exports = InsertUtils;