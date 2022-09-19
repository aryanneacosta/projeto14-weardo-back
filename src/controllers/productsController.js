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
        return res.sendStatus(500);
    }
}

async function addToCart(req, res) {
    const { name, id } = req.body;

    try {
        const user = await db.collection('users').findOne({ name });
        if (!user) {
            res.sendStatus(404);
        }
        const product = await db.collection('products').findOne({ id });
        if (!product) {
            res.sendStatus(404);
        }

        await db.collection('cart').insertOne({
            user: user.name, 
            email: user.email, 
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price
        });

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { products, addToCart }