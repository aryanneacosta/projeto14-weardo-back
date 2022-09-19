import db from "../databases/db.js";
import dayjs from "dayjs"

async function buy(req, res){
    const { products, total, buyWay, name, address,email } = req.body
    
    if(!products|| !total|| !buyWay || !name|| !address|| !email){
        return res.sendStatus(400)
    }; 

    try{
        await db.collection("sold").insertOne({
            name: name,
            address: address,
            products,
            total,
            buyWay,
            email: email,
            day: dayjs().format("DD/MM")
        });
        return res.sendStatus(201);
    }catch(error){
        return res.status(500).send(error.message);
    }
}

async function getBuys(req, res) {
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
        const productsList = await db.collection('sold').find({email: email}).toArray();
        return res.send(productsList.map(value => ({
            ...value
        })));

    } catch (error) {
        return res.sendStatus(500);
    }
}

async function removeCart(req, res) {
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
        const productsList = await db.collection('cart').deleteMany({email: email});
        return res.sendStatus(200);

    } catch (error) {
        return res.sendStatus(500);
    }
}

export {buy, getBuys, removeCart};