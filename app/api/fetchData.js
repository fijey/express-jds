const services = require('../services/services');
const fs = require('fs');
const local_data_jds = require('../services/data_jds.json');

function jumlah_data_sama(local,api){
    if(local.length == api.length){
        return true
    }
    return false
}

function compareData(local_data_jds, data_jds){
    
    if( jumlah_data_sama(local_data_jds, data_jds)){
        return "sama";
    }else{
        return "berubah";
    }

}


const getData = new Promise((resolve,reject) => {

    let data =  services.getData()
      .then(data => {
          resolve(data)
      })
      .catch(err => err) 

});

  async function convert (data_jds,doConvert, withoutConvert, res) {

        let compare = compareData(local_data_jds,data_jds);

        console.log(compare);

        if(compare == 'berubah'){
            let jumlah_data = data_jds.length - 1;
            sortir_data_jds = data_jds.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
            console.log(sortir_data_jds);
             sortir_data_jds.map(async (item,index) => {
                    let result = '';
                    let usd_to_idr = await services.convertCurrency(item.price).then(response =>{ 
                        result = response['result']
                        return result;
                    }).then(data => {
                        result = data;
                        item['price_idr'] = result;
                    }).catch(err => console.error(err));
                   
                    if(jumlah_data == index){
                        doConvert(res,sortir_data_jds);
                    }
            })
        }else{
            withoutConvert(res,local_data_jds);
        }
        
    
 }

const withoutConvert = (res,localFile) => {
    return res.status(200).send({
        status_code:200,
        status_message: "Berhasil Mengambil Data",
        source: "Local File",
        result : localFile,
    });
}

const successConvert = (res,newObject) => {
    fs.unlinkSync('services/data_jds.json')
    fs.writeFile("services/data_jds.json", JSON.stringify(newObject.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))), function(error) {
        if (error) {
            console.log("Error", error);
        } else {
            console.log("Success");
        }
    });

    return res.status(200).send({
        status_code:200,
        status_message: "Berhasil Mengambil Data",
        source: "API JDS",
        data : newObject,
    });
}


module.exports = {

    async index(req,res){
        getData.then(response => {        
            convert(response, successConvert, withoutConvert,res);
        });
    }

}

