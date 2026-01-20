'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CmsContent = sequelize.define('CmsContent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    componentName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'component_name'
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'field_name'
    },
    contentType: {
      type: DataTypes.STRING,
      defaultValue: 'text',
      field: 'content_type'
    },
    contentValue: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'content_value'
    }
  }, {
    tableName: 'cms_content',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return CmsContent;
};
