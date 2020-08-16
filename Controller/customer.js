var express 	= require('express');
var userModel = require.main.require('./models/user');
var router 		= express.Router();

router.get('/', function(req, res){
	if(req.session.username != null){
		res.render('customer/index',{uname : req.session.username});
	}else{
		res.redirect('/login');
	}
});


module.exports = router;
