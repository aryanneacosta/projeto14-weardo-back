import db from "../databases/db.js";

async function cart(req, res) {
    const { authorization, email} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.sendStatus(401);
    }
    try {
        const session =  await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        const productsList = await db.collection('cart').find({email: email}).toArray();
        return res.send(productsList.map(value => ({
            ...value
        })));

    } catch (error) {
        return res.sendStatus(500);
    }
}

async function removeProducts(req, res) {
    const { authorization, id } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.sendStatus(401);
    }
    try {
        const session =  await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        const productsList = await db.collection('cart').deleteOne({id: id});
        return res.sendStatus(200);

    } catch (error) {
        return res.sendStatus(500);
    }
}

export {cart, removeProducts};