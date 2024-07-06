'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tellimuseds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Klient: {
        type: Sequelize.STRING
      },
      PealelaadimiseEttevõte: {
        type: Sequelize.STRING
      },
      PealelaadimiseAadress: {
        type: Sequelize.STRING
      },
      Laadung: {
        type: Sequelize.STRING
      },
      PealelaadimiseKuupäev: {
        type: Sequelize.DATE
      },
      MahalaadimiseEttevõte: {
        type: Sequelize.STRING
      },
      MahalaadimiseAadress: {
        type: Sequelize.STRING
      },
      MahalaadimiseKuupäev: {
        type: Sequelize.DATE
      },
      Eritingimus: {
        type: Sequelize.STRING
      },
      Müügihind: {
        type: Sequelize.DECIMAL
      },
      VälineTellimusnumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tellimuseds');
  }
};