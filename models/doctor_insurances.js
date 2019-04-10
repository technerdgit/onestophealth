"use strict";
module.exports = function(sequelize, DataTypes){
    var doctorInsurance = sequelize.define("doctor_insurances", {
    	// insurance_accepted: {
    	// 	type: DataTypes.STRING,
     //    	allowNull: true
    	// }
    });
    return doctorInsurance;
}