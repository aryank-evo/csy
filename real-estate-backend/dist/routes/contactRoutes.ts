import { Router } from 'express';
import { sendContactForm, testSmtpConnection } from '../controllers/ContactController';

const router = Router();

// Contact form submission route
router.post('/send', sendContactForm);

// SMTP connection test route (for debugging/configuration)
router.get('/test-smtp', testSmtpConnection);

export default router;
