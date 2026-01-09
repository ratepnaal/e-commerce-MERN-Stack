import {productModel} from '../models/productModel';


export const getAllProduct = async ()=>{
    return await productModel.find();
}

export const seedInitialProducts = async ()=>{
try{
    const products = [
        {name:"Product 1 " , image:"image 1 " , price: 15 , stock:100},
        {name:"Product 2 " , image:"image 2 " , price: 200 , stock:1550}
    ];

    const exictingProducts = await getAllProduct();

    if(exictingProducts.length === 0){
        await productModel.insertMany(products);
    }
}

catch(err){
console.log("cannot seed for database" , err)
}
}