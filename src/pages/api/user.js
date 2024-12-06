
import { ApiMiddleware} from '../../lib/middleware'
import { validateParams } from './lib/validateParams';
import pool from '../../../database/db'

const handler = {
    get: async (req, res) => {
        // const params = req.query
    },
    post: async(req, res) => {
        const body = JSON.parse(req.body);
        const validRequest = validateParams(['id', 'email', 'first_name', 'last_name'], body)
        if(!validRequest) return res.status(400).json("Missing fields")
        const fields = Object.keys(body).join(", ")
        const values = Object.values(body).join(", ")
        const client = await pool.connect() // Get a client from the pool
        try {
            const userQuery = `insert into users(${fields}) values (${values});`
            await client.query('BEGIN')
            await client.query(userQuery)
            await client.query('COMMIT')
            res.status(201).json("Successful insert into users")
        } catch (error) {
            await client.query('ROLLBACK')
            throw error;
        } finally {
            client.release();
        }
    }
}
export default ApiMiddleware(handler);