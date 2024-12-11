
import { ApiMiddleware} from '../../lib/middleware'
import { validateParams } from './lib/validateParams';
import pool from '../../../database/db'

const handler = {
    get: async (req, res) => {
        const params = req.query
        const validRequest = validateParams(['id', 'email', 'first_name', 'last_name'], params)
        if(!validRequest) return res.status(400).json("Missing fields")
        const { id, email, first_name, last_name } = params
        let where = ""
        where += id ? `id='${id}' `: ""
        where += email ? `${where ? 'AND ' : ""}email='${email}' `: ""
        where += first_name ? `${where ? 'AND ' : ""}first_name='${first_name}'`: ""
        where += last_name ? `${where ? 'AND ' : ""}last_name='${last_name}'`: ""
        const query = `SELECT * FROM users ${where ? `WHERE ${where}`: ""}`
        const client = await pool.connect() // Get a client from the pool
        try {
            await client.query('BEGIN')
            const response = await client.query(query)
            const rows = response.rows
            await client.query('COMMIT')
            res.status(200).json({ rows })
        } catch (error) {
            await client.query('ROLLBACK')
            throw error;
        } finally {
            client.release();
        }
    },
    post: async(req, res) => {
        const body = JSON.parse(req.body);
        const validRequest = validateParams(['id', 'email', 'first_name', 'last_name'], body)
        if(!validRequest) return res.status(400).json("Missing fields")
        const fields = Object.keys(body).join(", ")
        const values = Object.values(body).join(", ")
        const client = await pool.connect() // Get a client from the pool
        try {
            const userQuery = `insert into users(${fields}) values (${values})`
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