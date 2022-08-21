# Express Backend JDS

## About
Aplikasi ini dibuat untuk memenuhi soal tes dari JABAR DIGITAL SERVICE disini ada 2 app yang sudah disatukan
1. [Authenticate App](https://github.com/fijey/laravel-backend-jds)
Dibuat menggunakan PHP Laravel Framework
2. [Fetch App](https://github.com/fijey/express-jds)
Dibuat Menggunakan Express JS

#Teknis
ketika menjalankan POST express.visualkreatif.com/api/auth/signup ataupun express.visualkreatif.com/api/auth/signin  maka akan di teruskan ke Authenticate App Laravel menggunakan API, setelah mengembalikan token maka akan disimpanoleh express sebagai keperluan authenticate di halaman yang memerlukan midleware authenticate

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

