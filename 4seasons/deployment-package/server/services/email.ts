import nodemailer, { Transporter } from 'nodemailer';
import { logger } from '../logger';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyInterest?: string;
}

class EmailService {
  private transporter: Transporter | null = null;
  private isConfigured = false;
  private config: EmailConfig;

  constructor() {
    this.config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      }
    };

    this.initialize();
  }

  /**
   * Initialize the email transporter
   */
  private async initialize(): Promise<void> {
    if (!this.config.auth.user || !this.config.auth.pass) {
      logger.warn('Email service not configured - SMTP credentials missing');
      return;
    }

    try {
      this.transporter = nodemailer.createTransporter({
        host: this.config.host,
        port: this.config.port,
        secure: this.config.secure,
        auth: this.config.auth,
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 20000,
        rateLimit: 5
      });

      // Verify the connection configuration
      await this.transporter.verify();
      this.isConfigured = true;
      
      logger.info('Email service initialized successfully', {
        host: this.config.host,
        port: this.config.port,
        user: this.config.auth.user
      });
    } catch (error) {
      logger.error('Failed to initialize email service', error);
      this.transporter = null;
      this.isConfigured = false;
    }
  }

  /**
   * Check if email service is ready
   */
  isReady(): boolean {
    return this.isConfigured && this.transporter !== null;
  }

  /**
   * Send a generic email
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.isReady()) {
      logger.warn('Email service not available');
      return false;
    }

    try {
      const mailOptions = {
        from: options.from || `"4Seasons Real Estate" <${this.config.auth.user}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      };

      const info = await this.transporter!.sendMail(mailOptions);
      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to: options.to,
        subject: options.subject
      });

      return true;
    } catch (error) {
      logger.error('Failed to send email', {
        error,
        to: options.to,
        subject: options.subject
      });
      return false;
    }
  }

  /**
   * Send contact form submission email
   */
  async sendContactFormEmail(data: ContactFormData): Promise<boolean> {
    const contactEmail = process.env.CONTACT_EMAIL || 'info@4seasonsrealestate.com';
    
    const subject = data.propertyInterest 
      ? `New Contact Form: ${data.propertyInterest}` 
      : 'New Contact Form Submission';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: #0d0d33; padding: 20px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0;">4Seasons Real Estate</h1>
          <p style="color: #e2e8f0; margin: 5px 0 0 0;">New Contact Form Submission</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">Name:</strong>
            <span style="margin-left: 10px; color: #1e293b;">${data.name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">Email:</strong>
            <a href="mailto:${data.email}" style="margin-left: 10px; color: #0d0d33; text-decoration: none;">${data.email}</a>
          </div>
          
          ${data.phone ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">Phone:</strong>
            <a href="tel:${data.phone}" style="margin-left: 10px; color: #0d0d33; text-decoration: none;">${data.phone}</a>
          </div>
          ` : ''}
          
          ${data.propertyInterest ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">Property Interest:</strong>
            <span style="margin-left: 10px; color: #1e293b;">${data.propertyInterest}</span>
          </div>
          ` : ''}
          
          <div style="margin-top: 25px;">
            <h3 style="color: #1e293b; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #0d0d33;">
              <p style="margin: 0; line-height: 1.6; color: #334155;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              Submitted on ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/Chicago',
                dateStyle: 'full',
                timeStyle: 'short'
              })} (CDT)
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 15px;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            This email was generated automatically from your website contact form.
          </p>
        </div>
      </div>
    `;

    const text = `
New Contact Form Submission - 4Seasons Real Estate

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.propertyInterest ? `Property Interest: ${data.propertyInterest}` : ''}

Message:
${data.message}

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CDT
    `;

    return await this.sendEmail({
      to: contactEmail,
      subject,
      text,
      html
    });
  }

  /**
   * Send confirmation email to the person who submitted the form
   */
  async sendContactConfirmationEmail(data: ContactFormData): Promise<boolean> {
    const subject = 'Thank you for contacting 4Seasons Real Estate';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: #0d0d33; padding: 20px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0;">4Seasons Real Estate</h1>
          <p style="color: #e2e8f0; margin: 5px 0 0 0;">Thank You For Your Interest</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${data.name},</h2>
          
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to 4Seasons Real Estate! We've received your message and truly appreciate your interest in our services.
          </p>
          
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; border-left: 4px solid #0d0d33; margin: 20px 0;">
            <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h3>
            <ul style="color: #475569; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>One of our experienced real estate professionals will review your inquiry</li>
              <li>We'll contact you within 24 hours (typically much sooner!)</li>
              <li>We'll discuss your specific needs and how we can assist you</li>
            </ul>
          </div>
          
          <p style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
            In the meantime, feel free to explore our website to learn more about our services, view available properties, and discover valuable resources for buyers and sellers.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.SITE_URL || 'https://4seasonsrealestate.com'}" 
               style="background-color: #0d0d33; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <h3 style="color: #1e293b; margin-bottom: 15px; font-size: 16px;">Contact Information</h3>
            <p style="color: #475569; margin: 5px 0;">📧 Email: <a href="mailto:info@4seasonsrealestate.com" style="color: #0d0d33;">info@4seasonsrealestate.com</a></p>
            <p style="color: #475569; margin: 5px 0;">📞 Phone: <a href="tel:2142743873" style="color: #0d0d33;">(214) 274-3873</a></p>
            <p style="color: #475569; margin: 5px 0;">📍 Office: 1333 W. McDermott Dr #200, Allen, TX, 75013</p>
            <p style="color: #475569; margin: 5px 0;">🕐 Hours: Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 15px;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 10px 0;">
            This is an automated confirmation. Please do not reply to this email.
          </p>
          <div style="margin-top: 15px;">
            <a href="https://www.facebook.com/amysrealty/" style="color: #64748b; text-decoration: none; margin: 0 10px;">Facebook</a>
            <a href="https://www.linkedin.com/in/amy-harwood-28209b179/" style="color: #64748b; text-decoration: none; margin: 0 10px;">LinkedIn</a>
          </div>
        </div>
      </div>
    `;

    const text = `
Hello ${data.name},

Thank you for reaching out to 4Seasons Real Estate! We've received your message and truly appreciate your interest in our services.

What happens next?
• One of our experienced real estate professionals will review your inquiry
• We'll contact you within 24 hours (typically much sooner!)
• We'll discuss your specific needs and how we can assist you

Contact Information:
Email: info@4seasonsrealestate.com
Phone: (214) 274-3873
Office: 1333 W. McDermott Dr #200, Allen, TX, 75013
Hours: Mon-Fri: 9AM-6PM, Sat: 10AM-4PM

Best regards,
4Seasons Real Estate Team

This is an automated confirmation. Please do not reply to this email.
    `;

    return await this.sendEmail({
      to: data.email,
      subject,
      text,
      html
    });
  }

  /**
   * Health check for email service
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    configured: boolean;
    error?: string;
  }> {
    if (!this.isConfigured) {
      return {
        status: 'unhealthy',
        configured: false,
        error: 'Email service not configured'
      };
    }

    if (!this.transporter) {
      return {
        status: 'unhealthy',
        configured: true,
        error: 'Transporter not available'
      };
    }

    try {
      await this.transporter.verify();
      return {
        status: 'healthy',
        configured: true
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        configured: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();