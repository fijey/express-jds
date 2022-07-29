const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Helper = require('../helper/helper');
const User = require('../models').User

module.exports = {
	signup(req, res) {
        
        let password = Helper.generatePassword();
        
		const signup =  User
			.create({
				nik: req.body.nik,
				roles: req.body.roles,
				password: bcrypt.hashSync(password, 8)
			})
            .then(resp => {
                res.status(200).send({
                    status_code: 200,
                    status_message: "Pendaftaran Akun Pengguna Berhasil",
                    nik:req.body.nik,
                    password: password
                })
            })
            .catch(err => {
                res.status(400).send(Helper.response(400,err,null));
            })

        
	},

	signin(req, res) {
		    const cari = User
			.findOne({
				where: {
					nik: req.body.nik,
				}
			})

            .then(resp => {
                if (!resp) {
                        res.status(404).send({
                            status_code: 404,
                            status_message: "Akun Pengguna / NIK Tidak Terdaftar",
                            nik: req.body.nik,
                            accessToken: null,
                        });
                    return;
                }
                var passwordIsValid = bcrypt.compareSync(req.body.password, resp.password);
				if (!passwordIsValid) {
					res.status(401).send({
                        status_code: 401,
                        status_message: "Invalid NIK/Password",
                        nik: req.body.nik,
                        accessToken: null,
					});
                    return;
				}

                var token = 'Bearer ' + jwt.sign({
					nik: resp.nik
				}, 
                "secret",
                 {
					expiresIn: 86400 //24h expired
				});

                res.status(200).send({
                    status_code: 200,
                    status_message: "Berhasil Login",
                    nik: req.body.nik,
                    accessToken: token,
				});


            })
            .catch(err => {
                res.status(500).send({
                    status_code: 500,
                    status_message: "Request Failed "+err,
                    nik: req.body.nik,
                    accessToken: null,				
                });
            })
            
	}
}