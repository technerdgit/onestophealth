"use strict";
module.exports = function(sequelize, DataTypes) {
    var Doctor = sequelize.define("doctors", {
      doctor_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
      } ,
      doctor_type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      doctor_specilization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      doctor_primary_address1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      doctor_primary_address2: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      doctor_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      doctor_state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      doctor_zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [5]
        }
      } ,
      doctor_login_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
      } ,
      doctor_login_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
      } 
    });

    
    Doctor.associate = function(models) {
      Doctor.belongsToMany(models.patients, { through: models.patient_doctors});
     Doctor.belongsToMany(models.insurance_providers, { through: models.doctor_insurances});

       };
  
    return Doctor;
  };