var express 	     = require('express');
var bodyParser 	   = require('body-parser');
var session        = require('express-session');
var login 		     = require('./controller/login');
var admin          = require('./controller/admin');
var logout         = require('./controller/logout');
var employee       = require('./controller/employee');
var app 		       = express();


app.set('view engine', 'ejs');
app.use('/Assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'my value',saveUninitialized: true, resave: false}))

app.use('/login', login);
app.use('/admin', admin);
app.use('/employee', employee);
app.use('/logout', logout);


app.get('/', function(req, res){
	res.redirect("/login");
});

app.listen(1600, function(){
	console.log('Searver Started. Port: 1600');
});
