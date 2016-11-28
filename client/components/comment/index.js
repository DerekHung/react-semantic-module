import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import style from './style.css';
import CSSModule from 'react-css-modules';

class CommentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: props.mentions
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