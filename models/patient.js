"use strict";
module.exports = function(sequelize, DataTypes) {
    var Patient = sequelize.define("patient", {
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
      } ,
      patient_primary_address1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      patient_primary_address2: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      patient_state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      } ,
      patient_zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [5]
        }
      } ,
      patient_medial_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [7]
        }
      } ,
      patient_medical_insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [10]
        }
      } ,
      patient_dental_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [7]
        }
      } ,
      patient_dental_insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [10]
        }
      } ,
      patient_login_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
      } ,
      patient_login_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
      } 
    });
  
    Patient.associate = function(models) {

      Patient.belongsToMany(models.insurance_provider, { through: models.patient_insurance});
      Patient.belongsToMany(models.doctor, {through: models.patient_doctors});


    };
  
    return Patient;
  };