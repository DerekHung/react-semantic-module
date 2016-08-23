import $ from 'jquery';

const MIMEMap = {
	'image/jpeg': 'IMAGE',
	'image/png': 'IMAGE',
	'image/gif': 'IMAGE',
	'image/bmp': 'IMAGE',
	'image/vnd.wap.wbmp': 'IMAGE',
	'application/pdf': 'DOCUMENT',
	/*
	'application/vnd.oasis.opendocument.presentation': 'DOCUMENT',
	'application/vnd.oasis.opendocument.text': 'DOCUMENT',
	*/
	'application/msword': 'DOCUMENT',
	'application/rtf': 'DOCUMENT',
	'application/vnd.ms-powerpoint': 'DOCUMENT',
	'application/vnd.ms-powerpoint.slideshow.macroenabled.12': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.presentationml.template': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCUMENT',
	'application/vnd.ms-powerpoint.template.macroenabled.12': 'DOCUMENT',
	'audio/x-wav': 'AUDIO',
	'audio/x-ms-wma': 'AUDIO',
	'audio/mp3': 'AUDIO',
	'audio/m4a': 'AUDIO',
	'video/3gpp': 'VIDEO',
	'video/mpeg': 'VIDEO',
	'video/x-msvideo': 'VIDEO',
	'video/x-ms-wmv': 'VIDEO',
	'video/vnd.uvvu.mp4': 'VIDEO',
	'video/mp4':'VIDEO',
	'video/x-flv': 'VIDEO',
	'video/webm': 'VIDEO',
};
export { MIMEMap };

export function getAtomicType(MIMEType) {
	if( typeof(MIMEMap[MIMEType])!=='undefined' ) {

		return MIMEMap[MIMEType];
	}else {
		console.log('this type is not support');
	}
}
export function getSignature (file, dataInfo){
	let jsonDataForSig = {
		apnum: dataInfo.apnum,
		pid: dataInfo.pid,
		contentType: file.type,
		contentDisposition: file.name,
		isP: 1,
		extra: dataInfo.extra,
		title:'fileUploader',
		description: 'fileUploader'
	};
	return new Promise(function(resolve, reject){
		$.ajax({
			method: 'POST',
			url: 'http://docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/signature',
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			data: JSON.stringify(jsonDataForSig)
		}).done((result) => {
			resolve(result);
		});
	})
	
	
}
export function uploadToS3(file, jsonDataForUpload){
	let formData = new FormData();
	formData.append('key', jsonDataForUpload.objectKey);
	formData.append('content-type', file.type);
	formData.append('acl', 'authenticated-read');
	formData.append('AWSAccessKeyId', jsonDataForUpload.AWSAccessKeyId);
	formData.append('policy', jsonDataForUpload.policyDocument);
	formData.append('signature', jsonDataForUpload.signature);
	formData.append('file', file);
	formData.append('Content-Disposition', file.name);
	return new Promise(function(resolve, reject){ 
		$.ajax({
			method: 'POST',
			url: 'http://docapi-staging-originbucket-1s73tnifzf5z3.s3.amazonaws.com',
			processData: false,
			contentType: false,
			data: formData
		}).done(() => resolve());
	});
}
export function getFileUrl(fileId) {
	var params = {};
	params.timestamp = Math.floor(Date.now()/1000) + 1800;
	params.getFileArr = [
		{
			fileId: fileId,
			protocol: "http",
		}	
	];
	return	$.ajax({
			method: 'POST',
			url: 'http://docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/getFileUrl',
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			data: JSON.stringify(params)
		})
}

export function waitUrlSuccess(id) {
	return new Promise(function(resolve, reject){
		let time = 0;
		let loop = () => getFileUrl(id).done(function(res){
			if(res[0].convertStatus === 'pending' || res[0].convertStatus === 'uploading') {
				setTimeout(() => {
					time = time + 500;
					loop();
				},500);
				
			}else if( res[0].convertStatus === 'success'){
				resolve(res);
			}else if( res[0].convertStatus === 'noResponse' ) {
				reject();
			}
		});
		loop(); 
	})
	
}

export function getURLData(apnum, pid, url, tag){
	let jsonData = {		
		apnum: apnum,
		pid: pid,
		isP: 0,
		urlList:[{
			url: url,
			tag: tag
		}]
	} 
	return $.ajax({
		method: 'POST',
		url: 'http://docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/htmlConvert',
		contentType: 'application/json; charset=utf-8',
		dataType:'json',
		data: JSON.stringify(jsonData),
	})
}


/*
export function fileUpload (pid, file){
	getSignature(file).done(function(jsonDataForUpload){
		callback.signatureDone(jsonDataForUpload);
		uploadToS3(jsonDataForUpload, file).done(function(){
			callback.uploadDone();
		})
	})

	let callback = new Object;
	let signatureDone = function(f){
		f();
		return callback;
	}
}

fileUpload(pid,file).signatureDone(function(res){

}).uploadDone(function(res){

})*/