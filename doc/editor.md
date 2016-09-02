### Data Fetching

同 TextFeild的用法，使用onChange Event來取得即時的rawState

``` xml

/* event */
onChange( constentState ){
	// EitorState的 contentState 
}

onUploadStatusChange(status) {
	// status 是一個物件，目前裡面只有loading  未來可視需求增加
	this.setState({
		uploading: status.uploading
	})
}

/* jsx component */
<Editor onChange={this.onChange}
		content={rawState}
		mentions={mentions}
		readOnly={false}
		/>

```

### Method

``` xml

let object = this.refs.editor.getFileUploadObject();

object = {
	ID0: {
		entityKey: number,
		fileData: object, // 詳情參照fileUploader file system
		fileId: string,
		fileProps: object, //private use 
		generator: Generator //private use
	},
	ID1: {},
	ID2: {},
	...
}

```

### tag mention

mention 功能使用了 draft-js-mention-pludgin  詳細使用可以參考github

我們在這邊只需要把預存好的friend list轉換成他可以吃的結構

最後再轉換成immutable object 丟進去editor即可

``` javascript
let metion = [];

$.each(testData.response, function(index,value){
	let item = {link: value.pid, name: value.userName, avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'};
	metion.push(item);
})

import { fromJS } from 'immutable';
let mentions = fromJS(mention);
```
### Styling

Editor Element 會延展寬高到100％，因此要控制寬高請在外面多包一層div

``` xml

<div styleName="yourStyle">
	<Editor />
</div>

```

### Properties

|Name|Description|
|----|--------------|
|apnum|使用fileupload的時候需要|
|pid|使用fileupload的時候需要|
|placeholder|輸入框的placeholder|
|content|傳入與rawstate相同結構的json object 即可產生有預設內容的Editor|
|readOnly|true則不能編輯（純顯示）|
|mediaInfo|要給fileuploader讀的multiaction參數（詳見fileUploader 文件）|

### data conversion

這邊用了兩個套件
draft-js-export-html : 輸出html string
draft-js-import-html : 讀入html string 轉換成 draft data model

``` javascript
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';


htmlString = stateToHTML(this.contentState);
//送給api 的html字串
HTMLtoState: convertToRaw(stateFromHTML(htmlString));
<Editor content={HTMLtoState} />
```