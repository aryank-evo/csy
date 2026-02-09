"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySmtpConnection = exports.sendLeadNotificationEmail = exports.sendContactEmail = exports.getSenderEmail = exports.getRecipientEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTransporter = () => {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587');
    const secure = port === 465;
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    return nodemailer_1.default.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });
};
const getRecipientEmail = () => {
    return process.env.CONTACT_FORM_RECIPIENT || 'admin@example.com';
};
exports.getRecipientEmail = getRecipientEmail;
const getSenderEmail = () => {
    return process.env.SMTP_USER || 'noreply@example.com';
};
exports.getSenderEmail = getSenderEmail;
const sendContactEmail = async (name, email, message) => {
    try {
        const transporter = createTransporter();
        const recipient = (0, exports.getRecipientEmail)();
        const sender = (0, exports.getSenderEmail)();
        const mailOptions = {
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
    }
    catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: `Failed to send email: ${error.message}`,
        };
    }
};
exports.sendContactEmail = sendContactEmail;
const sendLeadNotificationEmail = async (data) => {
    try {
        const transporter = createTransporter();
        const recipient = (0, exports.getRecipientEmail)();
        const sender = (0, exports.getSenderEmail)();
        const propertyDetails = [];
        if (data.propertyTitle)
            propertyDetails.push(`<strong>Property:</strong> ${data.propertyTitle}`);
        if (data.propertyPrice)
            propertyDetails.push(`<strong>Price:</strong> ${data.propertyPrice}`);
        if (data.propertyLocation)
            propertyDetails.push(`<strong>Location:</strong> ${data.propertyLocation}`);
        if (data.propertyType)
            propertyDetails.push(`<strong>Type:</strong> ${data.propertyType}`);
        const propertySection = propertyDetails.length > 0
            ? `
        <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #2c5282; margin-top: 0;">Property Details</h3>
          ${propertyDetails.join('<br>')}
        </div>
      ` : '';
        const mailOptions = {
            from: `"Property Lead Notification" <${sender}>`,
            to: recipient,
            subject: `New Property Lead - ${data.name} is interested in property`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #2d3748; background-color: #f7fafc; padding: 20px; border-radius: 8px 8px 0 0; margin: 0;">
            🏠 New Property Lead
          </h2>
          
          <div style="background-color: white; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; padding: 25px;">
            <div style="background-color: #f0fff4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #22543d; margin-top: 0;">Lead Information</h3>
              <p><strong>Lead ID:</strong> #${data.leadId}</p>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Address:</strong> ${data.address}</p>
              <p><strong>Submitted:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
            </div>
            
            ${propertySection}
            
            <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin: 15px 0;">
              <h3 style="color: #975a16; margin-top: 0;">Inquiry Details</h3>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b; margin-top: 10px;">
                ${data.description.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                This lead was generated from your real estate website
              </p>
            </div>
          </div>
        </div>
      `,
            replyTo: data.email !== 'Not provided' ? data.email : undefined,
        };
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: 'Lead notification email sent successfully',
        };
    }
    catch (error) {
        console.error('Error sending lead notification email:', error);
        return {
            success: false,
            message: `Failed to send lead notification email: ${error.message}`,
        };
    }
};
exports.sendLeadNotificationEmail = sendLeadNotificationEmail;
const verifySmtpConnection = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        return {
            success: true,
            message: 'SMTP connection verified successfully',
        };
    }
    catch (error) {
        return {
            success: false,
            message: `SMTP connection failed: ${error.message}`,
        };
    }
};
exports.verifySmtpConnection = verifySmtpConnection;
exports.default = {
    sendContactEmail: exports.sendContactEmail,
    sendLeadNotificationEmail: exports.sendLeadNotificationEmail,
    verifySmtpConnection: exports.verifySmtpConnection,
    getRecipientEmail: exports.getRecipientEmail,
    getSenderEmail: exports.getSenderEmail,
};
