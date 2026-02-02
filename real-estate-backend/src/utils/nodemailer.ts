import nodemailer from 'nodemailer';

// Email configuration interface
export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Create transporter based on environment variables
const createTransporter = (): nodemailer.Transporter => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = port === 465; // Use true for SSL/TLS (port 465)
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

// Get the recipient email from environment variables
export const getRecipientEmail = (): string => {
  return process.env.CONTACT_FORM_RECIPIENT || 'admin@example.com';
};

// Get the sender email from environment variables
export const getSenderEmail = (): string => {
  return process.env.SMTP_USER || 'noreply@example.com';
};

// Send contact form email
export const sendContactEmail = async (
  name: string,
  email: string,
  message: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const transporter = createTransporter();
    const recipient = getRecipientEmail();
    const sender = getSenderEmail();

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Website Contact Form" <${sender}>`,
      to: recipient,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the contact form on your website.
          </p>
        </div>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: `Failed to send email: ${(error as Error).message}`,
    };
  }
};

// Verify SMTP connection (useful for testing configuration)
export const verifySmtpConnection = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return {
      success: true,
      message: 'SMTP connection verified successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: `SMTP connection failed: ${(error as Error).message}`,
    };
  }
};

export default {
  sendContactEmail,
  verifySmtpConnection,
  getRecipientEmail,
  getSenderEmail,
};
