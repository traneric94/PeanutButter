//Getting json data
var data = require('../public/apitesting/data.json');
exports.view = function(req, res){
  res.render('index', data);
};