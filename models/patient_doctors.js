"use strict";
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

     patientDoctors.associate =  function(models){

        
     };
    return patientDoctors;
}