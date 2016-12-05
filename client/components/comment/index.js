import React, { Component } from 'react';
import { EditorState,convertFromRaw, ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import style from './style.css';
import CSSModule from 'react-css-modules';

import { fromJS } from 'immutable';

class CommentEditor extends Component {
    constructor(props) {
        super(props);

        let editorState;
        if (props.editorState) {
			editorState = props.editorState
		} else if (props.content && props.content.length > 0) {

			const blocks = convertFromRaw(props.content);
			editorState = EditorState.createWithContent(
				blocks
			)
		} else {
			editorState = EditorState.createEmpty()
		}

        this.state = {
            editorState: editorState,
            suggestions: props.mentions || fromJS([])
        }
        this.mentionPlugin = createMentionPlugin({theme: style});
        this.plugins = [this.mentionPlugin];

        this.onChange = (editorState) => {
            if (props.onChange) props.onChange(editorState.getCurrentContent());
            this.setState({
                editorState,
            });
        }

        this.onSearchChange = ({ value }) => {
            this.setState({
                suggestions: defaultSuggestionsFilter(value, this.props.mentions),
            });
        }

        this.onAddMention = () => {
            // get the mention object selected
        }

        this.focus = () => {
            this.editor.focus();
        }

        this.cleanData = () => {

            this.setState({
                editorState : EditorState.push(this.state.editorState, ContentState.createFromText(''))
            })
        }
    }

    componentWillReceiveProps(nextprops) {

        if( this.props.editorState !== nextprops.editorState ) {
            this.setState({ 
                editorState: nextprops.editorState
            })
        }else if ( nextprops.content && this.props.content !== nextprops.content ) {
            var blocks = convertFromRaw(nextprops.content);
			var editorState = EditorState.createWithContent(
				blocks
			)
            this.setState({ 
                editorState: editorState
            })
        }else if( this.state.suggestions !== nextprops.mentions) {
            this.setState({ suggestions: nextprops.mentions })
        }else {
            return false;
        }
    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        return (
            <div styleName="editor" onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={this.plugins}
                    ref={(element) => { this.editor = element; } }
                    />
                <MentionSuggestions
                    onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                    />
            </div>
        );
    }
}
export default CSSModule(CommentEditor, style, { allowMultiple: true });