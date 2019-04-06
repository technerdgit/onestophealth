var express = require("express");

var router = express.Router();

var patient = require("../models/patient");

router.get("/:patient_login_name", function(req,res){
    patient.all(function(data){
        var patientObj = {
            patient: data
        };
        res.render("index", patientObj);
    });
    
});