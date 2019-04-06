"use strict";
module.exports = function(sequelize, DataTypes){
   var patientDoctors = sequelize.define("patient_doctors", {
        current_patient: {
            type: DataTypes.BOOLEAN
        },
        patient_accepted: DataTypes.BOOLEAN,
        patient_request:  DataTypes.BOOLEAN
    });

     patientDoctors.associate =  function(models){

        
     };
    return patientDoctors;
}