"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCmsPages = exports.updateCmsPage = exports.getCmsPage = void 0;
const database_1 = require("../config/database");
const getCmsPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await database_1.CmsPage.findOne({ where: { slug } });
        if (!page) {
            res.status(404).json({
                success: false,
                message: 'Page not found',
            });
            return;
        }
        res.json({
            success: true,
            data: page,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching page content',
            error: error.message,
        });
    }
};
exports.getCmsPage = getCmsPage;
const updateCmsPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, content } = req.body;
        let primaryImage = req.body.primaryImage || null;
        let secondaryImage = req.body.secondaryImage || null;
        let directorMsg = req.body.directorMsg || null;
        let directorName = req.body.directorName || null;
        let aboutSubtitle = req.body.aboutSubtitle || null;
        let aboutDesc1 = req.body.aboutDesc1 || null;
        let aboutTitle1 = req.body.aboutTitle1 || null;
        let aboutTitle2 = req.body.aboutTitle2 || null;
        let aboutDesc2 = req.body.aboutDesc2 || null;
        let aboutDesc3 = req.body.aboutDesc3 || null;
        let aboutMission = req.body.aboutMission || null;
        let facebookLink = req.body.facebookLink || null;
        let instagramLink = req.body.instagramLink || null;
        let youtubeLink = req.body.youtubeLink || null;
        let contactTitle = req.body.contactTitle || null;
        let contactAddress = req.body.contactAddress || null;
        let contactPhone = req.body.contactPhone || null;
        let contactEmail = req.body.contactEmail || null;
        let googleMapEmbedUrl = req.body.googleMapEmbedUrl || null;
        if (req.files && typeof req.files === 'object') {
            const files = req.files;
            if (files['primaryImage'] && files['primaryImage'][0]) {
                primaryImage = files['primaryImage'][0].path;
            }
            if (files['secondaryImage'] && files['secondaryImage'][0]) {
                secondaryImage = files['secondaryImage'][0].path;
            }
        }
        let page = await database_1.CmsPage.findOne({ where: { slug } });
        if (page) {
            await page.update({ title, content, primaryImage, secondaryImage, directorMsg, directorName, aboutSubtitle, aboutDesc1, aboutTitle1, aboutTitle2, aboutDesc2, aboutDesc3, aboutMission, facebookLink, instagramLink, youtubeLink, contactTitle, contactAddress, contactPhone, contactEmail, googleMapEmbedUrl });
        }
        else {
            page = await database_1.CmsPage.create({ slug, title, content, primaryImage, secondaryImage, directorMsg, directorName, aboutSubtitle, aboutDesc1, aboutTitle1, aboutTitle2, aboutDesc2, aboutDesc3, aboutMission, facebookLink, instagramLink, youtubeLink, contactTitle, contactAddress, contactPhone, contactEmail, googleMapEmbedUrl });
        }
        res.json({
            success: true,
            message: 'Page content updated successfully',
            data: page,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating page content',
            error: error.message,
        });
    }
};
exports.updateCmsPage = updateCmsPage;
const getAllCmsPages = async (req, res) => {
    try {
        const pages = await database_1.CmsPage.findAll();
        res.json({
            success: true,
            data: pages,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching all pages',
            error: error.message,
        });
    }
};
exports.getAllCmsPages = getAllCmsPages;
