'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('deposits', [
      {
        amount: 3333,
        currency: 'USD',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 4444,
        currency: 'USD',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 5555,
        currency: 'USD',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 6666,
        currency: 'USD',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 7000,
        currency: 'USD',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('deposits', null, {});
  },
};
