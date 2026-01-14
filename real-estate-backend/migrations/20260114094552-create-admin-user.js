'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create an admin user
    await queryInterface.bulkInsert('users', [{
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2b$10$LXd8p8zJjGQESY.bNk3PweD7QjX4B1oO1v5Jq9.XoUz3j.YQ2.y0K', // Password: admin123
      termsAccepted: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove the admin user
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  }
};
