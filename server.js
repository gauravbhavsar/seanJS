var express = require('express');
var app = express();
var server = require('http').createServer(app);
var q = require('q');
var db = require('./migration/sqlSchema.js');
var path = require("path");
var nodes = { };
server.listen(process.env.PORT || 3000);

app.use(express.methodOverride());
app.use(express.bodyParser());  
app.use(app.router);
app.use('/public', express.static('public'));
app.use('/common', express.static('common'));
app.use('/img', express.static('img'));
app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));

app.get('/', function (req, res) {
  	db.User().findAll({where:{IsDeleted: false},order: "'id' DESC"}).then(function(d){
	 	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	 	res.sendfile(path.resolve('./views/users.html'));
	 });
});

app.get('/create/user', function(req, res) {
	res.sendfile(path.resolve('views/usercreate.html'));
});

app.get('/users', function (req, res, next) {
	 db.User().findAll({where:{IsDeleted: false},order: "'id' DESC"}).then(function(d){
	 	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	 	res.sendfile(path.resolve('views/users.html'));
	 });
});

app.get('/allusers',function (req,res,next){
	db.User().findAll({where:{IsDeleted: false},order: "'id' DESC"}).then(function(d){
	 	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	 	res.send(d);
	 });
})

app.get('/user/:id',function(req,res){
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.sendfile(path.resolve('views/userDetails.html'));
});

app.get('/userbyid/:id', function(req, res) {
	db.User().findById(req.params.id).then(function(d) {
		res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
		res.send(d);
	});
});

app.post('/userpost',function(req,res){
	console.log('this is post',req.body);
	var user = db.User().findOrCreate({
		where: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			IsDeleted:false
		}
	});
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.end();
});

app.put('/userput',function(req,res){
	console.log('this is put',req.body);
	db.User().find(req.body.id).then(function(d){
  		if(d){
    		d.updateAttributes({
      			firstName: req.body.firstName,
      			lastName: req.body.lastName
    		});
    	}
	});
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.end();
});

app.get('/delete/user/:id',function(req,res){
	db.User().find(req.params.id).then(function(d){
		if(d){
				d.updateAttributes({
      			IsDeleted: true,
    		});
		}
	});
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.redirect('users');
	res.end();
});

app.get('/imageprocessing',function(req,res){
	console.log("This is Image Processing Page call ->",res);
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	console.log("This is Path resolver -> ",path.resolve('views/imageprocessing.html'));
	res.sendfile(path.resolve('views/imageprocessing.html'));
})