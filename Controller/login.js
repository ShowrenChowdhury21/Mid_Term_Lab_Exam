var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var { body, validationResult } = require('express-validator');
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/',[
	body('uname').isLength({min : 8}).withMessage('username should be equal or greater than 8 characters'),
	body('password').isLength({min : 8}).withMessage('password have to be at least 8 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).withMessage('Password sh')
], function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){
		console.log(errors.errors)
		res.send("Somthing Went Wrong" + "<br>"
							+ "*no field can be empty" + "<br>"
							+ "username should be greater than 8 characters" + "<br>"
							+ "Password should be equal or greater than 8 character and \contains (A-Z, a-z, 0-9, and special sign like @,#,$,& etc)");
	}
	else{
		var user = {
			uname: req.body.uname,
			password: req.body.password
		};
	  userModel.validate(user, function(status){
			console.log(status);
			if(status){
				req.session.username = user.uname;
				userModel.get(user.uname, function(result){
					if (result.role == 1){
						res.redirect('/admin');
					}
					else if (result.role == 2){
						res.redirect('/employee');
					}
				});
			}else{
	      res.send('invalid username or password')
			}
		});
	}
});

module.exports = router;
