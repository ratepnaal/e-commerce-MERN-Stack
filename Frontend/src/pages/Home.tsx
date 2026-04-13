import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper , SwiperSlide } from 'swiper/react';
import { BASE_URL } from '../constant/baseurl';


import 'swiper/css';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import type { Products } from '../tyoes/product';
import ServerError from '../components/ServerError';

const normalizeCategory = (product: Products): string => {
    if (product.category) {
        return product.category.toLowerCase();
    }

    const name = product.name.toLowerCase();
    if (name.includes("iphone") || name.includes("galaxy") || name.includes("mobile") || name.includes("phone")) {
        return "mobile";
    }

    return "laptop";
}

const ProductSection = ({ title, products }: { title: string; products: Products[] }) => {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className='section-shell rounded-3xl p-4 md:p-6'>
            <div className='mb-5 flex items-center justify-between'>
                <h2 className='text-xl font-bold text-slate-900 md:text-2xl'>{title}</h2>
                <span className='rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700'>
                    {products.length} items
                </span>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={18}
                breakpoints={{
                    640: { slidesPerView: 1.4 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                loop={products.length > 3}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="pb-12"
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductCard {...product}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

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

const mobileProducts = products.filter((product) => normalizeCategory(product) === "mobile");
const laptopProducts = products.filter((product) => normalizeCategory(product) === "laptop");


    return (
        <div className='mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 md:py-10'>
            <section className='section-shell relative overflow-hidden rounded-3xl p-6 md:p-9'>
                <div className='absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl' />
                <div className='absolute -left-24 bottom-0 h-40 w-40 rounded-full bg-slate-300/25 blur-3xl' />
                <div className='relative'>
                    <p className='text-xs font-semibold uppercase tracking-[0.25em] text-teal-700'>Modern devices</p>
                    <h1 className='mt-2 max-w-2xl text-3xl font-bold text-slate-900 md:text-5xl'>
                        Build your setup with premium tech products.
                    </h1>
                    <p className='mt-3 max-w-xl text-sm text-slate-600 md:text-base'>
                        Discover curated mobiles and laptops with clean pricing, smooth checkout, and a better shopping experience.
                    </p>
                </div>
            </section>

            <ProductSection title="Mobile Collection" products={mobileProducts}/>
            <ProductSection title="Laptop Collection" products={laptopProducts}/>
        </div>
    );
};

export default Home;