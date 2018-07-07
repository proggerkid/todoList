module.exports = function(app, Items){
	app.get('/todo', function(req, res){
		if(req.session.user !== undefined){
			var username = req.session.user.username;
			renderItems(username, Items, res);
		}
		else{
			res.render('login');
		}
	});

	app.post('/newItem', function(req, res){
		var newItem = req.body.item;
		var username = req.session.user.username;
		addNewItem(username, Items, newItem, res);
	});

	app.delete('/deleteItem', function(req, res){
		var item = req.body.item;
		deleteItem(Items, item, res);
	});
}

function addNewItem(_username, Items, _item, res){
	Items.find({username: _username, item: _item}, function(err, data){
		if(err){
			res.render('index');
		}
		if(data.length > 0){
			res.send("already exists");
		}
		else{
			var newItem = new Items({username: _username, item: _item});
			newItem.save(function(err){
				if(err){
					res.render('index');
				}
				else{
					res.send(_item);
				}
			});
		}
	});
}

function renderItems(_username, _Items, _res){
	_Items.find({}, function(err, data){
		if(err){

		}
		if(data.length === 0){
			_res.render('todo', {items: []});
		}
		else{
			_res.render('todo', {items: data});
		}
	});
}

function deleteItem(_Items, _item, _res){
	_Items.remove({item: _item}, function(err){
		if(err){

		}
		else{	
			_res.end("deleted");
		}
	})
}