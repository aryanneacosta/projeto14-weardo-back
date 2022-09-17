import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import singrouter from './src/routers/singinupRoute.js';
import productsrouter from './src/routers/productsRoute.js';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(singrouter);
server.use(productsrouter);

server.listen(process.env.PORT, () => {
    console.log(`Listening on the port ${process.env.PORT}`)
})