var db = require("../config/dbconfig").db;
var utils = require("../utils/response");
var mongo = require('mongodb');

var filters = {
	getfilterdata: function(req, res) {
		let heads = req.body;
		if(heads && heads.fromdate && heads.todate) {
			let queryform = {
				date: {
					$gte: heads.fromdate,
					$lt: heads.todate
				},
				selectedExchange: heads.selectedExchange,
				selectedSecurity: heads.selectedSecurity
			};
			db.stocks.find(queryform).sort({ date : 1, marketprice: 1} , function(err, result){
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} else {
			db.stocks.find().sort({date: 1, marketprice: 1}).limit(20, function(err, result){
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		}
	}
}

module.exports = filters;