var path = require("path");

module.exports = function(app){

  app.get("/", function(req, res){
    res.render("landing")
  });
    
  app.get("/find_doctors", function(req, res){
  	res.render("find_doctors")
  });

}

