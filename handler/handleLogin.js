module.exports = function(app, User){
	app.post('/login', function(req, res){
		var userData = {
			username: req.body.username,
			password: req.body.password
		};
		makeLogin(User, userData, req, res);
	});
}

function makeLogin(User, userData, req, res){
	User.find({
		username: userData.username,
		password: userData.password
	}, function(err, data){
		if(err){
			res.render('index');
		}
		if(data.length < 1){
			res.render('login');
		}
		else{
			req.session.user = data[0];
			res.render('index');
		}
	});
}