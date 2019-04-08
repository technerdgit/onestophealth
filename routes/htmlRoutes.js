// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // root route loads landing page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });
// route loads patient dashboard
  app.get("/patient-dash", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/patient-dash.html"));
  });

  // route loads doctor dashboard
  app.get("/doctor-dash", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/doctor-dash.html"));
  });

};
