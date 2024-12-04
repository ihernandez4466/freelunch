import { ApiMiddleware } from '../../lib/middleware'
import pool from '../../../database/db'

const handler = {
    get: async (req, res) => {
        const params = req.query
        const { id, userId, sessionToken } = params
        let where = ""
        where += id ? `id=${id} `: ""
        where += userId ? `${where ? 'AND ' : ""}user_id=${userId} `: ""
        where += sessionToken ? `${where ? 'AND ' : ""}session_token=${sessionToken}`: ""
        const query = `SELECT * FROM shopping_session ${where ? `WHERE ${where}`: ""}`
        const client = await pool.connect() // Get a client from the pool
        try {
            await client.query('BEGIN')
            const response = await client.query(query)
            const rows = response.rows
            res.status(200).json({ rows })
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error;
        } finally {
            client.release();
        }
    },
    post: async(req, res) => {
        const body = JSON.parse(req.body);
        // handle POST
        res.status(201).json({body})
    }
}
export default ApiMiddleware(handler);