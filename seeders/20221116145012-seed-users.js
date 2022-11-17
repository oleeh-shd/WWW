/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@admin.com',
          password: await bcrypt.hash('admin', 5),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test@test.com',
          password: await bcrypt.hash('test', 5),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test1@test1.com',
          password: await bcrypt.hash('test1', 5),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test2@test2.com',
          password: await bcrypt.hash('test2', 5),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'withinviter@withinviter.com',
          password: await bcrypt.hash('withinviter', 5),
          createdAt: new Date(),
          updatedAt: new Date(),
          invitedBy: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
