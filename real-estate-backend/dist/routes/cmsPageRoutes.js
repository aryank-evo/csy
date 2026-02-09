"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const CmsPageController_1 = require("../controllers/CmsPageController");
const cloudinary_1 = require("../utils/cloudinary");
const router = express_1.default.Router();
router.get('/', CmsPageController_1.getAllCmsPages);
router.get('/:slug', CmsPageController_1.getCmsPage);
router.post('/:slug', authMiddleware_1.authenticateAdmin, cloudinary_1.upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'secondaryImage', maxCount: 1 }]), CmsPageController_1.updateCmsPage);
exports.default = router;
