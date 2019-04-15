// enable strict mode
"use strict";
// exports module def
module.exports = function(sequelize, DataTypes) {
    // def insuranceProvider fields and attributes
    var insuranceProvider = sequelize.define("insurance_providers", {
      provider_name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      provider_type: {
          type: DataTypes.STRING,
          allowNull: true
      }
    });
  
  // associate insuranceProvider to patients and doctors models with belongstoMany attribute
    insuranceProvider.associate = function(models) {
      insuranceProvider.belongsToMany(models.patients, { through: models.patient_doctors
      });
      insuranceProvider.belongsToMany(models.doctors, { through: models.patient_doctors });
    };
    // returns insuranceProvider object for global scope usage
    return insuranceProvider;
  };
  