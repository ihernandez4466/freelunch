import { ApiMiddleware } from '../../../lib/middleware'
import { validateParams } from '../lib/validateParams'
//import mailServiceInstance from '../lib/mailService';
require('dotenv').config();

const handler = {
    post: async (req, res) => {
        const body = JSON.parse(req.body);
        const validRequest = validateParams(['customer_first', 'customer_email', 'customer_last', 'customer_order'], body)
        if(!validRequest) return res.status(400).json("Missing fields");
        const { customer_first, customer_last, customer_email, customer_comments, customer_order } = body
        const customer_phone = body.customer_phone ? body.customer_phone : "N/A"
        const html = `
        <html>
          <body>
            <p>${customer_first} ${customer_last} completed an order.</p>
            <p>Their email address to contact them at: ${customer_email}</p>
            <p>Their phone number to contact them at: ${customer_phone}</p>
            <p>Their comments: ${customer_comments}</p>
            ${customer_order.map((product) => `
              <div style="padding: 10px;">
                <p>Product Id: ${product.product_id}</p>
                <p>Name: ${product.name}</p>
                <p>Price: $${product.price}</p>
                <p>Size: ${product.size}</p>
                <p>QTY: ${product.quantity}</p>
              </div>
            `).join('')}
          </body>
        </html>
      `;
        console.log(html);
        // const response = await mailServiceInstance.send({
        //   to: process.env.EMAIL_USER,
        //   subject: 'Freelunch Customer Order',
        //   html: html
        // })
        return res.status(201).json(html);
    }
}

export default ApiMiddleware(handler);