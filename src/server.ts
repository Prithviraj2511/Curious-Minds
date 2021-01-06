import express from 'express';
import { createConnection, Connection } from "typeorm";
import { Article } from './entity/Article';
import {User} from "./entity/User";

const app = express()

app.get('/', (req, res) => {
    res.send("Hello world!")
})

async function start() {

    const connection = await createConnection({
        type: 'postgres',
        url: 'postgres://curious_minds:curious_minds@localhost/curious_minds',
        host: "localhost",
        port: 3306,
        username: "curious_minds",
        password: "curious_minds",
        database: "curious_minds",
        entities:[User,Article],
        logging:true,
        logger:'advanced-console',

        // not for production
        dropSchema:true,
        synchronize:true,

    });
    app.listen(3232, () => {
        console.log("server is running on port http://localhost:3232/")
    })
}

start()