//Getting json data
var data = require('../public/json/data.json');
exports.view = function(req, res) {
	res.render('index', data);
};
