'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = exports.MIMEMap = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getAtomicType = getAtomicType;
exports.getSignature = getSignature;
exports.uploadToS3 = uploadToS3;
exports.getFileUrl = getFileUrl;
exports.waitUrlSuccess = waitUrlSuccess;
exports.getURLData = getURLData;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIMEMap = {
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
	'audio/mpeg': 'AUDIO',
	'audio/x-m4a': 'AUDIO',
	'audio/mp4': 'AUDIO',
	'audio/m4a': 'AUDIO',
	'video/3gpp': 'VIDEO',
	'video/mpeg': 'VIDEO',
	'video/x-msvideo': 'VIDEO',
	'video/x-ms-wmv': 'VIDEO',
	'video/vnd.uvvu.mp4': 'VIDEO',
	'video/mp4': 'VIDEO',
	'video/x-flv': 'VIDEO',
	'video/webm': 'VIDEO'
};
exports.MIMEMap = MIMEMap;
function getAtomicType(MIMEType) {
	if (typeof _get__('MIMEMap')[MIMEType] !== 'undefined') {

		return _get__('MIMEMap')[MIMEType];
	} else {
		console.log('this type is not support');
	}
}
function getSignature(file, dataInfo) {
	var jsonDataForSig = {
		apnum: dataInfo.apnum,
		pid: dataInfo.pid,
		contentType: file.type,
		contentDisposition: file.name,
		isP: 1,
		extra: dataInfo.extra,
		title: 'fileUploader',
		description: 'fileUploader'
	};
	return new Promise(function (resolve, reject) {
		_get__('$').ajax({
			method: 'POST',
			url: location.protocol + '//docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/signature',
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			data: JSON.stringify(jsonDataForSig)
		}).done(function (result) {
			resolve(result);
		});
	});
}
function uploadToS3(file, jsonDataForUpload) {
	var formData = new FormData();
	formData.append('key', jsonDataForUpload.objectKey);
	formData.append('content-type', file.type);
	formData.append('acl', 'authenticated-read');
	formData.append('AWSAccessKeyId', jsonDataForUpload.AWSAccessKeyId);
	formData.append('policy', jsonDataForUpload.policyDocument);
	formData.append('signature', jsonDataForUpload.signature);
	formData.append('file', file);
	formData.append('Content-Disposition', file.name);
	return new Promise(function (resolve, reject) {
		_get__('$').ajax({
			method: 'POST',
			url: location.protocol + '//docapi-staging-originbucket-1s73tnifzf5z3.s3.amazonaws.com',
			processData: false,
			contentType: false,
			data: formData
		}).done(function () {
			return resolve();
		});
	});
}
function getFileUrl(fileId, type, tagArr) {
	var params = {};
	params.timestamp = Math.floor(Date.now() / 1000) + 1800;
	params.getFileArr = [];
	//console.log(type);
	if (!tagArr || tagArr.length === 0) {
		params.getFileArr.push({
			fileId: fileId,
			protocol: "common"
		});
	}
	for (var i in tagArr) {
		if (tagArr[i]) {
			if (type === 'DOCUMENT' && tagArr[i] === 'activityPlay') {
				params.getFileArr.push({
					fileId: fileId,
					protocol: "common",
					fileTag: tagArr[i],
					page: '-1'
				});
			} else {
				params.getFileArr.push({
					fileId: fileId,
					protocol: "common",
					fileTag: tagArr[i]
				});
			}
		} else {
			params.getFileArr.push({
				fileId: fileId,
				protocol: "common"
			});
		}
	}
	if (params.getFileArr.length === 0 && type === 'HYPERLINK') {
		params.getFileArr.push({
			fileId: fileId,
			protocol: "common",
			fileTag: "hyperlink"
		});
	}
	//console.log(params.getFileArr);
	return _get__('$').ajax({
		method: 'POST',
		url: location.protocol + '//docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/getFileUrl',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(params)
	});
}

function waitUrlSuccess(id, type, tagArr) {
	return new Promise(function (resolve, reject) {
		var time = 0;
		var loop = function loop() {
			return _get__('getFileUrl')(id, type, tagArr).done(function (res) {
				if (res[0].convertStatus === 'success') {
					resolve(res);
				} else if (res[0].convertStatus === 'noResponse') {
					reject();
				} else {
					setTimeout(function () {
						time = time + 500;
						loop();
					}, 500);
				}
			});
		};
		loop();
	});
}

function getURLData(apnum, pid, url, tag) {
	var jsonData = {
		apnum: apnum,
		pid: pid,
		isP: 0,
		urlList: [{
			url: url,
			tag: tag
		}]
	};
	return _get__('$').ajax({
		method: 'POST',
		url: location.protocol + '//docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/htmlConvert',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify(jsonData)
	});
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

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _get_original__(variableName);
	} else {
		var value = _RewiredData__[variableName];

		if (value === INTENTIONAL_UNDEFINED) {
			return undefined;
		} else {
			return value;
		}
	}
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'MIMEMap':
			return MIMEMap;

		case '$':
			return _jquery2.default;

		case 'getFileUrl':
			return getFileUrl;
	}

	return undefined;
}

function _assign__(variableName, value) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return _RewiredData__[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
		Object.keys(variableName).forEach(function (name) {
			_RewiredData__[name] = variableName[name];
		});
	} else {
		if (value === undefined) {
			_RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
		} else {
			_RewiredData__[variableName] = value;
		}

		return function () {
			_reset__(variableName);
		};
	}
}

function _reset__(variableName) {
	delete _RewiredData__[variableName];
}

function _with__(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			_RewiredData__[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = _RewiredData__[variableName];
			_RewiredData__[variableName] = object[variableName];
		});
		var result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
exports.default = _RewireAPI__;