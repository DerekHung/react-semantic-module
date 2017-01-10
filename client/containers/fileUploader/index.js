import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import css from './style.css';
import { connect } from 'react-redux';

import FileUploader from '../../components/fileUploader';
import html from 'doc/fileUploader.md';

import mediaInfo from '../editor/mediaInfo.js';

class FileUploaderPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileId: null,
            uploaded: 'none',
            fileType: null,
            fileUrl: []

        }
        this.onTriggerUpload = (e) => {
            this.setState({
                fileId: null,
                uploaded: 'none',
                fileUrl: []
            })
        }
        this.getFileInfo = (file) => {
            console.log(file);
            this.setState({ fileType: file.type, uploaded: file.status })
        }
        this.getSignatureDone = (file) => {
            console.log(file);
            file.test = "123154";
            this.setState({fileId:file.signature.fileId});
        }
        this.uploadToS3Done = (file) => {
            console.log(file);
            this.setState({ uploaded: file.status});
        }
        this.urlTransformDone = (file) => {
            console.log(file);
            this.setState({ fileUrl: file.transformedFile });
        }
    }
	render() {
        let result;
        /*if( this.state.fileUrl ) {
            if( this.state.fileType === 'IMAGE') { result = <img src={this.state.fileUrl} />}
            else if( this.state.fileType === 'VIDEO') { result = <video src={this.state.fileUrl} /> }
            else if( this.state.fileType === 'AUDIO') { result = <audio controls src={this.state.fileUrl} /> }
            else if( this.state.fileType === 'DOCUMENT') { }
            else { result = null; }
        }*/
        let that = this;
		return (
            <div>
                <h3>File Uploader</h3>
                <FileUploader apnum="10400"
                            pid="10400"  
                            mediaInfo={mediaInfo}
                            onTriggerUpload={this.onTriggerUpload}
                            getFileInfo={this.getFileInfo}
                            getSignatureDone={this.getSignatureDone}
                            uploadToS3Done={this.uploadToS3Done}
                            urlTransformDone={this.urlTransformDone}>
                    <button styleName="button">
                        上傳檔案
                    </button>
                </FileUploader>
                <h3>Get File Id & upload Status</h3>
                <div className="content">
					<p>Status: { this.state.uploaded } </p>
                    <p>fileId: { this.state.fileId }</p>
                </div>
                <h3>result</h3>
                <div className="content">
					{
                        this.state.fileUrl.map(function(value, key){
                            return <div>
                                <p>{ that.state.fileUrl[key].tag }</p>
                                <p>{ that.state.fileUrl[key].fileId }</p>
                                <p>{ that.state.fileUrl[key].url[0] }</p>
                                <img src={ that.state.fileUrl[key].url[0] }/>
                            </div>
                        })
                    }
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: html}}>
					
				</div>
            </div>            
		);
	}
}

export default connect()(CSSModules(FileUploaderPage,css));