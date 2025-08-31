import { ApiMiddleware } from './lib/middleware';
import { validateParams } from './lib/validateParams';
import mailServiceInstance from './lib/mailService';
import Handlebars from 'handlebars';
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const handler = {
    post: async (req, res) => {
        const body = req.body;
        const validRequest = validateParams(['customer_email', 'session_id', 'customer_order', 'order_total'], body)
        if(!validRequest) return res.status(400).json("Missing fields");
        const { customer_email, session_id, customer_order, order_total, customer_first = 'N/A', customer_last = 'N/A', customer_comments = ''} = body
        const customer_phone = body.customer_phone ? body.customer_phone : "N/A"
        
        // Skip if no items in order
        if (!customer_order || customer_order.length === 0) {
            return res.status(400).json("No items in order");
        }
        
        try {
          // Read the HTML templates
          const businessHtmlTemplate = fs.readFileSync(path.join(process.cwd(), 'src/pages/api/lib/emailTemplates/orderConfirmationForBusiness.html'), 'utf8');
          const businessTemplate = Handlebars.compile(businessHtmlTemplate);
          const customerHtmlTemplate = fs.readFileSync(path.join(process.cwd(), 'src/pages/api/lib/emailTemplates/orderConfirmationForCustomer.html'), 'utf8');
          const customerTemplate = Handlebars.compile(customerHtmlTemplate);

          // Define dynamic values
          const replacements = {
            customer_first: customer_first,
            customer_last: customer_last,
            customer_phone: customer_phone,
            customer_email: customer_email,
            customer_comments: customer_comments,
            customer_order: customer_order,
            order_total: order_total
          };

          // Generate the final HTML
          const finalBusinessEmail = businessTemplate(replacements);
          const finalCustomerEmail = customerTemplate(replacements);

          // send confirmation to both parties
          await mailServiceInstance.send({
            to: process.env.EMAIL_USER,
            subject: 'Freelunch Customer Order',
            html: finalBusinessEmail
          });

          await mailServiceInstance.send({
            to: customer_email,
            subject: 'Freelunch Customer Order',
            html: finalCustomerEmail
          });

          return res.status(201).json(`Successfully Sent from session id: ${session_id}`);
      } catch (error) {
        throw error;
      }
    }
}

export default ApiMiddleware(handler);