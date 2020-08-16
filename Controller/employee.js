var express = require('express');
var userModel = require.main.require('./models/user');
var employeeModel  = require.main.require('./models/employeeModel');
var productModel  = require.main.require('./models/product');
var { body, validationResult } = require('express-validator');
var router = express.Router();


router.get('/', function(req, res){
	if(req.session.username != null){
		res.render('employee/index',{uname : req.session.username});
	}else{
		res.redirect('/login');
	}
});

router.get('/myprofile', function(req, res){
	employeeModel.getemp(req.session.username , function(results){
		res.render('employee/myprofile',{user : results,uname : req.session.username});
	});
});

router.get('/updateprofile', function(req, res){
  employeeModel.getemp(req.session.username, function(result){
    res.render('employee/updateprofile', {user : result, uname : req.session.username});
  });
});
router.get('/products', function(req, res){
    res.render('employee/products', {uname : req.session.username});
});
router.get('/addproduct', function(req, res){
    res.render('employee/addproduct', {uname : req.session.username});
});

router.post('/addproduct', function(req, res){
			var user = {
				ID:req.body.pid,
				name:req.body.pname,
				quantity:req.body.quantity,
				price:req.body.price,
			};

			productModel.insert(user, function(status){
		    if(status){
		          res.redirect("/employee/addproduct");
		    }else {
		    	res.send('Something Went Wrong. Please try again')
		    }
		});
});
router.get('/allproductlist', function(req, res){
  productModel.getAll(function(results){
    res.render('employee/allproductlist', { products: results, uname : req.session.username});
  });
});
router.get('/updateproduct/:id', function(req, res){
	productModel.get(req.params.id , function(results){
		res.render('employee/updateproduct',{product : results});
	});
});

router.get('/deleteproduct/:id', function(req, res){
		productModel.get(req.params.id , function(results){
		res.render('employee/deleteproduct',{product : results});
	});
});

router.post('/search/:id', function(req, res){
		productModel.get(req.body.search, function(results){
		res.render('employee/searchproduct',{product : results});
	});
});

router.post('/update',[
	body('id').not().isEmpty().withMessage('Id cannot be empty'),
	body('name').not().isEmpty().withMessage('name cannot be empty'),
	body('uname').isLength({min : 8}).withMessage('username should be at least 8 character'),
	body('phone').not().isEmpty().withMessage('phone cannot be empty'),
	body('password').isLength({min : 8}).withMessage('password have to be at least 8 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/).withMessage('Passsword problem'),
], function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){
		res.send("Something went wrong" + "<br>"
							+ "*no field can be empty" + "<br>"
							+ "username should be greater than 8 characters" + "<br>"
							+ "Password should be equal or greater than 8 character and \contains (A-Z, a-z, 0-9, and special sign like @,#,$,& etc)");
	}
	else{
		var user = {
			ID: req.body.id,
			name:req.body.name,
			uname: req.body.uname,
			phone:req.body.phone,
		};
		var login = {
			ID: req.body.id,
			uname: req.body.uname,
			password : req.body.password,
		};
	  employeeModel.updateemp(user, function(status){
	    if(status){
				userModel.updateemp(login, function(sta){
					if(sta){
							res.redirect('/login');
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

router.post('/updateproduct',[
	body('pid').not().isEmpty().withMessage('Id cannot be empty'),
	body('pname').not().isEmpty().withMessage('name cannot be empty'),
	body('quantity').not().isEmpty().withMessage('quantioty cannot be empty'),
	body('price').not().isEmpty().withMessage('Price cannot be empty'),
], function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){
		res.send("Something went wrong" + "<br>"
							+ "*no field can be empty");
	}
	else{
		var product = {
			ID: req.body.pid,
			name:req.body.pname,
			quantity: req.body.quantity,
			price:req.body.price,
		};
	  productModel.update(product, function(status){
	    if(status){
					res.redirect('/employee/allproductlist');
			}
			else{
					res.send('Something Went Wrong. Please try again')
			}
	  });
	}
});

router.post('/delete/:id', function(req, res){
  productModel.delete(req.params.id, function(status){
    if(status){
				res.redirect("/employee/allproductlist");
		}
		else{
				res.send('Something Went Wrong. Please try again')
		}
  });
});

module.exports = router;
