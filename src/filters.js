var db = require("../config/dbconfig").db;
var utils = require("../utils/response");
var mongo = require('mongodb');

var filters = {
	getfilterdata: function(req, res) {
		let heads = req.body;
		db.stocks.find({
			date: {
				$gte: heads.fromdate,
				$lt: heads.todate
			}
		}).sort({date: 1}, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	}
}

module.exports = filters;