import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import css from './style.css';
import { connect } from 'react-redux';

import FileUploader from '../../components/fileUploader';
import html from 'doc/fileUploader.md';

const testMedia = {
    IMAGE: {
        multiAction:[
                    {
                        "param": {
                            "basis": "9",
                            "width" : "625",
                            "height" : "0"
                        },
                        "isSave": "1",
                        "method": "resize",
                        "tag": "activityM"
                    },
                    
                    {
                        "param": {
                            "basis": "4",
                            "width" : "200",
                            "height" : "150"
                        },
                        "isSave": "1",
                        "method": "resize",
                        "tag": "activityS"
                    }

                ]
    },
    VIDEO: {
        "multiAction": [
                       {
                            "method": "videoSnap",
                            "param": {
                                "sec": "1"
                            },
                            "tag": "activityProcess"
                        },
                        {
                            "method": "resize",
                            "tag": "activityList",
                            "isSave": "1",
                            "refTag": "activityProcess",
                            "param": {
                                "width": "200",
                                "basis": "9"
                            }
                        },
                        {
                            "method": "resize",
                            "tag": "activityGrid",
                            "isSave": "1",
                            "refTag": "activityProcess",
                            "param": {
                                "width": "800",
                                "basis": "9"
                            }
                        },
                        {
                            "method": "videoConvert",
                            "isSave": "1",
                            "param":{
                                "videoQuality":["720p"]
                            }
                        }
                    ],
                    "convert": "true"
    },
    DOCUMENT: {
        "multiAction": [
                       {
                            "method": "docConvert",
                            "param": {
                                "width": "1600",
                                "isBaseByWidth": "true"
                            },
                            "tag": "activityPlay"
                        },
                        {
                            "method": "docSnap",
                            "tag": "activityList",
                            "isSave": "1",
                            "param": {
                                "width": "200",
                                "basis": "9",
                                "page": "0"
                            }
                        },
                        {
                            "method": "docSnap",
                            "tag": "activityGrid",
                            "isSave": "1",
                            "param": {
                                "width": "800",
                                "basis": "9",
                                "page": "0"
                            }
                        }
                    ],
                    "convert": "true"
    },
    AUDIO: {
         "multiAction": [
                        {
                            "method": "audioConvert",
                            "isSave": "1"
                        }
                    ]
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
            else if( this.state.fileType === 'AUDIO') { result = <audio src={this.state.fileUrl} /> }
            else if( this.state.fileType === 'DOCUMENT') { }
            else { result = null; }
        }
        
		return (
            <div>
                <h3>File Uploader</h3>
                <FileUploader apnum="10400"
                            pid="10400"  
                            mediaInfo={testMedia}
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