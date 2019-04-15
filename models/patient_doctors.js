// enable strict mode
"use strict";
// def patientDoctors fields and attributes and module exports for global usage
module.exports = function(sequelize, DataTypes){
   var patientDoctors = sequelize.define("patient_doctors", {
        current_patient: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        patient_accepted: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        } ,
        patient_request: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        } ,
        patient_declined: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
   // patientDoctors associations def
     patientDoctors.associate =  function(models){
       // patientDoctors.hasMany(models.patients)    
        
     };
    return patientDoctors;
}