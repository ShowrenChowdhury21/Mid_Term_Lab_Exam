var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var customerModel 	= require.main.require('./models/customer');
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('registration/index');
});

router.get('/login', function(req, res){
	res.render('login/index');
});


router.post('/', function(req, res){
	var user = {
		ID:req.body.id,
		name:req.body.name,
		uname:req.body.uname,
		phone:req.body.phone,
	};
	console.log(user);
	var login = {
		ID: req.body.id,
		uname : req.body.uname,
		password : req.body.password,
		role : 3
	};

	customerModel.insert(user, function(status){
		if(status){
			userModel.insert(login, function(sta){
				if(sta){
					res.redirect("/login");
				}
				else{
					res.send('Something Went Wrong. Please try again')
				}
			});
		}else {
			res.send('Something Went Wrong. Please try again')
		}
});
});

module.exports = router;
