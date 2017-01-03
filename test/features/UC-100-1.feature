# language: zh-TW

Feature: 發問
    In order to 知道某個問題的解答
    As a 使用者
    I want to 在平台上發起一個問題，除非這個問題已經有人問過了

Scenario: 進入首頁要能看到發問的地方
    Given 使用者進入請益首頁
    When 頁面載入完畢
    Then 頁面上要有發問輸入框

Scenario: 輸入框要能輸入並且有字數限制
    Given 使用者輸入任何文字
    When 檢查字數
    Then 顯示剩餘多少字數
    When 大於"200"字
    Then 使用者無法繼續輸入
    And 剩餘字數變成""色
    And 送出按鈕變成灰色無法點擊

Scenario: 輸入的時候要搜尋其他人問過的問題
    Given 使用者每輸入"1"個文字
    When 呼叫搜尋api
    Then 輸入框下方出現別人問過的問題
    And 問題中的文字有使用者輸入的內容要呈現""色
    When 使用者點擊任何一個問題
    Then 開新的分頁顯示問題master頁

Scenario: 使用者按下送出按鈕
    Given 點擊送出鈕
    When 取得使用者輸入的內容
    And 發送api，回傳成功訊息
    Then 首頁出現剛剛輸入的問題
    And 問題要在最上面

Scenario: API沒有回應
    Given 使用者點擊送出鈕
    When 發送api
    And API沒有回應
    Then 顯示"系統忙碌中請稍後再試" 確認框