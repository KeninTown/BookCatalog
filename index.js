import Express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import bookRouter from "./routers/bookRouter.js";
import cors from 'cors'
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import cookieParser from "cookie-parser";

const app = Express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser());
app.use('/api', bookRouter);
app.use('/auth', authRouter);

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

