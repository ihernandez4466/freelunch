import { ApiMiddleware } from '../lib/middleware';
import { validateParams } from '../lib/validateParams';
import pool from '../../../../database/db'
import mailServiceInstance from '../lib/mailService';
import Handlebars from 'handlebars';
const fs = require('fs');
const path = require('path');

require('dotenv').config();

function getLocalTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const handler = {
    post: async (req, res) => {
        const body = JSON.parse(req.body);
        const validRequest = validateParams(['order_total', 'user_id', 'session_id', 'customer_first', 'customer_email', 'customer_last', 'customer_order'], body)
        if(!validRequest) return res.status(400).json("Missing fields");
        const { customer_first, customer_last, customer_email, customer_comments, customer_order, order_total, user_id, session_id} = body
        const customer_phone = body.customer_phone ? body.customer_phone : "N/A"
        const client = await pool.connect() // Get a client from the pool
        try {
          let cartItemsQuery = `DELETE FROM cart_items WHERE session_id=${session_id}`
          //let shoppingSessionQuery = `DELETE FROM shopping_session WHERE id=${session_id}` // fk forces delete from cart item first
          await client.query('BEGIN')
          await client.query(cartItemsQuery)
          //await client.query(shoppingSessionQuery)
          
          let orderDetailsQuery = `INSERT INTO order_details(user_id, payment_used, created_at, amount, contact_phone, contact_first, contact_last, contact_email) VALUES('${user_id}', 'N/A', '${getLocalTimestamp()}', ${order_total}, '${customer_phone}', '${customer_first}', '${customer_last}', '${customer_email}') RETURNING id;`
          let orderDetailsResponse = await client.query(orderDetailsQuery);
          let orderDetailsId = orderDetailsResponse.rows[0].id
          
          let values = customer_order.map(item => 
            `(${orderDetailsId}, ${item.product_id}, ${item.quantity}, '${item.size}')`
          ).join(',');
          let orderItemsQuery = `INSERT INTO order_items(order_details_id, product_id, product_quantity, product_size) VALUES ${values}`
          await client.query(orderItemsQuery);

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
            order_details_id: orderDetailsId,
            order_total: order_total
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
      } catch (error) {
        await client.query('ROLLBACK')
        throw error;
      } finally {
        client.release();
      }
    }
}

export default ApiMiddleware(handler);