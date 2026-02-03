'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Lead.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    propertyTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    propertyPrice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    propertyLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    propertyType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new'
    }
  }, {
    sequelize,
    modelName: 'Lead',
    tableName: 'leads',
    timestamps: true
  });
  
  return Lead;
};