const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Helper = require('../helper/helper');
const User = require('../models').User;
const axios = require('axios');
const { result } = require('lodash');

module.exports = {
	async signup(req, res) {
        console.log(req);
        
        const response = await axios.post('https://auth.visualkreatif.com/public/api/register', {
            nik: req.body.nik,
            roles: req.body.roles
        }).then(response => {
            res.status(200).send({
                status_code: response.data.status_code,
                status_message: response.data.status_message,
                nik:response.data.result.nik,
                password: response.data.result.password
            });
       })
       .catch(error => {
            res.status(400).send(Helper.response(400,error.response.data.errors,null));
       });
	},

	async signin(req, res) {

            const response = await axios.post('https://auth.visualkreatif.com/public/api/login', {
                nik: req.body.nik,
                password: req.body.password
            }).then(response => {

                if(response.data.status_code == 200){

                    console.log(response.data.result);
                    var token = 'Bearer ' + jwt.sign({
                        result: response.data.result
                    }, 
                    "secret",
                     {
                    	expiresIn: 86400 //24h expired
                    });

                    res.status(200).send({
                        status_code: response.data.status_code,
                        status_message: response.data.status_message,
                        accessToken:token,
                        nik:response.data.result.nik,
                    });
                }



               
                if (response.data.status_code == 401) {
                    res.status(response.data.status_code).send(Helper.response(response.data.status_code,response.data.status_message,null));
                }
           })
           .catch(error => {
            res.status(error.response.status).send(Helper.response(error.response.status,error.response.data.message,null));
            console.log(error.response);
           });
            
	}
}