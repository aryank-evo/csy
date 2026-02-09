"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getRecentBlogs = exports.getAllBlogs = void 0;
const database_1 = require("../config/database");
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await database_1.Blog.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ success: true, data: blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching blogs', error: error.message });
    }
};
exports.getAllBlogs = getAllBlogs;
const getRecentBlogs = async (req, res) => {
    try {
        const blogs = await database_1.Blog.findAll({
            limit: 3,
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ success: true, data: blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching recent blogs', error: error.message });
    }
};
exports.getRecentBlogs = getRecentBlogs;
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await database_1.Blog.findByPk(id);
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        res.status(200).json({ success: true, data: blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching blog', error: error.message });
    }
};
exports.getBlogById = getBlogById;
const createBlog = async (req, res) => {
    try {
        const { title, content, author_name, category, keywords } = req.body;
        const files = req.files;
        const primary_image = files?.['primary_image'] ? files['primary_image'][0].path : undefined;
        const secondary_image = files?.['secondary_image'] ? files['secondary_image'][0].path : undefined;
        const blog = await database_1.Blog.create({
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
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author_name, category, keywords } = req.body;
        const blog = await database_1.Blog.findByPk(id);
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        const files = req.files;
        const primary_image = files?.['primary_image'] ? files['primary_image'][0].path : blog.primary_image;
        const secondary_image = files?.['secondary_image'] ? files['secondary_image'][0].path : blog.secondary_image;
        await blog.update({
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
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await database_1.Blog.findByPk(id);
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        await blog.destroy();
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting blog', error: error.message });
    }
};
exports.deleteBlog = deleteBlog;
