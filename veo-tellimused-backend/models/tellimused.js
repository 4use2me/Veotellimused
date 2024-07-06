'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tellimused extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tellimused.init({
    Klient: DataTypes.STRING,
    PealelaadimiseEttevõte: DataTypes.STRING,
    PealelaadimiseAadress: DataTypes.STRING,
    Laadung: DataTypes.STRING,
    PealelaadimiseKuupäev: DataTypes.DATE,
    MahalaadimiseEttevõte: DataTypes.STRING,
    MahalaadimiseAadress: DataTypes.STRING,
    MahalaadimiseKuupäev: DataTypes.DATE,
    Eritingimus: DataTypes.STRING,
    Müügihind: DataTypes.DECIMAL,
    VälineTellimusnumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tellimused',
  });
  return Tellimused;
};