var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");
var mongo = require('mongodb');
var utils = require("../../utils/response");

var exchanges = {
	getexchanges: function(req, res) {
		try {
			var userid = req.sessionuid;
			db.exchanges.find({userid: userid}).toArray(function (err, result) {
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch(err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	}
}

module.exports = exchanges;