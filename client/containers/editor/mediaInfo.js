const mediaInfo = {
	IMAGE: {
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

	VIDEO: {
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

	DOCUMENT: {
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

	AUDIO: {
        "multiAction": [
            {
                "isSave": "1",
                "method": "audioConvert"
            }
        ]
	}
}
export default mediaInfo;