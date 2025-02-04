const nodemailer = require('nodemailer');
require('dotenv').config();

class MailService {
    constructor() {
      if (!MailService.instance) {
        // Initialize the transporter only once
        this.transporter = nodemailer.createTransport({
          // service: process.env.SMTP_SERVICE,
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          },
          logger: true,
          debug: true, // Enable detailed logs
        });
  
        MailService.instance = this; // Save the instance
      }
  
      return MailService.instance; // Return the existing instance
    }
  
    /**
     * Sends an email using the provided options.
     * @param {Object} options - The email options
      * from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com', see Address object for details
      * to - Comma separated list or an array of recipients email addresses that will appear on the To: field
      * cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
      * bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
      * subject - The subject of the email
      * text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
      * html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
      * attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.
     * @returns {Promise} - A promise that resolves if the email is sent successfully.
     */
    async send(options) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          ...options,
        };
  
        const info = await this.transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return "Email Sent";
      } catch (error) {
        console.error(error);
        return "Error Sending Email";
      }
    }
}

const mailServiceInstance = new MailService();
// mailServiceInstance.sendMail({
//   to: 'isabelhernandez123@gmail.com',
//   subject: 'freelunch test',
//   html: '<html><p style="color: green">TESTING!!!</p></html>'
// })
export default mailServiceInstance;