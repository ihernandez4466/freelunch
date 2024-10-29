import { ApiMiddleware } from '../../lib/middleware'
import pool from '../../../database/db'

const handler = {
    get: async (req, res) => {
        const params = req.query
        const { userId } = params
        if (userId == undefined || userId == null) {
            return res.status(400).json("Missing userid")
        }
        const query = `
            SELECT session_id, product_id, size, quantity, total, name, price, description, cart_items.category, img_path
            FROM cart_items
            JOIN shopping_session
            ON shopping_session.id = cart_items.session_id
            JOIN products
            ON cart_items.product_id = products.id
            WHERE user_id=${userId}
        `
        const client = await pool.connect() // Get a client from the pool
        try {
            await client.query('BEGIN')
            const response = await client.query(query)
            const rows = response.rows
            await client.query('COMMIT')
            return res.status(200).json({ rows })
        } catch(error) {
            await client.query('ROLLBACK')
            throw error;
        } 
        finally {
            client.release()
        }

    },
    post: async (req, res) => {
        const body = JSON.parse(req.body);
        if (!body) {
            return res.status(400).json({ error: "Invalid request body" });
        }
        const { userId, productId, category, price, size, quantity } = body

        if (!userId || !productId || !price || !size || !quantity) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        switch (category) {
            case 'sweaters':
                const client = await pool.connect() // Get a client from the pool
                const firstQuery = `SELECT cart_items.id AS itemid, shopping_session.id AS sessionid, user_id, product_id, size, quantity, total, category FROM shopping_session 
                    JOIN cart_items
                    ON shopping_session.id = cart_items.session_id 
                    WHERE user_id=${userId}`

                try {
                    await client.query('BEGIN')
                    const response = await client.query(firstQuery)
                    if (response.rows.length > 0) {
                        // find item already added to session
                        const filteredItems = response.rows.filter((item) => {
                            return item.product_id == productId && item.size == size
                        })
                        console.log(`filteredRows: ${filteredItems}`);
                        if (filteredItems.length == 0) { // item is new insert new row
                            const rowOne = response.rows[0]
                            let sessionid = rowOne.sessionid
                            let cartQuery = `INSERT INTO cart_items (session_id, product_id, size, quantity, total, category)
                            VALUES (${sessionid}, ${productId}, '${size}', ${quantity}, ${price*quantity}, '${category}')`
                            await client.query(cartQuery)
                            console.log(`new row add another column of session id: ${sessionid} productid: ${productId} size=${size} quantity=${quantity} price=${price * quantity}`)
                            await client.query('COMMIT')
                            return res.status(201).json("Successfully added cart item and session")
                        } else {
                            // update existing row in cart_items
                            const rowToUpdate = filteredItems[0]
                            const newQuantity = rowToUpdate.quantity + quantity
                            const newTotal = newQuantity * price
                            const rowId = rowToUpdate.itemid
                            let query = `UPDATE cart_items SET quantity=${newQuantity}, total=${newTotal} WHERE id=${rowId}`
                            await client.query(query)
                            console.log(`updating item quantity=${newQuantity}, total=${newTotal}, id=${rowId}`)
                            await client.query('COMMIT')
                            return res.status(201).json("Successfully Updated Cart Item")
                        }
                    } else {
                        // no session has been created insert into session and into cart items
                        let sessionQuery = `INSERT INTO shopping_session (user_id, session_expiration) VALUES (${userId}, to_timestamp(${Date.now()})) RETURNING id`
                        let response = await client.query(sessionQuery)
                        let sessionid = response.rows[0].id
                        let cartQuery = `INSERT INTO cart_items (session_id, product_id, size, quantity, total, category)
                        VALUES (${sessionid}, ${productId}, '${size}', ${quantity}, ${price*quantity}, '${category}')`
                        await client.query(cartQuery)
                        await client.query('COMMIT')
                        return res.status(201).json("Successfully added cart item and session")
                    }
                }
                catch(error) {
                    await client.query('ROLLBACK');
                    return res.status(500).json({ error: 'Internal server error' });
                }
                finally {
                    client.release()
                }
            }
    }
}

export default ApiMiddleware(handler);