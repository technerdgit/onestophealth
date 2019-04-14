// var Sequelize = require("sequelize");
var db = require("../models");

 


// api Route for Get and Post of Doctors and Patients
// Each route gets , puts and Posts data from the mySql database
module.exports = function (app) {

    // This route is for zip code for doctor record
    app.get("/api/doctors/:okta_email/:zip?", function (req, res) {
        db.doctors.findAll({
            where: {
                email: req.params.okta_email
            }
        }).then(function (data) {
            var doctorObj = {
                doctors: data
            };
            if (req.params.zip !== undefined) {
                res.json("doctorObj");
            }
            else {
                res.render("doctors", doctorObj);
            }
        });
    });

    // Not in use but is for testing the better doctor api
    app.get("/api/patient/doctor_zip/:zip?", function (req, res) {
        db.doctors.findAll({
            where: {
                doctor_zip: req.params.zip
            }
        }).then(function (data) {

            var doctorObj = {
                doctors: data
            };
            console.log("backend", data)
            res.render('patients', doctorObj);
            // res.json(doctorObj);
            // could do a res.render/res.json MAYBE to doctors
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
                var doctorId = dbDoctor[0].patients[i].patient_doctors.dataValues.doctorId;
                var email = req.params.okta_email;
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
                where: {
                    patientId: req.body.patientId,
                    doctorId: req.body.doctorId
                },
                returning: true,
                plain: true
            }).then(function () {

                res.status(200).end();
            });
    });

    // Insert record into the Doctors table using doctors model
    app.post("/api/doctors", function (req, res) {
        db.doctors.create({
            doctor_name: req.body.doctor_name,
            email: req.body.email,
            doctor_type: req.body.doctor_type,
            doctor_specialization: req.body.doctor_specialization,
            doctor_type: req.body.doctor_type,
            doctor_primary_address1: req.body.doctor_primary_address1,
            doctor_city: req.body.doctor_city,
            doctor_state: req.body.doctor_state,
            doctor_zip: req.body.doctor_zip,
            doctor_login_name: req.body.doctor_login_name,
            doctor_login_password: req.body.doctor_login_password,
            doctor_insurance_accepted: req.body.doctor_insurance_accepted
        }).then(function (results) {
            res.json(results);
        });
    });

    // Insert record into the Patient table using patients model - Registration using own form
    app.post("/api/patients", function (req, res) {

        db.patients.create({
            patient_name: req.body.patient_name,
            email: req.body.email,
            patient_primary_address1: req.body.patient_primary_address1,
            patient_city: req.body.patient_city,
            patient_zip: req.body.patient_zip,
            patient_medical_provider_id: req.body.patient_medical_provider_id,
            patient_medical_insurance_id: req.body.patient_medical_insurance_id,
            patient_dental_provider_id: req.body.patient_dental_provider_id,
            patient_dental_insurance_id: req.body.patient_dental_insurance_id,
            patient_login_name: req.body.patient_login_name,
            patient_login_password: req.body.patient_login_password
        }).then(function (results) {
            res.json(results);
        });
    });

    // Add route to get user id based on user email signin from Okta
    app.get("/api/patient/:okta_email", function (req, res) {
        db.patients.findAll({
            where: { email: req.params.okta_email }
        }).then(function (response) {

            var emailDataObj = {
                patients: response
            };
            res.render('patients', emailDataObj);
        });
    });

    // PATIENT Record Find record for the user in this post and if record exists render back the resut
    // if it does not existing use the Okta data and create record in database.
    // Then render the page back to the user.
    app.post("/api/patient", function (req, res) {
        db.patients.findOne({
            where: { email: req.body.email }
        }).then(function (response) {
            if (response) {

                var emailDataObj = {
                    patients: response
                };
                res.render('patients', emailDataObj);
            }
            else {

                db.patients.create({
                    patient_name: req.body.patient_name,
                    email: req.body.email,
                    patient_primary_address1: req.body.patient_primary_address1,
                    patient_city: req.body.patient_city,
                    patient_zip: req.body.patient_zip,
                    patient_medical_provider_id: req.body.patient_medical_provider_id,
                    patient_medical_insurance_id: req.body.patient_medical_insurance_id,
                    patient_dental_provider_id: req.body.patient_dental_provider_id,
                    patient_dental_insurance_id: req.body.patient_dental_insurance_id,
                    patient_login_name: req.body.patient_login_name,
                    patient_login_password: req.body.patient_login_password
                }).then(function (results) {
                    var emailCreateObj = {
                        patients: results
                    };
                    res.render('patients', emailCreateObj);
                });
            }
        });


    });

    // Find the doctor if the user exists. - May be redundant as Okta handles using next Route
    app.get("/find_doctors/:email", function (req, res) {
        db.patients.findOne({
            where: { email: req.params.email }

        }).then(function (response) {
            var patientObj = {
                patients: response
            }
            res.render("find_doctors", patientObj);
        });
    });


// Insert record into the Doctors table using doctors model and Values being passed from Okta
 app.post("/api/doctor",  function(req, res) {
    db.doctors.findOne({
        where: { email: req.body.email }
    }).then(function (response) {
        if (response) {

            var doctorEmailDataObj = {
                patients: response
            };
            res.render('doctors', doctorEmailDataObj);
        }
        else {
            db.doctors.create({
                doctor_name: req.body.doctor_name,
                email: req.body.email,
                doctor_type: req.body.doctor_type,
                doctor_specialization: req.body.doctor_specialization,
                doctor_type: req.body.doctor_type,
                doctor_primary_address1: req.body.doctor_primary_address1,
                doctor_city: req.body.doctor_city,
                doctor_state: req.body.doctor_state,
                doctor_zip: req.body.doctor_zip,
                doctor_login_name: req.body.doctor_login_name,
                doctor_login_password: req.body.doctor_login_password,
                doctor_insurance_accepted: req.body.doctor_insurance_accepted
            }).then(function (results) {

                var doctorEmailDataObj = {
                    patients: response
                };
                res.render('doctors', doctorEmailDataObj);
            });
        };
    });
});
}