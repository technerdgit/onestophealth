var express = require("express");

var router = express.Router();

var onestophealth = require("../models/onestophealth");

router.get("/id", function(req,res){
    onestophealth.all(function(data){
        var patientObj = {
            patient: data
        };
        res.render("index", patientObj);
    });
    
});