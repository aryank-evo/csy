import { Request, Response } from 'express';
import { sendContactEmail, verifySmtpConnection } from '../utils/nodemailer';

export const sendContactForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
      return;
    }

    const result = await sendContactEmail(name, email, message);

    if (result.success) {
      res.json({
        success: true,
        message: 'Your message has been sent successfully!',
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending your message. Please try again.',
    });
  }
};

export const testSmtpConnection = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await verifySmtpConnection();

    if (result.success) {
      res.json({
        success: true,
        message: result.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `SMTP test failed: ${(error as Error).message}`,
    });
  }
};
