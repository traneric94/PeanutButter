var data = require("../public/apitesting/data.json");
var counter = 1;
exports.addSong = function(req, res) {
	counter++;
	var newSong = 
	{
			"name" : req.body.search,
			"songId" : counter
	}
	data.songs.push(newSong);
	res.redirect('/');
	//res.render('index', data);
}