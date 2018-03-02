//Getting json data
var data = require('../public/apitesting/data.json');
exports.view = function(req, res){
	data['viewAlt'] = true;
	res.render('index', data);
};

exports.viewAlt = function(req, res){
	data['viewAlt'] = false;
	res.render('index', data);
};
