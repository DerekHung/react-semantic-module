import React, { Component, PropTypes } from 'react';
import ToolbarIcon from './ToolbarIcon';
import CSSModules from 'react-css-modules';
import style from './style.css';

import FileUploader from '../fileUploader';

const BLOCK_TYPES = [
	{ icon: 'icon h1', style: 'header-one' },
	{ icon: 'icon h2', style: 'header-two' },
	{ icon: 'icon list ul', style: 'unordered-list-item' },
	{ icon: 'icon list ol', style: 'ordered-list-item' },
	{ icon: 'icon left_double_quote', style: 'blockquote' }
];

const SideToolbarExtras = CSSModules(({ editorState, onToggle }) => {
	const selection = editorState.getSelection();
	const blockType = editorState.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();
	return (
		<div styleName="toolbar side">
			<ul styleName="toolbar-icons">
				{BLOCK_TYPES.map(type =>
					<ToolbarIcon
						key={type.label || type.icon}
						active={type.style === blockType}
						label={type.label}
						icon={type.icon}
						onToggle={onToggle}
						style={type.style}
						/>
				) }
			</ul>
		</div>
	);
},style,{ allowMultiple: true });

class SideToolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false
		};
	}
	render() {
		const { isExpanded } = this.state;
		const { editorState, onUploadImage, onToggle, onTriggerUpload, getFileInfo, getSignatureDone, uploadToS3Done, urlTransformDone } = this.props;
		return (
			<div style={this.props.style} styleName="side-toolbar">
				<FileUploader 
							apnum={ this.props.apnum }
                            pid={ this.props.pid }
                            mediaInfo={this.props.mediaInfo}
                            onTriggerUpload={onTriggerUpload}
                            getFileInfo={getFileInfo}
                            getSignatureDone={getSignatureDone}
                            uploadToS3Done={uploadToS3Done}
                            urlTransformDone={urlTransformDone}
							dontWaitSuccess={true}>
					<i className="icon picture"
						aria-hidden="true"
						onMouseDown={e => e.preventDefault() }
						onClick={onUploadImage}
						>
					</i>
				</FileUploader>
				<i className="icon bars"
					aria-hidden="true"
					onMouseEnter={() => this.setState({ isExpanded: true }) }
					onMouseDown={(e) => e.preventDefault() }
					onMouseLeave={() => this.setState({ isExpanded: false }) }
					>
					{isExpanded
						? <SideToolbarExtras editorState={editorState} onToggle={onToggle} />
						: null
					}
				</i>
			</div>
		)
	}
}

export default CSSModules(SideToolbar,style, { allowMultiple: true });