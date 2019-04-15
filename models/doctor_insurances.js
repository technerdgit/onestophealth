// strict mode enable
"use strict";
// exports sequelize doctorInsurance object for global use
    var doctorInsurance = sequelize.define("doctor_insurances", {
    	// deprecated code
    	// insurance_accepted: {
    	// 	type: DataTypes.STRING,
     //    	allowNull: true
    	// }
    });
    // returns doctorInsurance object after defined using sequelize
    return doctorInsurance;
}