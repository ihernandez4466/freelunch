import { ApiMiddleware } from '../api/lib/middleware'
import pool from '../../../database/db'

const handler = {
    get: async (req, res) => {
        const params = req.query
        const { id, name, category, adult } = params
        let where = ""
        where += id ? `id=${id} `: ""
        where += name ? `${where ? 'AND ' : ""}name='${name}' `: ""
        where += category ? `${where ? 'AND ' : ""}category='${category}'`: ""
        where += adult ? `${where ? 'AND ' : ""}adult='${adult}'`: ""
        const query = `SELECT * FROM products ${where ? `WHERE ${where}`: ""}`
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
    post: async (req, res) => {
        // Your POST logic here
        res.status(201).json({ message: 'POST request successful' });
      },
    put: async (req, res) => {
        // Your PUT logic here
        res.status(200).json({ message: 'PUT request successful' });
    }
}

export default ApiMiddleware(handler); 