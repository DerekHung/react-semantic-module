import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import css from './style.css';
import { getAtomicType, getSignature, uploadToS3, getFileUrl, waitUrlSuccess } from '../../utils/fileUpload.js';
import IDMaker from '../../utils/IDMaker.js';

if ( typeof(regeneratorRuntime) === 'undefined' ) require('babel-polyfill');




class FileUploader extends Component {
    constructor(props) {
        super(props);

        this.counter = 0;
        this.fileList={};

        let tagArrMap = {};
        for ( let key in props.mediaInfo ) {
            if( typeof(tagArrMap[key]) === 'undefined' ) tagArrMap[key] = [];
            for ( let i in props.mediaInfo[key].multiAction) {
                tagArrMap[key].push(props.mediaInfo[key].multiAction[i].tag);
            }
        }
        this.handleClick = (e) => { 
            if( this.props.onTriggerUpload ) this.props.onTriggerUpload(e);
            this.refs.fileInput.click()
        }
        this.cleanInput = () => { if( this.refs.fileInput ) this.refs.fileInput.value = null; }

        this.handleFileInput = (e) => this._handleFileInput(e);
        
        this.logObject = (object) => { return Object.assign({}, object); }

        this.generatorProcess = function* (ID, signatureData){

            if( this.fileList[ID] ) {

                let signature = yield getSignature(this.fileList[ID].originFile, signatureData);
                this.fileList[ID].signature = signature;
                this.fileList[ID].status = 'uploading';
                //this.fileList[ID].snapTag = snap;
                if( this.props.getSignatureDone ) this.props.getSignatureDone(this.logObject(this.fileList[ID]));

                let uploadS3 = yield uploadToS3(this.fileList[ID].originFile, signature);
                this.fileList[ID].status = 'uploadDone';
                if( this.props.uploadToS3Done ) this.props.uploadToS3Done(this.logObject(this.fileList[ID]));

                if ( !this.props.dontWaitSuccess ) {
                    this.fileList[ID].status = 'transforming';
                    this.fileList[ID].transformedFile = yield waitUrlSuccess(signature.fileId, this.fileList[ID].type, tagArrMap[this.fileList[ID].type]);
                    this.fileList[ID].status = 'transformDone';
                    if( this.props.urlTransformDone ) this.props.urlTransformDone(this.logObject(this.fileList[ID]));
                }

                this.cleanInput();
            }
        }

        this.runGenerator = (gen) => {
            
            function go( result ) {
                if( result.done ) return;
                result.value.then((r) => {
                    go( gen.next(r));
                });
            }
            go(gen.next());
        }
    }
    _handleFileInput(e) {
        let files = Array.prototype.slice.call(e.target.files, 0);
        
        //let snap ='';
        let that = this;

        files.forEach(f => {

            console.log(f);
            

            let AtomicType = getAtomicType(f.type);
            if( AtomicType) {

                this._checkImageClientSize(AtomicType, f, this._uploadProcess.bind(this));

            }
        });
    }
    
    _checkImageClientSize(AtomicType, f, _callback) {

        console.log(AtomicType);

        if(f.size > 9000000) {
            if(this.props.onBlockingUpload) this.props.onBlockingUpload('請選擇容量小於 10 MB的圖片');
            return false;
        }

        var reader = new FileReader();
        var img = new Image();

        reader.onload = function(e) {
            img.src = e.target.result;
        }

        img.onload = function() {
            console.log(this.width);
            console.log(this.height);
            if( this.width > 9999 || this.height > 9999){
                if(this.props.onBlockingUpload) this.props.onBlockingUpload('請選擇寬小於 9999 像素和高小於 9999 像素的圖片');
                return false;
            }
            _callback(AtomicType, f);
        }

        reader.readAsDataURL(f);
    }

    _uploadProcess(AtomicType, f){
        const ID = IDMaker(3, this.counter);
        let signatureData = {
            apnum: this.props.apnum,
            pid: this.props.pid
        }
        this.counter++;

        this.fileList[ID] = {
            id: ID,
            type: AtomicType,
            originFile: f,
            status: 'initial',
            transformedFile: null
        }

        if ( this.props.getFileInfo ) this.props.getFileInfo( this.fileList[ID] );
        signatureData.extra = this.props.mediaInfo[AtomicType];
        let gen = this.generatorProcess(ID, signatureData);
        this.runGenerator(gen);
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