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
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getRecentBlogs = exports.getAllBlogs = void 0;
const database_1 = require("../config/database");
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield database_1.Blog.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ success: true, data: blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching blogs', error: error.message });
    }
});
exports.getAllBlogs = getAllBlogs;
const getRecentBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield database_1.Blog.findAll({
            limit: 3,
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ success: true, data: blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching recent blogs', error: error.message });
    }
});
exports.getRecentBlogs = getRecentBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield database_1.Blog.findByPk(id);
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        res.status(200).json({ success: true, data: blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching blog', error: error.message });
    }
});
exports.getBlogById = getBlogById;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author_name, category, keywords } = req.body;
        // Handle uploaded images
        const files = req.files;
        const primary_image = (files === null || files === void 0 ? void 0 : files['primary_image']) ? files['primary_image'][0].path : undefined;
        const secondary_image = (files === null || files === void 0 ? void 0 : files['secondary_image']) ? files['secondary_image'][0].path : undefined;
        const blog = yield database_1.Blog.create({
            title,
            content,
            primary_image,
            secondary_image,
            author_name,
            category,
            keywords
        });
        res.status(201).json({ success: true, message: 'Blog created successfully', data: blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error creating blog', error: error.message });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content, author_name, category, keywords } = req.body;
        const blog = yield database_1.Blog.findByPk(id);
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        // Handle uploaded images
        const files = req.files;
        const primary_image = (files === null || files === void 0 ? void 0 : files['primary_image']) ? files['primary_image'][0].path : blog.primary_image;
        const secondary_image = (files === null || files === void 0 ? void 0 : files['secondary_image']) ? files['secondary_image'][0].path : blog.secondary_image;
        yield blog.update({
            title,
            content,
            primary_image,
            secondary_image,
            author_name,
            category,
            keywords
        });
        res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error updating blog', error: error.message });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield database_1.Blog.findByPk(id);
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        yield blog.destroy();
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting blog', error: error.message });
    }
});
exports.deleteBlog = deleteBlog;
