import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import singrouter from './src/routers/singinupRoute.js';
import buyRouter from "./src/routers/buyRoute.js"
import productsrouter from './src/routers/productsRoute.js';
import cartRouter from './src/routers/cartRoute.js'

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(singrouter);
server.use(buyRouter);
server.use(productsrouter);
server.use(cartRouter);

server.listen(process.env.PORT, () => {
    console.log(`Listening on the port ${process.env.PORT}`)
})