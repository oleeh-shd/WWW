'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@admin.com',
          password: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test@test.com',
          password: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test1@test1.com',
          password: 'test1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test2@test2.com',
          password: 'test2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
