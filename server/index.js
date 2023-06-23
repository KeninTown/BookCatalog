import Express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import router from './routers/index.js';
import cors from 'cors'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = Express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser());
app.use('/api', router);

app.use(errorMiddleware);

app.use((req, res) => {
    res.sendStatus(404);
})

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();


