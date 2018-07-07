module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/registration', function(req, res){
		res.render('registration');
	});

	app.get('/login', function(req, res){
		res.render('login');
	});
}