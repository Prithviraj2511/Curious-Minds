import express from 'express';
import { createConnection, Connection } from "typeorm";
// entities
import { Article } from './entities/Article';
import {User} from "./entities/User";
// routes
import {articlesRoute} from "./routes/articles"
import {usersRoute} from "./routes/users"
import {userRoute} from "./routes/user"

const app = express()

app.use(express.json());

// setting up routes
app.use('/api/users',usersRoute)
app.use('/api/user',userRoute)
app.use('/api/articles',articlesRoute)

 

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