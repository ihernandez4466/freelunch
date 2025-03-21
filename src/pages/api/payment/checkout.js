import { ApiMiddleware } from '../../../lib/middleware'
import { validateParams } from '../lib/validateParams'
import Handlebars from 'handlebars';
const fs = require('fs');
const path = require('path');

//import mailServiceInstance from '../lib/mailService';
require('dotenv').config();

const handler = {
    post: async (req, res) => {
        const body = JSON.parse(req.body);
        const validRequest = validateParams(['customer_first', 'customer_email', 'customer_last', 'customer_order'], body)
        if(!validRequest) return res.status(400).json("Missing fields");
        const { customer_first, customer_last, customer_email, customer_comments, customer_order } = body
        const customer_phone = body.customer_phone ? body.customer_phone : "N/A"
        
        // Update cart and order tables TODO

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
          customer_order: customer_order
        };

        // Generate the final HTML
        const finalBusinessEmail = businessTemplate(replacements);
        const finalCustomerEmail = customerTemplate(replacements);

        // send confirmation to both parties
        const businessResponse = await mailServiceInstance.send({
          to: process.env.EMAIL_USER,
          subject: 'Freelunch Customer Order',
          html: finalBusinessEmail
        });

        const customerResponse = await mailServiceInstance.send({
          to: customer_email,
          subject: 'Freelunch Customer Order',
          html: finalCustomerEmail
        });

        return res.status(201).json("Successfully Sent");
    }
}

export default ApiMiddleware(handler);