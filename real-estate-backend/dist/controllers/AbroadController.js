"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.updateListing = exports.createListing = exports.getListingById = exports.getCountriesWithListings = exports.getAllListings = exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getCountryById = exports.getAllCountries = void 0;
const AbroadCountry_1 = require("../models/AbroadCountry");
const AbroadListing_1 = require("../models/AbroadListing");
require("../models/associations");
const getAllCountries = async (req, res) => {
    try {
        const { active_only } = req.query;
        const whereClause = active_only === 'true' ? { is_active: true } : {};
        const countries = await AbroadCountry_1.AbroadCountry.findAll({
            where: whereClause,
            order: [['display_order', 'ASC'], ['created_at', 'DESC']],
        });
        res.json({
            success: true,
            data: countries,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching countries',
            error: error.message,
        });
    }
};
exports.getAllCountries = getAllCountries;
const getCountryById = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await AbroadCountry_1.AbroadCountry.findByPk(id);
        if (!country) {
            res.status(404).json({
                success: false,
                message: 'Country not found',
            });
            return;
        }
        res.json({
            success: true,
            data: country,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching country',
            error: error.message,
        });
    }
};
exports.getCountryById = getCountryById;
const createCountry = async (req, res) => {
    try {
        const { name, description, is_active, display_order } = req.body;
        let thumbnail;
        if (req.file) {
            thumbnail = req.file.path;
        }
        const country = await AbroadCountry_1.AbroadCountry.create({
            name,
            description,
            thumbnail,
            is_active: is_active !== undefined ? is_active : true,
            display_order: display_order || 0,
        });
        res.status(201).json({
            success: true,
            message: 'Country created successfully',
            data: country,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating country',
            error: error.message,
        });
    }
};
exports.createCountry = createCountry;
const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, is_active, display_order } = req.body;
        const country = await AbroadCountry_1.AbroadCountry.findByPk(id);
        if (!country) {
            res.status(404).json({
                success: false,
                message: 'Country not found',
            });
            return;
        }
        let thumbnail = country.thumbnail;
        if (req.file) {
            thumbnail = req.file.path;
        }
        await country.update({
            name,
            description,
            thumbnail,
            is_active,
            display_order,
        });
        res.json({
            success: true,
            message: 'Country updated successfully',
            data: country,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating country',
            error: error.message,
        });
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await AbroadCountry_1.AbroadCountry.findByPk(id);
        if (!country) {
            res.status(404).json({
                success: false,
                message: 'Country not found',
            });
            return;
        }
        await country.destroy();
        res.json({
            success: true,
            message: 'Country deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting country',
            error: error.message,
        });
    }
};
exports.deleteCountry = deleteCountry;
const getAllListings = async (req, res) => {
    try {
        const { country_id, active_only } = req.query;
        const whereClause = {};
        if (country_id) {
            whereClause.country_id = country_id;
        }
        if (active_only === 'true') {
            whereClause.is_active = true;
        }
        const listings = await AbroadListing_1.AbroadListing.findAll({
            where: whereClause,
            order: [['display_order', 'ASC'], ['created_at', 'DESC']],
        });
        res.json({
            success: true,
            data: listings,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching listings',
            error: error.message,
        });
    }
};
exports.getAllListings = getAllListings;
const getCountriesWithListings = async (req, res) => {
    try {
        const { active_only } = req.query;
        const countryWhere = active_only === 'true' ? { is_active: true } : {};
        const countries = await AbroadCountry_1.AbroadCountry.findAll({
            where: countryWhere,
            order: [['display_order', 'ASC'], ['created_at', 'DESC']],
            include: [{
                    model: AbroadListing_1.AbroadListing,
                    as: 'listings',
                    where: { is_active: true },
                    required: false,
                    order: [['display_order', 'ASC']],
                }],
        });
        res.json({
            success: true,
            data: countries,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching countries and listings',
            error: error.message,
        });
    }
};
exports.getCountriesWithListings = getCountriesWithListings;
const getListingById = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await AbroadListing_1.AbroadListing.findByPk(id);
        if (!listing) {
            res.status(404).json({
                success: false,
                message: 'Listing not found',
            });
            return;
        }
        res.json({
            success: true,
            data: listing,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching listing',
            error: error.message,
        });
    }
};
exports.getListingById = getListingById;
const createListing = async (req, res) => {
    try {
        const { country_id, title, link, is_active, display_order } = req.body;
        let image;
        if (req.file) {
            image = req.file.path;
        }
        const listing = await AbroadListing_1.AbroadListing.create({
            country_id: parseInt(country_id),
            title,
            link,
            image,
            is_active: is_active !== undefined ? is_active : true,
            display_order: display_order || 0,
        });
        res.status(201).json({
            success: true,
            message: 'Listing created successfully',
            data: listing,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating listing',
            error: error.message,
        });
    }
};
exports.createListing = createListing;
const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { country_id, title, link, is_active, display_order } = req.body;
        const listing = await AbroadListing_1.AbroadListing.findByPk(id);
        if (!listing) {
            res.status(404).json({
                success: false,
                message: 'Listing not found',
            });
            return;
        }
        let image = listing.image;
        if (req.file) {
            image = req.file.path;
        }
        await listing.update({
            country_id: country_id ? parseInt(country_id) : listing.country_id,
            title,
            link,
            image,
            is_active,
            display_order,
        });
        res.json({
            success: true,
            message: 'Listing updated successfully',
            data: listing,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating listing',
            error: error.message,
        });
    }
};
exports.updateListing = updateListing;
const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await AbroadListing_1.AbroadListing.findByPk(id);
        if (!listing) {
            res.status(404).json({
                success: false,
                message: 'Listing not found',
            });
            return;
        }
        await listing.destroy();
        res.json({
            success: true,
            message: 'Listing deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting listing',
            error: error.message,
        });
    }
};
exports.deleteListing = deleteListing;
