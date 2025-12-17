import express from "express"
import mongoose from "mongoose";
import {router} from './routes/userRoute'

const app = express();

app.use(express.json());

app.use("/users" , router);



const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/e_commerce')
.then(()=>{console.log(' CONNECTED ON DB')})
.catch(()=>{console.log("FAILED TO CONNECT ON DB ")})

app.listen(port , ()=>{
    console.log(`RUNNING ON http://localhost:${port}`);
})
