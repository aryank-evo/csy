"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dealer = exports.Blog = exports.GallerySection = exports.Advertisement = exports.CmsPage = exports.CmsContent = exports.Lead = exports.Property = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const GallerySection_1 = require("../models/GallerySection");
Object.defineProperty(exports, "GallerySection", { enumerable: true, get: function () { return GallerySection_1.GallerySection; } });
const Blog_1 = require("../models/Blog");
Object.defineProperty(exports, "Blog", { enumerable: true, get: function () { return Blog_1.Blog; } });
const Dealer_1 = require("../models/Dealer");
Object.defineProperty(exports, "Dealer", { enumerable: true, get: function () { return Dealer_1.Dealer; } });
const UserModel = require('../../models/user');
const PropertyModel = require('../../models/property');
const LeadModel = require('../../models/lead');
const CmsContentModel = require('../../models/cmsContent');
class CmsPage extends sequelize_1.Model {
}
exports.CmsPage = CmsPage;
class Advertisement extends sequelize_1.Model {
}
exports.Advertisement = Advertisement;
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
exports.sequelize = new sequelize_1.Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false,
});
const User = UserModel(exports.sequelize, require('sequelize').DataTypes);
exports.User = User;
const Property = PropertyModel(exports.sequelize, require('sequelize').DataTypes);
exports.Property = Property;
const Lead = LeadModel(exports.sequelize, require('sequelize').DataTypes);
exports.Lead = Lead;
const CmsContent = CmsContentModel(exports.sequelize, require('sequelize').DataTypes);
exports.CmsContent = CmsContent;
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
    },
    facebookLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    instagramLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    youtubeLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    contactTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    contactAddress: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    contactPhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    contactEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    googleMapEmbedUrl: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "cms_pages",
    sequelize: exports.sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
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
GallerySection_1.GallerySection.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    heading: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    youtube_links: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'gallery_sections',
    sequelize: exports.sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
Blog_1.Blog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    primary_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    secondary_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    author_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    keywords: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'blogs',
    sequelize: exports.sequelize,
    timestamps: true,
    underscored: true
});
Dealer_1.Dealer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    short_description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    full_description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    primary_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    display_order: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'dealers',
    sequelize: exports.sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
