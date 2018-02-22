var data = require("../public/apitesting/data.json");
var counter = 1;
exports.addSong = function(req, res) {
	counter++;
	var newSong = 
	{
			"name" : req.query.search,
			"songId" : counter
	}
	data.songs.push(newSong);
	res.render('index', data);
}