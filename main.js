var express     = require("express");
var cors        = require("utils/cors");
var ts          = require("services/ts");
var irc         = require("services/irc");

// App instance
var app = express();

// Support JSON bodies
app.use(express.json());

// Enable cors
cors(app);

// Setup too simple server
new ts(app);
new irc(app);

var server = app.listen(Number(process.env.PORT || 3000), function() {
  console.log("Listening on port %d", server.address().port);
});

