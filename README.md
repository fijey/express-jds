# Express Backend JDS

## Installation

1. Clone repository ini
2. setelah itu arahkan CLI ke folder projeknya
3. Gunakan NPM untuk menginstall module yang diperlukan.
4.  Masuk lagi kedalam Folder App
5. Setelah Itu Jalankan perintah

```bash
node server.js
```

## Usage

```javascript
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'nik': '2222222222222222',
  'roles': 'admin' 
});
var config = {
  method: 'post',
  url: 'https://express.visualkreatif.com/api/auth/signup',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
Untuk Dokumentasi API lengkapnya ada di [Documentation Postman](https://documenter.getpostman.com/view/22074306/UzR1LNVt#a3e8d673-fe63-4497-948e-34f46eb59461)

