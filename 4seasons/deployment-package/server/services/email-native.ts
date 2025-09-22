import nodemailer from 'nodemailer';
import { logger } from '../logger';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean; // true for 465, false for other ports
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  fromName: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  propertyInterest?: string;
  propertyId?: string;
  source?: string;
  timestamp: Date;
}

export interface PropertyInquiryData {
  name: string;
  email: string;
  phone?: string;
  propertyId: string;
  propertyAddress: string;
  message: string;
  requestType: 'viewing' | 'information' | 'offer' | 'callback';
  preferredContact: 'email' | 'phone' | 'both';
  timestamp: Date;
}

export class NativeEmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig | null = null;
  private isConfigured = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    try {
      // GoDaddy typically supports these SMTP settings
      const config: EmailConfig = {
        host: process.env.SMTP_HOST || 'smtpout.secureserver.net', // GoDaddy SMTP
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true' || true, // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || ''
        },
        from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
        fromName: process.env.SMTP_FROM_NAME || '4 Seasons Real Estate'
      };

      if (!config.auth.user || !config.auth.pass) {
        logger.warn('SMTP credentials not configured. Email functionality disabled.');
        return;
      }

      this.config = config;
      this.createTransporter();
      this.isConfigured = true;
      
      logger.info('Native email service initialized successfully', {
        host: config.host,
        port: config.port,
        user: config.auth.user
      });

    } catch (error) {
      logger.error('Failed to initialize native email service', error);
    }
  }

  private createTransporter(): void {
    if (!this.config) return;

    this.transporter = nodemailer.createTransporter({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      auth: {
        user: this.config.auth.user,
        pass: this.config.auth.pass
      },
      tls: {
        // Don't fail on invalid certs (GoDaddy sometimes has cert issues)
        rejectUnauthorized: false
      }
    });
  }

  /**
   * Test email connection
   */
  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      logger.info('SMTP connection verified successfully');
      return true;
    } catch (error) {
      logger.error('SMTP connection test failed', error);
      return false;
    }
  }

  /**
   * Send contact form email
   */
  async sendContactForm(data: ContactFormData): Promise<boolean> {
    if (!this.isConfigured || !this.transporter || !this.config) {
      logger.warn('Email service not configured, cannot send contact form');
      return false;
    }

    try {
      const template = this.generateContactFormTemplate(data);
      
      const mailOptions = {
        from: `"${this.config.fromName}" <${this.config.from}>`,
        to: process.env.CONTACT_EMAIL || this.config.from,
        replyTo: data.email,
        subject: template.subject,
        text: template.text,
        html: template.html
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      logger.info('Contact form email sent successfully', {
        messageId: result.messageId,
        from: data.email,
        name: data.name
      });

      return true;
    } catch (error) {
      logger.error('Failed to send contact form email', {
        error,
        from: data.email,
        name: data.name
      });
      return false;
    }
  }

  /**
   * Send property inquiry email
   */
  async sendPropertyInquiry(data: PropertyInquiryData): Promise<boolean> {
    if (!this.isConfigured || !this.transporter || !this.config) {
      logger.warn('Email service not configured, cannot send property inquiry');
      return false;
    }

    try {
      const template = this.generatePropertyInquiryTemplate(data);
      
      const mailOptions = {
        from: `"${this.config.fromName}" <${this.config.from}>`,
        to: process.env.AGENT_EMAIL || this.config.from,
        replyTo: data.email,
        subject: template.subject,
        text: template.text,
        html: template.html
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      logger.info('Property inquiry email sent successfully', {
        messageId: result.messageId,
        from: data.email,
        propertyId: data.propertyId
      });

      return true;
    } catch (error) {
      logger.error('Failed to send property inquiry email', {
        error,
        from: data.email,
        propertyId: data.propertyId
      });
      return false;
    }
  }

  /**
   * Send confirmation email to user
   */
  async sendConfirmation(data: ContactFormData | PropertyInquiryData): Promise<boolean> {
    if (!this.isConfigured || !this.transporter || !this.config) {
      return false;
    }

    try {
      const template = this.generateConfirmationTemplate(data);
      
      const mailOptions = {
        from: `"${this.config.fromName}" <${this.config.from}>`,
        to: data.email,
        subject: template.subject,
        text: template.text,
        html: template.html
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      logger.info('Confirmation email sent successfully', {
        messageId: result.messageId,
        to: data.email
      });

      return true;
    } catch (error) {
      logger.error('Failed to send confirmation email', {
        error,
        to: data.email
      });
      return false;
    }
  }

  /**
   * Generate contact form email template
   */
  private generateContactFormTemplate(data: ContactFormData): EmailTemplate {
    const subject = `New Contact Form Submission - ${data.name}`;
    
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #2563eb; }
            .value { margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${data.name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${data.email}</span>
              </div>
              ${data.phone ? `
                <div class="field">
                  <span class="label">Phone:</span>
                  <span class="value">${data.phone}</span>
                </div>
              ` : ''}
              ${data.subject ? `
                <div class="field">
                  <span class="label">Subject:</span>
                  <span class="value">${data.subject}</span>
                </div>
              ` : ''}
              ${data.propertyInterest ? `
                <div class="field">
                  <span class="label">Property Interest:</span>
                  <span class="value">${data.propertyInterest}</span>
                </div>
              ` : ''}
              <div class="field">
                <span class="label">Message:</span>
                <div style="margin-top: 10px; padding: 15px; background: white; border-left: 4px solid #2563eb;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div class="field">
                <span class="label">Submitted:</span>
                <span class="value">${data.timestamp.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.subject ? `Subject: ${data.subject}` : ''}
${data.propertyInterest ? `Property Interest: ${data.propertyInterest}` : ''}

Message:
${data.message}

Submitted: ${data.timestamp.toLocaleString()}
    `.trim();

    return { subject, html, text };
  }

  /**
   * Generate property inquiry email template
   */
  private generatePropertyInquiryTemplate(data: PropertyInquiryData): EmailTemplate {
    const requestTypes = {
      viewing: 'Schedule a Viewing',
      information: 'Request Information',
      offer: 'Submit an Offer',
      callback: 'Request Callback'
    };

    const subject = `Property Inquiry - ${data.propertyAddress} - ${data.name}`;
    
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
            .property-info { background: #f0f9ff; padding: 15px; margin: 15px 0; border-left: 4px solid #16a34a; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #16a34a; }
            .value { margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Property Inquiry</h1>
            </div>
            <div class="property-info">
              <h2>Property: ${data.propertyAddress}</h2>
              <p><strong>Property ID:</strong> ${data.propertyId}</p>
              <p><strong>Request Type:</strong> ${requestTypes[data.requestType]}</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${data.name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${data.email}</span>
              </div>
              ${data.phone ? `
                <div class="field">
                  <span class="label">Phone:</span>
                  <span class="value">${data.phone}</span>
                </div>
              ` : ''}
              <div class="field">
                <span class="label">Preferred Contact:</span>
                <span class="value">${data.preferredContact}</span>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div style="margin-top: 10px; padding: 15px; background: white; border-left: 4px solid #16a34a;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div class="field">
                <span class="label">Submitted:</span>
                <span class="value">${data.timestamp.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
Property Inquiry

Property: ${data.propertyAddress}
Property ID: ${data.propertyId}
Request Type: ${requestTypes[data.requestType]}

Contact Information:
Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Preferred Contact: ${data.preferredContact}

Message:
${data.message}

Submitted: ${data.timestamp.toLocaleString()}
    `.trim();

    return { subject, html, text };
  }

  /**
   * Generate confirmation email template
   */
  private generateConfirmationTemplate(data: ContactFormData | PropertyInquiryData): EmailTemplate {
    const isPropertyInquiry = 'propertyId' in data;
    
    const subject = isPropertyInquiry 
      ? 'Thank you for your property inquiry - 4 Seasons Real Estate'
      : 'Thank you for contacting us - 4 Seasons Real Estate';
    
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>4 Seasons Real Estate</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              
              <p>Thank you for ${isPropertyInquiry ? 'your property inquiry' : 'contacting us'}. We have received your message and will respond within 24 hours.</p>
              
              ${isPropertyInquiry && 'propertyAddress' in data ? `
                <p><strong>Property:</strong> ${data.propertyAddress}</p>
              ` : ''}
              
              <p>Here's a summary of what you submitted:</p>
              <ul>
                <li><strong>Email:</strong> ${data.email}</li>
                ${data.phone ? `<li><strong>Phone:</strong> ${data.phone}</li>` : ''}
                <li><strong>Message:</strong> ${data.message}</li>
                <li><strong>Submitted:</strong> ${data.timestamp.toLocaleString()}</li>
              </ul>
              
              <p>If you have any urgent questions, please don't hesitate to call us directly.</p>
              
              <p>Best regards,<br>
              The 4 Seasons Real Estate Team</p>
            </div>
            <div class="footer">
              <p>4 Seasons Real Estate | Your Trusted Real Estate Partner</p>
              <p>This is an automated confirmation email. Please do not reply directly to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
Dear ${data.name},

Thank you for ${isPropertyInquiry ? 'your property inquiry' : 'contacting us'}. We have received your message and will respond within 24 hours.

${isPropertyInquiry && 'propertyAddress' in data ? `Property: ${data.propertyAddress}\n` : ''}

Summary of your submission:
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}\n` : ''}- Message: ${data.message}
- Submitted: ${data.timestamp.toLocaleString()}

If you have any urgent questions, please don't hesitate to call us directly.

Best regards,
The 4 Seasons Real Estate Team

---
4 Seasons Real Estate | Your Trusted Real Estate Partner
This is an automated confirmation email. Please do not reply directly to this email.
    `.trim();

    return { subject, html, text };
  }

  /**
   * Health check for email service
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; details: any }> {
    if (!this.isConfigured) {
      return {
        status: 'unhealthy',
        details: { error: 'Email service not configured' }
      };
    }

    try {
      const isConnected = await this.testConnection();
      return {
        status: isConnected ? 'healthy' : 'unhealthy',
        details: {
          configured: this.isConfigured,
          connected: isConnected,
          host: this.config?.host,
          port: this.config?.port
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }

  /**
   * Check if email service is ready
   */
  isReady(): boolean {
    return this.isConfigured && this.transporter !== null;
  }
}

// Export singleton instance
export const nativeEmailService = new NativeEmailService();