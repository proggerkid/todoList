module.exports = function(app, User){
	app.post('/registration', function(req, res){
		var userData = {
			username : req.body.username,
			password : req.body.password
		}
		
		makeRegistration(userData, User, res);
	});
}

function makeRegistration(userData, User, res){
	User.find({username: userData.username, password: userData.password}, function(err, data){
		if(err){
			res.render('registration');
		}
		if(data.length > 0){
			res.render('registration');
		}
		else{
			var user = new User({username: userData.username, password: userData.password});
			user.save(function(err){
				if(err){
					res.render('index');
				}
				else{
					res.render('login');
				}
			});	
		}
	})
}