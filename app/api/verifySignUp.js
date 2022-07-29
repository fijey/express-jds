const User = require('../models').User
const Helper = require('../helper/helper')
module.exports = {
	checkNik(req, res, next) {
		const cari = User.findOne({
			where: {
				nik: req.body.nik
			}
		})
        // cari.then(()=>console.log(cari));
        .then(user => {
            
			if (user) {
				res.status(400).send(Helper.response(400,"Nik Ini Sudah Terdaftar Didalam System Kami",null));
				return;
			}
            next()

		})
        .catch(err => {
            console.log(err);
        })
	},

	validation(req,res,next){

		if(req.body.nik.replace(/\s/g, '').length <16){
			res.status(400).send(Helper.response(400,"NIK Harus Memiliki 16 Karakter", null))
			return;
		}else if(req.body.nik.replace(/\s/g, '').length >16){
			res.status(400).send(Helper.response(400,"NIK Tidak Boleh Melebihi 16 Karakter", null))
			return;
		}else{
			next()
		}
	}

}