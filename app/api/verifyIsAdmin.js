const jwt = require('jsonwebtoken');
const User = require('../models').User;

module.exports = {
	verifyIsAdmin(req, res, next) {
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
				req.nik = decoded.nik;
				next();
			});


		}else{
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}
	},

}