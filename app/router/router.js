const verifySignUpController = require('../api').verifySignUp;
const verifySignController = require('../api').verifySign;
const userController = require('../api').user;
const fetchDataController = require('../api').fetchData;
const verifyJwtTokenController = require('../api').verifyJwtToken;

const express = require('express');
const app = express();

module.exports = function (app) {

	app.get('/', function(req, res){
		res.send("Hello from the root application URL");
	});

    app.get('/api/get-profile', 
    [verifyJwtTokenController.verifyToken],
    userController.getProfile);
	
    app.get('/api/fetch-data', 
    [verifyJwtTokenController.verifyToken,
	verifyJwtTokenController.verifyIsAdmin],
    fetchDataController.index,
	fetchDataController.groupingData);

    app.get('/api/fetch-data-group', 
    [verifyJwtTokenController.verifyToken,
	verifyJwtTokenController.verifyIsAdmin],
	fetchDataController.groupingData);


	//User Auth
	app.post('/api/auth/signup',
		// [verifySignUpController.checkNik,
		// verifySignUpController.validation
		// ],
		//middleware node ga dipake karena sudah di handle di auth laravel
		verifySignController.signup);

	app.post('/api/auth/signin', verifySignController.signin);


}