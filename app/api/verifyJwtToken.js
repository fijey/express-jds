const jwt = require('jsonwebtoken');
const User = require('../models').User;

module.exports = {
	verifyToken(req, res, next) {
		if(req.get('jwt_key_secret')){
			let tokenHeader = req.headers['jwt_key_secret'];
			if (tokenHeader.split(' ')[0] !== 'Bearer') {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: "Incorrect token format"
				});
			}
	
			let token = tokenHeader.split(' ')[1];
	
			if (!token) {
				return res.status(403).send({
					auth: false,
					message: "Error",
					errors: "No token provided"
				});
			}
	
			jwt.verify(token, "secret", (err, decoded) => {
				if (err) {
					return res.status(500).send({
						auth: false,
						message: "Error",
						errors: err
					});
				}
				console.log(decoded);
				req.nik = decoded.result.nik;
				req.user = decoded.result;
				next();
			});

			return token;

		}else{
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}
	},
	verifyIsAdmin(req, res, next) {


	if(req.user.roles != 'admin'){
		res.status(400).send({
			auth: false,
			message: "Error",
			errors: "Kamu Tidak Memilik Hak Akses"
		});
	}
	next()
	},

}