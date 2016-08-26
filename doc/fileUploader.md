### Usage

FileUploader 提供以下功能：
1. 自定義uploader樣式（包覆區塊皆為點擊觸發點）
2. 上傳檔案格式過濾（ 格式定義於 utils/fileupload.js ）
3. getSignature -> uploadToS3 -> getUrl(直到convert success) 一次跑完，並且每個階段完成時發出事件通知父層
4. error handle （待補）
5. 新增一個物件（ call by value ）回報機制可以完整看到目前檔案的所有狀態


``` xml

/* jsx component */
<FileUploader   apnum="10400"
                pid="10400"  
                mediaInfo={testMedia}
                onTriggerUpload={this.onTriggerUpload}
                getFileInfo={this.getFileInfo}
                getSignatureDone={this.getSignatureDone}
                uploadToS3Done={this.uploadToS3Done}
                urlTransformDone={this.urlTransformDone}>
    /* 自定義component樣式 */
    <button styleName="button">
        上傳檔案
    </button>
    /**********************/
</FileUploader>

```

### Object system

``` javascript

fileSystem = {
    id: String,  //程式內部自己辨識用的獨有ID
    originFile: Object, // Data from fileInput
    signature: Object, //getSignature的結果
    status: String, //上傳狀態，分成 init / uploading/ uploadDone/ transformDone
    transformFile: Object, // 轉檔完成才會有資料
    type: String //檔案類型 IMAGE/ AUDIO/ VIDEO/ DOCUMENT
}


```

### Properties

|Name|required|Description|
|----|---|-----------|
|apnum|true|plus apnum|
|pid|true|使用者id|
|mediaInfo|true|API extra info by type|
|dontWaitSuccess|false|如果為true則不會call getfileUrl|

### Event

``` javascript
onTriggerUpload (e) => {
    //點擊upload按鈕的事件
    //e : touch event
}

### 注意只有這個event回傳的object是call bt reference！
getFileInfo (fileSystem) => {
    //選擇檔案之後觸發的事件
    //f => 選取的file
    //type => file type ( VIDEO, IMAGE, AUDIO, DOCUMENT )
}
###

getSignatureDone (fileSystem) => {
    //取得註冊的資訊
    //signature => include fileId data
}
uploadToS3Done (fileSystem) => {
    //上傳到s3完成的事件
}
urlTransformDone (fileSystem) => {
    //轉檔完成的事件
    // result => getfileUrl API 回傳的結果
}
```
### mediaInfo (自定義)
example：

``` javascript
{
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
```