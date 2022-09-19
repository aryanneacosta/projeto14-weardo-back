import db from "../databases/db.js";

async function buy(req, res){
    const { produtos, total, formaPagamento } = req.body
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!authorization){
        return res.sendStatus(401)
    }

    try{
        
        const users = db.collection("sessions").findOne({token})
        if(token !== users.token){
            return res.sendStatus(401);
        }
        await db.collection("sold").insertOne({
            name: users.name,
            address: users.address,
            produtos,
            total,
            formaPagamento
        });
        return res.sendStatus(201);
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export {buy};