import express from 'express';
import { upload } from '../utils/cloudinary';
import { 
  getAllBlogs, 
  getRecentBlogs, 
  getBlogById, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from '../controllers/BlogController';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/recent', getRecentBlogs);
router.get('/:id', getBlogById);

const blogUpload = upload.fields([
  { name: 'primary_image', maxCount: 1 },
  { name: 'secondary_image', maxCount: 1 }
]);

router.post('/', blogUpload, createBlog);
router.put('/:id', blogUpload, updateBlog);
router.delete('/:id', deleteBlog);

export default router;
