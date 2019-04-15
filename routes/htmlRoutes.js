var path = require("path");

module.exports = function(app){
 // def default routes
  app.get("/", function(req, res){
    res.render("landing")
  });
    
// def find_doctors route
  app.get("/find_doctors", function(req, res){
  	res.render("find_doctors")
  });

}

