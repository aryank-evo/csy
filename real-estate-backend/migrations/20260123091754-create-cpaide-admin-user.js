'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('Admin@123!', 10);

    await queryInterface.bulkInsert('users', [{
      name: 'Cpaide Admin',
      email: 'admin@csy.com',
      password: hashedPassword,
      isAdmin: true,
      termsAccepted: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@csy.com'
    });
  }
};
