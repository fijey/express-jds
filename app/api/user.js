const User = require('../models').User;
const axios = require('axios');
const Helper = require('../helper/helper');

module.exports = {

  async getProfile(req, res) {

  const getProfile = await axios.get('http://127.0.0.1:3000/api/user', {
    headers: {
      Authorization: 'Bearer ' + req.user.acessToken,
    }
  }).then(function(response){
    console.log(response);
    res.status(200).send({
        status_code: response.data.status_code,
        status_message: response.data.status_message,
        result:response.data.result,
    });
  }).catch(function(err){
    console.log("ERROR",err);
  });


    // const response = axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/api/user',
    //   headers: {'Authorization': 'Bearer '+ req.user.acessToken}
    // })

  //   const response = await axios.post('http://127.0.0.1:3000/api/user', {
  //     nik: req.body.nik,
  //   }).then(response => {
  //       res.status(200).send({
  //           status_code: response.data.status_code,
  //           status_message: response.data.status_message,
  //           nik:response.data.result.nik,
  //           password: response.data.result.password
  //       });
  // })
  // .catch(error => {
  //       res.status(400).send(Helper.response(400,error.response.data.errors,null));
  // });

    // axios.post('http://localhost:3000/api/user')
    // .then(response=> {
    //   console.log(response)
    // })
    // return User
    //   .findOne({
    //     where:{
    //       nik:req.nik
    //     },
    //   })
    //   .then(resp => {
        
    //     res.status(200).send(Helper.response(200,"Berhasil",resp));
    //   })
    //   .catch((error) => {
    //     res.status(400).send(Helper.response(400,"Bad Request",null));
    //   });
  },

}
