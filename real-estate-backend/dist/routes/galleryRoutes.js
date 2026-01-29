"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GalleryController_1 = require("../controllers/GalleryController");
const router = (0, express_1.Router)();
// Public routes
router.get('/', GalleryController_1.getAllGallerySections);
// Protected routes (add middleware if needed)
router.post('/', GalleryController_1.createGallerySection);
router.put('/:id', GalleryController_1.updateGallerySection);
router.delete('/:id', GalleryController_1.deleteGallerySection);
router.post('/reorder', GalleryController_1.reorderGallerySections);
exports.default = router;
