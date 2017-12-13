var bodyParser = require("body-parser");
var auth = require("./auth");
var exchanges = require("../src/exchanges/");
var stocks = require("../src/stocks/");
var securities = require("../src/securities");

module.exports = {

    init: function(app) {
        // setting json on express to ge the json data
        app.use(bodyParser.json());
        // setting urlencoded on express to use encoded url
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        // to allow the CORS
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.all('/api/v1/*', [require('../middleware/validateRequest')]);

        // user login registration
        app.post("/login", auth.login);
        app.post("/register", auth.register);

        // exchanges
        app.get("/api/v1/getexchanges", exchanges.getexchanges);

        // securities
        app.get("/api/v1/getsecurities", securities.getsecurities);

        // stocks
        app.post("/api/v1/savestocks", stocks.savestocks);
        app.get("/api/v1/getstocks", stocks.getstocks);
        app.put("/api/v1/updatestocks", stocks.updatestocks);
        app.delete("/api/v1/deletestocks", stocks.deletestocks);

        // dummy services
        app.get("/", function(req, res) {
            res.send("Welcomes you my dear!!");
        });
    }
}
