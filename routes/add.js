var data = require("../public/apitesting/data.json");

exports.addSong = function(req, res) {
	var counter = 2;
	counter++;
	var newSong = 
	{
		counter : {
			"name" : "Nobody Like You"
	}
	data.songs.push(newSong);
	res.render('index', data);
}