var Sequelize  = require ("sequelize");
var db = require("../models");

module.exports = function (app) {
    app.get("/api/doctors/:id", function (req, res) {
      
      db.doctors.findAll({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.patients
        }]
    }).then(function (dbDoctor) {
        var docdata={};
        var dataObj=[];
        for(i=0;i < dbDoctor[0].patients.length;i++) {
        var patient_name = dbDoctor[0].patients[i].dataValues.patient_name;
        var current_patient = dbDoctor[0].patients[i].patient_doctors.dataValues.current_patient;
         docdata = {
            current_patient: current_patient,
            patient_name: patient_name
         };
         dataObj.push(docdata);
       };           
        var doctorObj = {
            doctors: dataObj
        }
    
        res.render('doctors', doctorObj);
        });

    });
}