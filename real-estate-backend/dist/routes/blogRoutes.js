"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("../utils/cloudinary");
const BlogController_1 = require("../controllers/BlogController");
const router = express_1.default.Router();
router.get('/', BlogController_1.getAllBlogs);
router.get('/recent', BlogController_1.getRecentBlogs);
router.get('/:id', BlogController_1.getBlogById);
const blogUpload = cloudinary_1.upload.fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: 1 }
]);
router.post('/', blogUpload, BlogController_1.createBlog);
router.put('/:id', blogUpload, BlogController_1.updateBlog);
router.delete('/:id', BlogController_1.deleteBlog);
exports.default = router;
