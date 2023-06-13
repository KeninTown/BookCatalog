import Express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import router from './routers/index.js';
import cors from 'cors'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";

import BookModel from "./models/BookModel.js";

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

app.get('/api', async (req, res) =>{
    try {
        const publisher = await BookModel.find().select('publisher').sort({publisher: 1});
        let clearPublisher = []
        publisher.forEach(element => {
            if(clearPublisher.indexOf(element.publisher) === -1)
                clearPublisher.push(element.publisher)
        })
        res.send(clearPublisher);
    } catch (error) {
     console.log(error);   
    }
}
);


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

