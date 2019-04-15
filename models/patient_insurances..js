// enable strict mode
"use strict";
// exports patientInsurance object after sequelize init
module.exports = function(sequelize, DataTypes){
    var patientInsurance = sequelize.define("patient_insurances", {

    });
    return patientInsurance;
}