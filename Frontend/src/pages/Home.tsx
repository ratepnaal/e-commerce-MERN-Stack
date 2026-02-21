import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper , SwiperSlide } from 'swiper/react';
import { BASE_URL } from '../constant/baseurl';


import 'swiper/css';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import type { Products } from '../tyoes/product';
import ServerError from '../components/ServerError';


const Home = () => {
const [products , setProduct] = useState<Products[]>([]);
const [error , setError] = useState(false);
useEffect(()=>{
const fetchData = async ()=>{
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProduct(data);
    }
    catch{
setError(true)
    }
}
fetchData();

} , [])

if(error){
return (<ServerError/>)
}


    return (
        <div className='max-w-6xl  px-5 mx-auto py-10'>
            <Swiper 
                slidesPerView={1} 
                spaceBetween={20} 
                breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 } 
                }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="pb-12"
            >
                {products.map((p) => (
                    <SwiperSlide id={p._id}>
                   <ProductCard {...p}/>
                   </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Home;