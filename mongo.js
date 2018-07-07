module.exports = {
	connect: function(mongoose){
		mongoose.connect('mongodb://localhost/test');
		mongoose.connection.once('open', function(){
			console.log("connected to db");
		});
		mongoose.connection.on('error', function(){
			console.log("fail to connect to db");
		});
	},
	createUserModel: function(mongoose){
		var userSchema = mongoose.Schema({
			username: String,
			password: String
		});
		return mongoose.model('user', userSchema);
	},
	createItemsModel: function(mongoose){
		var itemSchema = mongoose.Schema({
			username: String,
			item: String
		});
		return mongoose.model('item', itemSchema);
	}
}