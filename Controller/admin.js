var express = require('express');
var userModel = require.main.require('./models/user');
var employeeModel  = require.main.require('./models/employeeModel');
var { body, validationResult } = require('express-validator');
var router = express.Router();


router.get('/', function(req, res){
	if(req.session.username != null){
		res.render('admin/index',{uname : req.session.username});
	}else{
		res.redirect('/login');
	}
});

router.get('/addemployee', function(req, res){
  res.render('admin/addemployee', {uname : req.session.username});
});

router.get('/update/:id', function(req, res){
	employeeModel.get(req.params.id , function(results){
		res.render('admin/update',{user : results});
	});
});

router.get('/delete/:id', function(req, res){
		employeeModel.get(req.params.id , function(results){
		res.render('admin/delete',{user : results});
	});
});

router.post('/search/:id', function(req, res){
		employeeModel.get(req.body.search, function(results){
		res.render('admin/search',{user : results});
	});
});


router.get('/allemployeeslist', function(req, res){
  employeeModel.getAll(function(results){
    res.render('admin/allemployeeslist', {userlist : results, uname : req.session.username});
  });
});

router.post('/addemployee', function(req, res){
			var user = {
				ID:req.body.id,
				name:req.body.name,
				uname:req.body.uname,
				phone:req.body.phone,
				gender:req.body.gender,
				designation:req.body.designation,
				password:req.body.password,
			};
			var login = {
				ID: req.body.id,
		    uname : req.body.uname,
		    password : req.body.password,
		    role : 2
		  };

			employeeModel.insert(user, function(status){
		    if(status){
		      userModel.insert(login, function(sta){
		        if(sta){
		          res.redirect("/admin/AddEmployee");
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

router.post('/update',[
	body('id').not().isEmpty().withMessage('Id needed'),
	body('name').not().isEmpty().withMessage('name needed'),
	body('uname').isLength({min : 8}).withMessage('username should be greater or equal to 8 characters'),
	body('phone').not().isEmpty().withMessage('phone needed'),
	body('designation').not().isEmpty().withMessage('designation needed'),
], function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){
		res.send("Something went wrong" + "<br>"
							+ "*no field can be empty" + "<br>"
							+ "username should be greater than 8 characters" + "<br>");
	}
	else{
		var user = {
			ID: req.body.id,
			name:req.body.name,
			uname:req.body.uname,
			phone:req.body.phone,
			designation:req.body.designation,
		};
		var login = {
			ID: req.body.id,
			uname : req.body.uname
		};
		employeeModel.update(user, function(status){
			if(status){
				userModel.update(login, function(sta){
					if(sta){
						res.redirect("/admin/allemployeeslist");
					}
					else{
						res.send('Something Went Wrong. Please try again')
					}
					});
			}	else {
				res.send('Something Went Wrong. Please try again')
			}
		});
	}
});

router.post('/delete/:id', function(req, res){
  employeeModel.delete(req.params.id, function(status){
    if(status){
			userModel.delete(req.params.id, function(sta){
				if(sta){
					res.redirect("/admin/allemployeeslist");
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
