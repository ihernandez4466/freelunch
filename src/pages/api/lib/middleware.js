export const ApiMiddleware = (handler) => async (req, res) => {
    try {
      switch (req.method) {
        case 'GET':
          return await handler.get(req, res)
        case 'POST':
          return await handler.post(req, res) ;
        case 'PUT':
          return await handler.put(req, res);
        case 'DELETE':
          return await handler.delete(req, res);
        default:
          res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
          return res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } catch (error) {
      console.error(error);  // Log the error
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};
