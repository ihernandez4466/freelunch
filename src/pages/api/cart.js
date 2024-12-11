import { ApiMiddleware } from '../../lib/middleware'
import pool from '../../../database/db'

const handler = {
    get: async (req, res) => {
        const params = req.query
        const { userId } = params
        if (userId == undefined || userId == null) {
            return res.status(400).json("Missing userid")
        }
        let query = `SELECT session_id, cart_items.id as cart_id, product_id, size, quantity, total, name, price, description, cart_items.category, img_path
            FROM cart_items
            JOIN shopping_session
            ON shopping_session.id = cart_items.session_id
            JOIN products
            ON cart_items.product_id = products.id
            WHERE user_id='${userId}'`
        const client = await pool.connect() // Get a client from the pool
        try {
            await client.query('BEGIN')
            let response = await client.query(query)
            const rows = response.rows
            await client.query('COMMIT')
            return res.status(200).json({ rows })
        } catch(error) {
            console.log(error)
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
                    LEFT JOIN cart_items
                    ON shopping_session.id = cart_items.session_id 
                    WHERE user_id='${userId}'`
                try {
                    await client.query('BEGIN')
                    let response = await client.query(firstQuery)
                    if(response.rows.length == 0){
                        throw new Error("Session does not exist")
                    }
                    const sessionId = response.rows[0].sessionid
                    const filteredItems = response.rows.filter((item) => {
                        return item.product_id == productId && item.size == size
                    })
                    if(filteredItems.length > 0){
                        // update existing row in cart_items
                        const rowToUpdate = filteredItems[0]
                        const newQuantity = rowToUpdate.quantity + parseInt(quantity)
                        const newTotal = newQuantity * parseFloat(price)
                        const rowId = rowToUpdate.itemid
                        let query = `UPDATE cart_items SET quantity=${newQuantity}, total=${newTotal} WHERE id=${rowId}`
                        await client.query(query)
                        console.log(`updating item quantity=${newQuantity}, total=${newTotal}, id=${rowId}`)
                        await client.query('COMMIT')
                        return res.status(201).json("Successfully updated item in cart")
                    } else {
                        // insert new row
                        let cartQuery = `INSERT INTO cart_items (session_id, product_id, size, quantity, total, category)
                        VALUES (${sessionId}, ${productId}, '${size}', ${quantity}, ${price*quantity}, '${category}')`
                        await client.query(cartQuery)
                        console.log(`new row add another column of session id: ${userId} productid: ${productId} size=${size} quantity=${quantity} price=${price * quantity}`)
                        await client.query('COMMIT')
                        return res.status(201).json("Successfully added item to cart")
                    }
                }
                catch(error) {
                    console.log(error)
                    await client.query('ROLLBACK');
                    throw error;
                }
                finally {
                    client.release()
                }
            }
    },
    put: async (req, res) => {
        const body = JSON.parse(req.body);
        const validColumns = ['quantity', 'size', 'total']
        if (!body || !body.id) {
            return res.status(400).json({ error: "Invalid request body" });
        }
        const columnsToUpdate = Object.keys(body).filter(column => validColumns.includes(column));

        if (columnsToUpdate.length === 0) {
            return res.status(400).json({ error: "No valid columns provided for update" });
        }
        
        const setClauses = columnsToUpdate.map((column, index) => `${column}=${body[column]}`).join(", ");
        let query = `UPDATE cart_items SET ${setClauses} WHERE id=${body.id}`
        const client = await pool.connect() // Get a client from the pool
        try {
            await client.query('BEGIN')
            await client.query(query)
            await client.query('COMMIT')
            return res.status(200).json("Successfully Updated")
        } catch (error){
            console.log(error)
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release()
        }
    },
    delete: async (req, res) => {
        const params = req.query
        const { id } = params
        if (id == undefined) {
            return res.status(400).json("Missing cart item param to delete")
        }
        let query = `DELETE FROM cart_items WHERE id=${id}` 
        const client = await pool.connect() // Get a client from the pool
        try {
            await client.query('BEGIN')
            let response = await client.query(query)
            await client.query('COMMIT')
            return res.status(200).json({ response })
        } catch (error){
            console.log(error)
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release()
        }
    }

}

export default ApiMiddleware(handler);