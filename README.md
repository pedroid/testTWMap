This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## First Step

```
  git clone this repo

  cd project name

  npm install

  npm run dev

  開始開發!!
```


## Available Scripts

### 開發模式
  此模式下 支援 hot reload

  修改完程式碼 頁面會自動更新

  ```shell
    npm run dev
  ```

### 測試 Production 
  此模式下 會自動build project 並 serve

  用於測試 正式環境
  ```shell
    npm start
```

### GithubPage Host 
  先修改 `package.json` 內的 `homepage` 位置
  ```
    {
      ...
      "homepage": "https://kennedy0527.github.io/TwMapTest/",
      ...
    }
  ```
  再執行以下 script
  ```shell
  npm run deploy
  ```

## 資料夾結構

`assets` 資料夾內 包含`依各國名稱`建立的資料夾 於其內 `topoJson` 跟 `data` 資料

`MapSources.js` 是為了方便一次匯入多筆 `topoJson` 與 `data` 資料 而特別獨立的js

**目前只有 `台灣` 資料是最齊全完善的**

**建立 `MapSources.js` 請參考台灣的[檔案]((https://github.com/kennedy0527/TwMapTest/blob/bec3912899532a800c417a5ed7f1c6baff76b535/src/assets/Taiwan/MapSources.js#L1-L16))**

如須 建立它國 請參照以下架構

```
China
├── MapSources.js
├── county.topo.json
├── county_data.json
├── township.topo.json
├── township_data.json
├── village.topo.json
└── village_data.json
```
### 新增國別
此部分 除了參照上方的架構去新增檔案

程式部分也要進行修改

`Map.js`, `County.js`, `Township.js`, `Village.js`內

牽扯到 `switch (country)`

都需進行修改（可以透過IDE Find `switch (country)`）

`country`這個變數為 國別縮寫string

目前已有的是 `tw` 與 `kr`

若要新增中國 可以加入 `cn` 

ex:

```javascript
  switch (country) {
    case 'cn':
    ...
  }
```
來進行 中國 topoJson 的 特別處理


## Data Template 的輸出方式
  意指 由`topoJson` 產出 `county_data`, `township_data`, `village_data` 三個json檔案

  請參考 [註解](https://github.com/kennedy0527/TwMapTest/blob/bec3912899532a800c417a5ed7f1c6baff76b535/src/Map/Map.js#L424-L431)

## Data 資料
  目前已台灣為例 由於data template已產出

  所以 以實際使用上該資料了(初始化資料)

  可以參考[這個片段](https://github.com/kennedy0527/TwMapTest/blob/bec3912899532a800c417a5ed7f1c6baff76b535/src/Map/Map.js#L408-L457)

  若要更改為 fetch api的方式

  就是將這個片段
  ```javascript
    import('xxxx')
      .then(...)
      .catch(...)
  ```

  更改為

  ```javascript
    fetch('your api url')
      .then(...)
      .catch(..)
  ```
  即可

  但要注意的是`MapSorces.js`內 有包含`topoJson`
  
  若僅需fetch data 那麼 `import可以保留, 內部加入fetch` 即可

  完整資料處理過程 可以參考

  `dealwithCountyData` [代碼片段](https://github.com/kennedy0527/TwMapTest/blob/bec3912899532a800c417a5ed7f1c6baff76b535/src/Map/Map.js#L49)

  `dealwithTownshipData` [代碼片段](https://github.com/kennedy0527/TwMapTest/blob/bec3912899532a800c417a5ed7f1c6baff76b535/src/Map/Map.js#L138)

  `dealwithVillageData` [代碼片段](https://github.com/kennedy0527/TwMapTest/blob/bec3912899532a800c417a5ed7f1c6baff76b535/src/Map/Map.js#L227)

## 使用方式

  ```javascript
    import Map, { MapManager } from './Map/index';

    <Map
      ref={ref => this.mapRef = ref}
      country={'tw'}
    />
  ```
  `country` 值為國別名稱, 目前僅支援 `tw`, `kr`

## Map
  此為 `React Component`

  透過 `Ref` 可以 使用其 methods

### goto_county (code)
### goto_township (code)
### goto_village (code)
  此三個Methods 為 `Zoom In` 至 指定 縣市/鄉鎮區/村里
  ```javascript
    this.mapRef.goto_county('64000')
  ```
### zoom_fit()
  此 Method 為 回到`最初`的 zoom 點
  ```javascript
    this.mapRef.zoom_fit()
  ```
## zoom_out()
  此 Method 為 回到`上一個` zoom 點 
  ```javascript
    this.mapRef.zoom_out()
  ```
## exportToPNG()
  此 Method 為 輸出目前 svg的viewport 為`png圖檔`
  ```javascript
    this.mapRef.exportToPNG()
  ```
## MapManager
  此 `Class` 提供 資料操作之相關methods

### init ()
  此 Method 是用來 `reset` 所有class內的資料

  通常用於 `國別` 切換時
  ```javascript
    MapManager.init()
  ```

### onSubscribe (code, event)
  此 Method 用於 將path color updater 存進 class 內
  ```javascript
    function updateColor() {
      ...
    }

    MapManager.onSubscribe('64000', updateColor);
  ```

### getData (type, code)
  此 Method 用於取得資料
  
  type 僅支援以下三個`string`

  |  string    |  說明  |
  | ---------- | ----- |
  | 'county'   | 縣市   |
  | 'township' | 鄉鎮區 |
  | 'village'  | 村里   |

  ```javascript
    MapManager.getData('county', '64000')
  ```

### setCountyData (code, data)
### setTownshipData (code, data)
### setVillageData (code, data)
  此三個Methods 用於 儲存`預設資料`

  `data` 結構 都一樣
  ```
  {
    name: xxx
    data: xxx,
    description: xxx
  }
  ```
  ```javascript
  MapManager.setCountyData('64000', {
    name: '高雄市',
    data: 99,
    description: '我是高雄市的描述內容'
  })
  ```
### set_county_data (code, data)
### set_township_data (code, data)
### set_village_data (code, data)
  此三個Methods 用於 修改 `data`值

  ```javascript
    MapManager.set_county_data('64000', 50);
  ```

### set_county_description (code, data)
### set_township_description (code, data)
### set_village_description (code, data)
  此三個Methods 用於 修改 `description`值
  ```javascript
    MapManager.set_county_datadescription('64000', '我才不是台南市');
  ```

### getColor (value)
  此Method 用於 取得傳入`數值` 所屬的`顏色`
  ```javascript
    MapManager.getColor(50);
  ```
### setColor (min, max, lightest, deepest)
  此Method 用於 修改預設的 Color scale linear

  color 支援 hex rgb hsl 與 name

  參考 (https://www.w3schools.com/colors/colors_picker.asp)
  ```javascript
    MapManager.setColor(10 , 80, '#ff99cc', '#ff1a8c');
  ```
