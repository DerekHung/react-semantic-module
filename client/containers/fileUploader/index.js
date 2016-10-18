import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import css from './style.css';
import { connect } from 'react-redux';

import FileUploader from '../../components/fileUploader';
import html from 'doc/fileUploader.md';

const mediaInfo = {
	IMAGE: {
        uploadInfo: {
            "multiAction":[
                {
                    "param": {
                        "basis": "9",
                        "width" : "200",
                        "reduceOnly" : "1"
                    },
                    "isSave": "1",
                    "method": "resize",
                    "tag": "activityList"
                },
                {
                    "param": {
                        "basis": "9",
                        "width" : "800",
                        "reduceOnly" : "1"
                    },
                    "isSave": "1",
                    "method": "resize",
                    "tag": "activityGrid"
                },
                {
                    "param": {
                        "basis": "9",
                        "width" : "1600",
                        "reduceOnly" : "1"
                    },
                    "isSave": "1",
                    "method": "resize",
                    "tag": "activityPlay"
                }
            ]
        },
		snapTag: ''
	},

	VIDEO: {
        uploadInfo: {
            "multiAction": [
                {
                    "param": {
                        "sec": "5"
                    },
                    "isSave": "1",
                    "method": "videoSnap",
                    "tag": "activityProcess"
                },
                {
                    "param": {
                        "basis": "9",
                        "width": "200",
                        "reduceOnly" : "1"
                    },
                    "isSave": "1",
                    "method": "resize",
                    "refTag": "activityProcess",
                    "tag": "activityList"
                },
                {
                    "param": {
                        "basis": "9",
                        "width": "800",
                        "reduceOnly" : "1"
                    },
                    "isSave": "1",
                    "method": "resize",
                    "refTag": "activityProcess",
                    "tag": "activityGrid",
                },
                {
                    "param":{
                        "videoQuality":["720p"]
                    },
                    "isSave": "1",
                    "method": "videoConvert"
                }
            ],
            "convert": "true"
        },
        snapTag: 'activityProcess'
	},

	DOCUMENT: {
        uploadInfo: {
            "multiAction": [
                {
                    "param": {
                        "width": "1600",
                        "isBaseByWidth": "true"
                    },
                    "isSave": "1",
                    "method": "docConvert",
                    "tag": "activityPlay"
                },
                {
                    "param": {
                        "basis": "9",
                        "width": "200",
                        "page": "0"
                    },
                    "isSave": "1",
                    "method": "docSnap",
                    "tag": "activityList"
                },
                {
                    "param": {
                        "basis": "9",
                        "width": "800",
                        "page": "0"
                    },
                    "isSave": "1",
                    "method": "docSnap",
                    "tag": "activityGrid"
                }
            ],
            "convert": "true"
        },
        snapTag: 'activityList'
	},

	AUDIO: {
        uploadInfo: {
            "multiAction": [
                {
                    "isSave": "1",
                    "method": "audioConvert"
                }
            ]
        },
        snapTag: ''
	}
}

class FileUploaderPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileId: null,
            uploaded: 'none',
            fileType: null
        }
        this.onTriggerUpload = (e) => {
            this.setState({
                fileId: null,
                uploaded: 'none',
                fileUrl: ''
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
            this.setState({ fileUrl: file.transformedFile[0].url[0]});
        }
    }
	render() {
        let result;
        if( this.state.fileUrl ) {
            if( this.state.fileType === 'IMAGE') { result = <img src={this.state.fileUrl} />}
            else if( this.state.fileType === 'VIDEO') { result = <video src={this.state.fileUrl} /> }
            else if( this.state.fileType === 'AUDIO') { result = <audio controls src={this.state.fileUrl} /> }
            else if( this.state.fileType === 'DOCUMENT') { }
            else { result = null; }
        }
        
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
					{ result }
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: html}}>
					
				</div>
            </div>            
		);
	}
}

export default connect()(CSSModules(FileUploaderPage,css));