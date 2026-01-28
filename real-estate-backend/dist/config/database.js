"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertisement = exports.CmsPage = exports.CmsContent = exports.Lead = exports.Property = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Import JavaScript models using require
const UserModel = require('../../models/user');
const PropertyModel = require('../../models/property');
const LeadModel = require('../../models/lead');
const CmsContentModel = require('../../models/cmsContent');
// Define CmsPage model inline
class CmsPage extends sequelize_1.Model {
}
exports.CmsPage = CmsPage;
// Define Advertisement model inline
class Advertisement extends sequelize_1.Model {
}
exports.Advertisement = Advertisement;
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
exports.sequelize = new sequelize_1.Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false,
});
// Initialize JavaScript models
const User = UserModel(exports.sequelize, require('sequelize').DataTypes);
exports.User = User;
const Property = PropertyModel(exports.sequelize, require('sequelize').DataTypes);
exports.Property = Property;
const Lead = LeadModel(exports.sequelize, require('sequelize').DataTypes);
exports.Lead = Lead;
const CmsContent = CmsContentModel(exports.sequelize, require('sequelize').DataTypes);
exports.CmsContent = CmsContent;
// Initialize CmsPage model
CmsPage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    primaryImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    secondaryImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    directorMsg: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    directorName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    aboutSubtitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    aboutDesc1: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    aboutTitle1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    aboutTitle2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    aboutDesc2: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    aboutDesc3: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    aboutMission: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "cms_pages",
    sequelize: exports.sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
// Initialize Advertisement model
Advertisement.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Advertisement Section',
    },
    iframe1_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    iframe2_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    iframe3_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "advertisements",
    sequelize: exports.sequelize,
    timestamps: true
});
