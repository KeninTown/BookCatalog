import Express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import bookRouter from "./routers/bookRouter.js";

const app = Express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})