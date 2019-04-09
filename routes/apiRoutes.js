// var Sequelize = require("sequelize");
var db = require("../models");

module.exports = function (app) {

    // Find the doctor based on his login using his id
    app.get("/api/doctors/:id", function (req, res) {
        db.doctors.findAll({}
        ).then(function (data) {
            res.json(data);
        });
    });

    // Find the patients based on his login id
    app.get("/api/patient/:id", function (req, res) {
        db.patients.findAll({}
        ).then(function (data) {
            res.json(data);
        });
    });

    // Get records for Current Patients and New patient request from doctors, patients and join table patient_doctors
    app.get("/api/patient_doctors/:id", function (req, res) {

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
                var patientid = dbDoctor[0].patients[i].patient_doctors.dataValues.patientId;
                var doctorId = req.params.id;
                docdata = {
                    current_patient: current_patient,
                    patient_name: patient_name,
                    patient_request: patient_request,
                    patientId: patientid,
                    doctorId: doctorId
                };
                // console.log(doctorId);
                dataObj.push(docdata);
            };
            var doctorObj = {
                doctors: dataObj
            }

            res.render('patient_doctors', doctorObj);
        });

    });

    // Update patients_doctors join table additional columns for patient updates

    app.put("/api/patient_doctors/:doctorId", function (req, res) {

        db.patient_doctors.update({
            patient_request: req.body.patient_request,
            current_patient: req.body.current_patient,
            patient_declined: req.body.patient_declined
        },
            {
                where: { patientId: req.body.patientId,
                         doctorId: req.body.doctorId },
                returning: true,
                plain: true
            }).then(function () {

                res.status(200).end();
            });
    });

    // Insert record into the Doctors table using doctors model
    app.post("/api/doctors", function (req, res) {
        db.doctors.create({
        }).then(function (err) {
            if (err) {
                res.status(500).end();
            }
            res.json(data);
            res.status(200).end();
        });
    });

    // Insert record into the Patient table using patients model
    app.post("/api/patients", function (req, res) {
        db.doctors.create({
        }).then(function (err) {
            if (err) {
                res.status(500).end();
            }
            res.json(data);
            res.status(200).end();
        });
    });
}