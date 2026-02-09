"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbroadCountry_1 = require("./AbroadCountry");
const AbroadListing_1 = require("./AbroadListing");
AbroadCountry_1.AbroadCountry.hasMany(AbroadListing_1.AbroadListing, {
    foreignKey: 'country_id',
    as: 'listings',
    onDelete: 'CASCADE',
});
AbroadListing_1.AbroadListing.belongsTo(AbroadCountry_1.AbroadCountry, {
    foreignKey: 'country_id',
    as: 'country',
});
