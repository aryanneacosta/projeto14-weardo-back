import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import joi from 'joi';
import { ServerStyleSheet } from 'styled-components';
import { MongoClient } from 'mongodb';
import {v4 as uuidv4} from 'uuid';


dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(`weardo`)
})

const singUpSchema = joi.object({
    name: joi.string().empty(" ").min(3).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).empty(" ").min(6).max(40).required(),
    password: joi.string().empty(" ").min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    address: joi.string().empty(" ").min(3).max(50).required(),
});

server.post(`/singup`, async (req,res) => {
    const {name, email, password, address} = req.body;
    const validation = singUpSchema.validate(req.body, {abortEarly:false});
    if (validation.error) {
        const erroMessage = validation.error.details.map(value => value.message);
        return res.status(422).send(console.log(erroMessage))
    }
    try {
        const hashingPassword = bcrypt.hashSync(password,12);
        await db.collection(`users`).insertOne({...req.body,password:hashingPassword});
        return res.send(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
})

server.post(`/singin`, async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await db.collection(`users`).findOne({email:email});
        if (user && bcrypt.compareSync(password,user.password)) {
            const token = uuidv4();
            await db.collection(`sessions`).insertOne({userId: user._id, token, address: user.address});
            return res.send({token: token, name: user.name});
        }
        else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }

})



server.listen(process.env.PORT, () => {
    console.log(`Listening on the port ${process.env.PORT}`)
})