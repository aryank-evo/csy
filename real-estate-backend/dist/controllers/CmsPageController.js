"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCmsPages = exports.updateCmsPage = exports.getCmsPage = void 0;
const database_1 = require("../config/database");
const getCmsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const page = yield database_1.CmsPage.findOne({ where: { slug } });
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
});
exports.getCmsPage = getCmsPage;
const updateCmsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const { title, content } = req.body;
        // Extract image URLs from the request body or use URLs from uploaded files
        let primaryImage = req.body.primaryImage || null;
        let secondaryImage = req.body.secondaryImage || null;
        // Extract new director message fields from the request body
        let directorMsg = req.body.directorMsg || null;
        let directorName = req.body.directorName || null;
        // Extract new about page fields from the request body
        let aboutSubtitle = req.body.aboutSubtitle || null;
        let aboutDesc1 = req.body.aboutDesc1 || null;
        let aboutTitle1 = req.body.aboutTitle1 || null;
        let aboutTitle2 = req.body.aboutTitle2 || null;
        let aboutDesc2 = req.body.aboutDesc2 || null;
        let aboutDesc3 = req.body.aboutDesc3 || null;
        let aboutMission = req.body.aboutMission || null;
        // If images were uploaded via Cloudinary, use the secure URLs
        if (req.files && typeof req.files === 'object') {
            const files = req.files;
            if (files['primaryImage'] && files['primaryImage'][0]) {
                primaryImage = files['primaryImage'][0].path; // Cloudinary secure_url
            }
            if (files['secondaryImage'] && files['secondaryImage'][0]) {
                secondaryImage = files['secondaryImage'][0].path; // Cloudinary secure_url
            }
        }
        let page = yield database_1.CmsPage.findOne({ where: { slug } });
        if (page) {
            yield page.update({ title, content, primaryImage, secondaryImage, directorMsg, directorName, aboutSubtitle, aboutDesc1, aboutTitle1, aboutTitle2, aboutDesc2, aboutDesc3, aboutMission });
        }
        else {
            page = yield database_1.CmsPage.create({ slug, title, content, primaryImage, secondaryImage, directorMsg, directorName, aboutSubtitle, aboutDesc1, aboutTitle1, aboutTitle2, aboutDesc2, aboutDesc3, aboutMission });
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
});
exports.updateCmsPage = updateCmsPage;
const getAllCmsPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield database_1.CmsPage.findAll();
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
});
exports.getAllCmsPages = getAllCmsPages;
