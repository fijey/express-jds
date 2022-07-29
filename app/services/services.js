const axios = require('axios');

module.exports= {
    getData(){
        let url = 'https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product';

        const promise = axios.get(url)
    
        const dataPromise = promise.then((response) => response.data)
    
    
        return dataPromise
    },
    convertCurrency(price){
        let url = 'https://v1.nocodeapi.com/fijey2/cx/QAYZWDUJPyTGxDAF/rates/convert?from=USD&to=IDR&amount='+price+'';
        let result = '';
     
         const promise = new Promise((resolve,reject) => {
             axios.get(url).then((response) => {
              result = JSON.stringify(response.data)
              resolve(JSON.parse(result));
          } ).catch(err => reject(err));
     
         })
     
     
         return promise;
    }

}