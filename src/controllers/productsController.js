import db from "../databases/db.js";

async function products(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.sendStatus(401);
    }
    try {
        const session =  await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        const productsList = await db.collection('products').find().toArray();
        return res.send(productsList.map(value => ({
            ...value,
            _id: undefined
        })));

    } catch (error) {
        return res.sendStatus(500)
    }
}

export { products }