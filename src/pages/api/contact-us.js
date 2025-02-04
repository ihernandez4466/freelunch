import { ApiMiddleware} from '../../lib/middleware'
import { validateParams } from './lib/validateParams';
import mailServiceInstance from './lib/mailService';

const handler = {
    post: async (req, res) => {
        const body = JSON.parse(req.body);
        const validRequest = validateParams(['customer_first', 'customer_email', 'customer_last', 'customer_comments'], body)
        if(!validRequest) return res.status(400).json("Missing fields");
        const { customer_first, customer_last, customer_email, customer_comments } = body
        const customer_phone = body.customer_phone ? body.customer_phone : "N/A"
        const html = `
        <html>
            <p>${customer_first} ${customer_last} contacted you.</p>
            <p>Their email address to contact them at: ${customer_email}</p>
            <p>Their phone number to contact them at: ${customer_phone}</p>
            <p>Their comments: ${customer_comments}</p>
        </html>
        `
        const response = await mailServiceInstance.send({
          to: 'isabelhernandez123@gmail.com',
          subject: 'freelunch test contact us',
          html: html
        })

        return res.status(201).json(response);
    }
}

export default ApiMiddleware(handler); 