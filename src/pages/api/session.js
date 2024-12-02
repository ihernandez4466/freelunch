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
        const { sessionToken, sessionExpiration } = body
        if(!sessionToken || !sessionExpiration){
            return res.status(400).json("Missing fields")
        }
        //  insert into user and session for now until users are authenticated
        try {
             // insert into users (id) values (sessionToken)
            const userQuery = `insert into users (id) values (${sessionToken})`
            const sessionQuery = ```insert into shopping_session(user_id, session_token, session_expiration)
            values (${sessionToken}, ${sessionToken}, ${sessionExpiration})```
            await client.query('BEGIN')
            await client.query(userQuery)
            await client.query(sessionQuery)
            await client.query('COMMIT')
            res.status(201).json(requestMethod)
        } catch (error) {
            await client.query('ROLLBACK')
            throw error;
        } finally {
            client.release();
        }
    }
}
export default ApiMiddleware(handler);