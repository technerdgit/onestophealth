// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var favicon = require("serve-favicon")
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");
var exphbs = require("express-handlebars");

var path = require("path");
var cors = require('cors');
// var zipcodes = require('zipcodes');
// views Path
var viewPath = path.join(__dirname, 'views');
app.set('views', viewPath);


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory

app.use(express.static("public"));

app.use(favicon(__dirname + "/public/assets/images/favicon.ico"))

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes")(app);

app.use(cors)
// Add JWT tokens for api
var OktaJwtVerifier = require('@okta/jwt-verifier');

app.use(OktaJwtVerifier);

// Add dotenv to hide sensitive data via .env file
require('dotenv').config();


// Syncing our sequelize models and then starting our Express app
// =============================================================
 db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
