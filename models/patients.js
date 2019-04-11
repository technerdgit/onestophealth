"use strict";
module.exports = function(sequelize, DataTypes) {
    var Patient = sequelize.define("patients", {
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false
      } ,
      patient_primary_address1: {
        type: DataTypes.STRING,
        allowNull: false
      } ,
      patient_primary_address2: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_city: {
        type: DataTypes.STRING,
        allowNull: false
      } ,
      patient_state: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_zip: {
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      patient_medical_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      patient_medical_insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      patient_dental_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      patient_dental_insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      patient_login_name: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_login_password: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      email: {
         type: DataTypes.STRING,
         allowNull: false
      }
    });
  
    Patient.associate = function(models) {

      Patient.belongsToMany(models.insurance_providers, { through: models.patient_insurances});
      Patient.belongsToMany(models.doctors, {through: models.patient_doctors});


    };
  
    return Patient;
  };