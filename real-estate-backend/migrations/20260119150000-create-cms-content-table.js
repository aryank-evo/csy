'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cms_content', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      component_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      field_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content_type: {
        type: Sequelize.STRING,
        defaultValue: 'text'
      },
      content_value: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addConstraint('cms_content', {
      fields: ['component_name', 'field_name'],
      type: 'unique',
      name: 'unique_component_field'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cms_content');
  }
};
