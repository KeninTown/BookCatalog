import Express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import bookRouter from "./routers/bookRouter.js";
import cors from 'cors'

const app = Express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', bookRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})