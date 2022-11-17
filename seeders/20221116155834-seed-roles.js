'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        value: 'ADMIN',
        description: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 'USER',
        description: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 'INVESTOR',
        description: 'investor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
