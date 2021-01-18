expense-tracker
===
expense-tracker 是一個可以協助你紀錄支出項目的網頁<br> 

Features
============
-----2020/12/26-----
1. 使用者可瀏覽所有支出
2. 使用者可瀏覽不同分類的支出
3. 使用者可新增支出項目
4. 使用者可修該支出項目
5. 使用者可刪除支出項目 <br>
-----2021/01/18------
6. 新增登入及註冊系統
7. 新增Google登入功能
8. 新增以月份篩選支出記錄功能



prerequisites
================

## global packages

1. Node.js: v10.15.0 
2. nodemon: v2.0.6
3. npm: v6.4.1

## local packages

可於專案的 `package.json` 中查閱 `dependencies` 部分。<br> 

## database related

1. mongoDB: v4.2.11
2. Robo 3T: v1.4.2

installation and execution
=======

指令部分可參閱 `package.json` 中查閱 `scripts` 部分。<br> 

1. clone 這個專案，在終端機輸入:
```
git clone https://github.com/Jackson162/expense-tracker.git
```
2.  進入專案根目錄，安裝本地套件 (local packages)，在終端機輸入: 
```
npm install
```
3. 確認 mongoDB 執行後，連結 Robo 3T，建立一個空資料庫，命名為:
```
expense-tracker
```
4. 在終端機輸入指令來連結資料庫並新增種子資料(請先確認資料庫是空的):
```
npm run seed
```
5. 啟動伺服器，執行專案:
```
npm run dev
```
6. 打開瀏覽器，搜尋:
```
http://localhost/3000
```
7. 使用假帳號登入:
```
email: 'user1@example.com',
password: '12345678'

email: 'user2@example.com',
password: '12345678'

```

