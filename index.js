import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import joi from 'joi';
import { ServerStyleSheet } from 'styled-components';
import { MongoClient } from 'mongodb';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(`weardo`)
})

server.post(`/singup`, async (req,res) => {
    const {name, age} = req.body;
    try {
        await db.collection(`users`).insertOne({name: name});
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
})

server.post(`/singin`, async (req,res) => {
    res.sendStatus(201);
})



server.listen(process.env.PORT, () => {
    console.log(`Listening on the port ${process.env.PORT}`)
})