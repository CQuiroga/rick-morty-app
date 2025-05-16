'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
    }
  }

  Character.init({
    apiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'unknown'
    },
    species: {
      type: DataTypes.STRING,
      defaultValue: 'unknown'
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: 'unknown'
    },
    originName: {
      type: DataTypes.STRING,
      defaultValue: 'Desconocido'
    },
    originUrl: DataTypes.STRING,
    locationName: DataTypes.STRING,
    locationUrl: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
    tableName: 'Characters' 
  });

  return Character;
};