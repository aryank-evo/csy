'use strict';

/** @type {import('sequelize-cli').Seeders} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed the about-us page
    await queryInterface.bulkInsert('cms_pages', [{
      slug: 'about-us',
      title: 'About Us',
      content: '<p>Welcome to our real estate company. We are dedicated to helping you find your dream home with professional service and expertise.</p>',
      primaryImage: null,
      secondaryImage: null,
      directorMsg: null,
      directorName: null,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove the about-us page
    await queryInterface.bulkDelete('cms_pages', { slug: 'about-us' }, {});
  }
};