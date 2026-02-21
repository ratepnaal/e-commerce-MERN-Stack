import {productModel} from '../models/productModel';

const imagedellUrl = "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRDMTMWOaPJNkI2NOG4VKVqfv7L1SUwlOf5c6Ft3tXh8Qoz9t922lEK1laS07VedSqKW0xNJzBXWJdfd2P2CVfrGD_WxadjlkYx1Rf_JOjxxVHW7dhNzJJxyzU ";
const imageHpUrl = "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRFj_X6XLibCtCuIeYgbplKHdIQUSemLslpoqi60i4clTP93D5fqK7fM3OnHkj0vLHPmohGAqPStFekOJdPR-GY_196myiKH8Yr5StOLRvSn2vy2CqSQGsgeA";
const imageMacUrl = "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT93GJU9BjJxtrTGTGfPtGeIb2n0D5qGzwnt4JJ46gRxU8iKXS2BtA_rQyPpofOHGpp5JD1lKHth2xo2LBJYtShVc8haezDBpkTWBn9z6djWxqXTVSbtDdYwxaaS10r46WmJQ&usqp=CAc";
const imagerefurbishedurl = "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRfjuPXC7Fw4WAzMPqZoo0Rux05KkT_V7ba7jwuPQDZjl_dlP1Zs_X8XYCzFagcOXHyrapYQOqkavVI_MjWTYkyBQjDqJ4MFnKQV5YWP-nsUORz9fLqmbwspeSjC4PUTIp-tA&usqp=CAc";
const imageAsusuel = "data:image/avif;base64,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";

export const getAllProduct = async ()=>{
    return await productModel.find();
}

export const seedInitialProducts = async ()=>{
try{
    const products = [
        {name:"Dell Precision 3550" , image:imagedellUrl , price: 400 , stock:100},
        {name:"HP Victus" , image:imageHpUrl , price: 1399 , stock:158},
        {name:"MacBook Pro " , image:imageMacUrl , price: 349 , stock:152},
        {name:"Refurbished MacBook Pro " , image:imagerefurbishedurl , price: 2699 , stock:182},
        {name:"Asus ROG Strix" , image:imageAsusuel , price: 3998 , stock:112},

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