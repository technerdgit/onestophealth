"use strict";
module.exports = function(sequelize, DataTypes) {
    var insuranceProvider = sequelize.define("insurance_provider", {
      provider_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1]
          }
      },
      provider_type: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1]
          }
      }
    });
  
    insuranceProvider.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      insuranceProvider.belongsToMany(models.patient, { through: models.patient_doctors
      });
      insuranceProvider.hasMany(models.doctor, {
        onDelete: "cascade",
        onUpdate: "cascade"
 });
    };
  
    return insuranceProvider;
  };
  