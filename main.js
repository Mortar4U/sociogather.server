var express     = require("express");
var cors        = require("utils/cors");
var tsRest      = require("services/tsRest");
var ircRest     = require("services/ircRest");

// App instance
var app = express();

// Support JSON bodies
app.use(express.json());

// Enable cors
cors(app);

// Setup Rest interfaces
tsRest(app);
ircRest(app);

var server = app.listen(Number(process.env.PORT || 3000), function() {
  console.log("Listening on port %d", server.address().port);
});

