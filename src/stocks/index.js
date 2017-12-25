var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");
var mongo = require('mongodb');
var utils = require("../../utils/response");
var async = require("async");

var stocks = {
	getstocks: function(req, res) {
		try {
			var userid = req.sessionuid;

			var myMongoMod = function(stocks, ourCallBack){
				var finalArray = [];
				async.forEachLimit(stocks, 1, function(stock, userCallback){
				    async.waterfall([
				        function(callback) {
				            db.exchanges.find({_id:new mongo.ObjectID(stock.selectedExchange)},{name:1},function(err,result){
								// data.exchange=result[0].name;
								callback(null, result[0].name);
							});
				        },
				        function(arg1, callback) {
				            // arg1 now equals 'one' and arg2 now equals 'two'
				            // console.log("exchange argument ", arg1);
				            // callback(null, 'three');
				            db.securities.find({_id:new mongo.ObjectID(stock.selectedSecurity)},{securityname:1},function(err,security){
								// data.security=security[0].securityname;
								callback(null, arg1, security[0].securityname);
							});
				        },
				        function(arg1, arg2, callback) {
				            // arg1 now equals 'three'
				            stock.exchange = arg1;
				            stock.security = arg2;
				            let mydate = new Date(stock.date);
				            stock.date = mydate.getFullYear() + "-" + mydate.getMonth() + "-" + mydate.getDate();
				            finalArray.push(stock);
				            callback(null, finalArray);
				        }
				    ], function (err, result) {
				        // result now equals 'done'
				        userCallback();
				        if(stocks.length===result.length){
				        	ourCallBack(result);
				        }
				    });
				}, function(err){
				    console.log("User For Loop Completed");
				});
			}

			// collection.find({ 'category_id': 10 }).sort({_id: -1}).limit(10, function (e, d) {})

			db.stocks.find().limit(20, function(err, stocks){
				myMongoMod(stocks, function(finallresult){
					res.json(utils.response("success", finallresult));
				});
			});
			
			// async.forEachLimit(users, 1, function(user, userCallback){

			//     async.waterfall([
			//         function(callback) {
			//             callback(null, 'one', 'two');
			//         },
			//         function(arg1, arg2, callback) {
			//             // arg1 now equals 'one' and arg2 now equals 'two'
			//             callback(null, 'three');
			//         },
			//         function(arg1, callback) {
			//             // arg1 now equals 'three'
			//             callback(null, 'done');
			//         }
			//     ], function (err, result) {
			//         // result now equals 'done'
			//         console.log('done')
			//         userCallback();
			//     });


			// }, function(err){
			//     console.log("User For Loop Completed");
			// });

			// db.stocks.find({userid:userid}).toArray(function(err,res){
			// 	var array=[];
			// 	async.forEachSeries(res,function(data,callback){
			// 		db.exchanges.find({_id:new mongo.ObjectID(data.selectedExchange)},{name:1},function(err,result){
			// 			data.exchange=result[0].name;
			// 		});
			// 		db.securities.find({_id:new mongo.ObjectID(data.selectedSecurity)},{securityname:1},function(err,security){
			// 			data.security=security[0].securityname;
			// 			callback();
			// 		});
			// 		array.push(data);
			// 		console.log(array);
			// 	});
			// });
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
            // stock.userid = req.sessionuid;
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
			var gquery = {"_id": stock_id};
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
			var gquery = { "_id": stock_id};

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