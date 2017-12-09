var mongojs = require('mongojs');
var connectionString = "mongodb://127.0.0.1:27017/"; // "username:password@example.com/mydb"
var database = "dbstocks";
var collections = ["users", "stockentries"];

var restDbConnStr = "mongodb://dbstocks:dbstocks@407@ds133296.mlab.com:33296/dbstocks"; //dbstocks@407

module.exports = {
  db: mongojs(restDbConnStr , collections)
};