//Getting json data
var data = require('../public/apitesting/data.json');
exports.view = function(req, res){
	console.log(data);
	res.render('index', data);
};