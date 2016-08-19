import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import css from './style.css';
import { MIMEMap, getSignature, uploadToS3, getFileUrl, waitUrlSuccess } from '../../utils/fileUpload.js';

if ( typeof(regeneratorRuntime) === 'undefined' ) require('babel-polyfill');

class FileUploader extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = (e) => { 
            if( this.props.onTriggerUpload ) this.props.onTriggerUpload(e);
            this.refs.fileInput.click()
        }
        this.cleanInput = () => { if( this.refs.fileInput ) this.refs.fileInput.value = null; }

        this.handleFileInput = (e) => this._handleFileInput(e);
    
        this.generatorProcess = function* (f, signatureData){
            let signature = yield getSignature(f, signatureData);
            if( this.props.getSignatureDone ) this.props.getSignatureDone(signature);

            let uploadS3 = yield uploadToS3(f, signature);
            if( this.props.uploadToS3Done ) this.props.uploadToS3Done();

            if ( !this.props.dontWaitSuccess ) {
                let fileData = yield waitUrlSuccess(signature.fileId);
                if( this.props.urlTransformDone ) this.props.urlTransformDone(fileData[0]);
            }

            this.cleanInput();
        }

        this.runGenerator = (gen) => {
            
            function go( result ) {
                if( result.done ) return;
                console.log(result.value);
                result.value.then((r) => {
                    console.log(r);
                    go( gen.next(r));
                });
            }
            go(gen.next());
        }
    }
    _handleFileInput(e) {
        console.log(this.props);
        let files = Array.prototype.slice.call(e.target.files, 0);
        let signatureData = {
            apnum: this.props.apnum,
            pid: this.props.pid
        }
        let that = this;

        files.forEach(f => {
            if( typeof(MIMEMap[f.type]) !== 'undefined' ) {
                if ( that.props.getFileInfo ) that.props.getFileInfo( f, MIMEMap[f.type]);
                signatureData.extra = that.props.mediaInfo[MIMEMap[f.type]];
                let gen = that.generatorProcess(f, signatureData);
                that.runGenerator(gen);
            }
        });
    }
	render() {
		return (
            <span styleName="fileUpload" onClick={this.handleClick} className={this.props.className}>
                { this.props.children }
                <input type="file" ref="fileInput" style={{ display: 'none' }}
						 onChange={this.handleFileInput}/>
            </span>  
		);
	}
}

export default CSSModules(FileUploader,css);