// var Sequelize = require("sequelize");
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
            var docdata = {};
            var dataObj = [];
            for (i = 0; i < dbDoctor[0].patients.length; i++) {
                var patient_name = dbDoctor[0].patients[i].dataValues.patient_name;
                var current_patient = dbDoctor[0].patients[i].patient_doctors.dataValues.current_patient;
                var patient_request = dbDoctor[0].patients[i].patient_doctors.dataValues.patient_request;
                var patientId = dbDoctor[0].patients[i].patient_doctors.dataValues.patientId;
                var doctorId = req.params.id;
                docdata = {
                    current_patient: current_patient,
                    patient_name: patient_name,
                    patient_request: patient_request,
                    patientId: patientId,
                    doctorId: doctorId
                };
                console.log(doctorId);
                dataObj.push(docdata);
            };
            var doctorObj = {
                doctors: dataObj
            }
           
            res.render('doctors', doctorObj);
        });

    });

    app.put("/api/patient_doctors/:id", function(req, res) {

        db.patient_doctors.update({
            patient_request:  false
         },
           {
             where: { patientId: req.body.patientId },
            returning: true,
            plain:  true
        }).then(function() {
            
            res.status(200).end();
        });
      });
}