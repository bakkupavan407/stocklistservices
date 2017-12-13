var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");
var mongo = require('mongodb');
var utils = require("../../utils/response");

var stocks = {
	getstocks: function(req, res) {
		try {
			var userid = req.sessionuid;
			db.stocks.find({userid: userid}).toArray(function (err, result) {
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch(err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	savestocks: function(req, res){
		try {
	      var stock = req.body;
	      if(!stock){
	        res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
	      } else {
            stock.userid = req.sessionuid;
            stock.timestamp = new Date();
	        db.stocks.insert(stock, function (err, result) {
	          if(err) res.json(utils.response("failure", {"errmsg": err}));

	          res.json(utils.response("success", result));
	        });
	      }
	    } catch(err) {
	      res.json(utils.response("failure", {"errmsg": err}));
	    }
	},
	updatestocks: function(req, res){
		try {
			var stockdata = req.body;
			var stockid = stockdata.stockid;
			var stock_id = new mongo.ObjectID(stockid);
			var userid = req.sessionuid;
			var gquery = {"_id": stock_id, "userid": userid};
			delete stockdata.stockid;
			db.stocks.update(gquery, {$set: stockdata}, function(err, result){
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	deletestocks: function(req, res) {
		try{
			var stockid = req.body.stockid;
			var stock_id = new mongo.ObjectID(stockid);
			var userid = req.sessionuid;
			var gquery = { "_id": stock_id, "userid": userid};

			db.stocks.remove(gquery, function(err, obj) {
				if (err) throw err;
				res.json(utils.response("success"));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err && err.message}));
		}
	}
}

module.exports = stocks;