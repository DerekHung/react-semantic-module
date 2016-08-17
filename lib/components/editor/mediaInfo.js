"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mediaInfo = {
    IMAGE: {
        multiAction: [{
            "param": {
                "basis": "9",
                "width": "625",
                "height": "0"
            },
            "isSave": "1",
            "method": "resize",
            "tag": "activityM"
        }, {
            "param": {
                "basis": "4",
                "width": "200",
                "height": "150"
            },
            "isSave": "1",
            "method": "resize",
            "tag": "activityS"
        }]
    },
    VIDEO: {
        "multiAction": [{
            "method": "videoSnap",
            "param": {
                "sec": "1"
            },
            "tag": "activityProcess"
        }, {
            "method": "resize",
            "tag": "activityList",
            "isSave": "1",
            "refTag": "activityProcess",
            "param": {
                "width": "200",
                "basis": "9"
            }
        }, {
            "method": "resize",
            "tag": "activityGrid",
            "isSave": "1",
            "refTag": "activityProcess",
            "param": {
                "width": "800",
                "basis": "9"
            }
        }, {
            "method": "videoConvert",
            "isSave": "1",
            "param": {
                "videoQuality": ["720p"]
            }
        }],
        "convert": "true"
    },
    DOCUMENT: {
        "multiAction": [{
            "method": "docConvert",
            "param": {
                "width": "1600",
                "isBaseByWidth": "true"
            },
            "tag": "activityPlay"
        }, {
            "method": "docSnap",
            "tag": "activityList",
            "isSave": "1",
            "param": {
                "width": "200",
                "basis": "9",
                "page": "0"
            }
        }, {
            "method": "docSnap",
            "tag": "activityGrid",
            "isSave": "1",
            "param": {
                "width": "800",
                "basis": "9",
                "page": "0"
            }
        }],
        "convert": "true"
    },
    AUDIO: {
        "multiAction": [{
            "method": "audioConvert",
            "isSave": "1"
        }]
    }
};

exports.default = mediaInfo;