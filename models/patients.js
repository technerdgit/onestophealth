// enable strict mode
"use strict";
// init exports module for global usage
module.exports = function(sequelize, DataTypes) {
  // def Patient table with column names, attributes etc
    var Patient = sequelize.define("patients", {
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false
      } ,
      patient_primary_address1: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_primary_address2: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_city: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_state: {
        type: DataTypes.STRING,
        allowNull: true
      } ,
      patient_zip: {
        type: DataTypes.INTEGER,
        allowNull: true
      } ,
      patient_medical_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: true
        
      } ,
      patient_medical_insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      } ,
      patient_dental_provider_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      } ,
      patient_dental_insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    // associate Patient object to other models and relations
    Patient.associate = function(models) {

      Patient.belongsToMany(models.insurance_providers, { through: models.patient_insurances});
      Patient.belongsToMany(models.doctors, {through: models.patient_doctors});


    };
  
    return Patient;
  };