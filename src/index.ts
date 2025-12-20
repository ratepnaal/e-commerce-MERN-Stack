import express from "express"
import mongoose from "mongoose";
import {router} from './routes/userRoute'
import { seedInitialProducts } from "./services/productServices";
import { productRouter } from "./routes/productRoute";

const app = express();

app.use(express.json());

app.use("/users" , router);
app.use("/products" , productRouter );


const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/e_commerce')
.then(()=>{console.log(' CONNECTED ON DB')})
.catch(()=>{console.log("FAILED TO CONNECT ON DB ")})

// دالة لاضافة منتجات وهمية عند عدم توفر منتجات 

seedInitialProducts();

app.listen(port , ()=>{
    console.log(`RUNNING ON http://localhost:${port}`);
})
