import Header from '../components/Header'
import HomeHeroSlider from '../components/HomeHeroSlider'
import HomeSlogan from '../components/HomeSlogan'
import { Plane, MapPin, ShieldCheck, Headphones } from "lucide-react";
import { useEffect, useState } from 'react';
import ProductsSwiper from '../components/ProductsSwiper';
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function Home() {
    
    const products = useContext(ProductContext);
    
    const heroSlides = [
        {
            id: 1,
            img: "https://swiperjs.com/demos/images/abstract-1.jpg",
            title: "تورهای ویژه اروپا",
            subtitle: "بهترین پکیج‌های سفر با قیمت مناسب",
        },
        {
            id: 2,
            img: "https://swiperjs.com/demos/images/abstract-2.jpg",
            title: "سفر به دبی",
            subtitle: "تجربه‌ای لوکس در قلب خاورمیانه",
        },
        {
            id: 3,
            img: "https://swiperjs.com/demos/images/abstract-3.jpg",
            title: "تورهای آسیایی",
            subtitle: "کشف مقصدهای جدید و جذاب",
        },
    ];

    const slogans = [
        {
            id: 1,
            title: "تورهای ویژه اروپا",
            subtitle: "بهترین پکیج‌های سفر با قیمت مناسب",
            icon: Plane,
        },
        {
            id: 2,
            title: "مقاصد متنوع جهانی",
            subtitle: "سفر به محبوب‌ترین شهرهای دنیا",
            icon: MapPin,
        },
        {
            id: 3,
            title: "رزرو امن و مطمئن",
            subtitle: "پرداخت و خرید با خیال راحت",
            icon: ShieldCheck,
        },
        {
            id: 4,
            title: "پشتیبانی ۲۴ ساعته",
            subtitle: "همراه شما در تمام مراحل سفر",
            icon: Headphones,
        },
    ];

    return (
        <>
            <Header />
            <HomeHeroSlider slides={heroSlides} />
            <main className='mx-auto max-lg:w-[90%] max-xl:w-[97%] xl:max-w-7xl'>
                <HomeSlogan slogans={slogans} />
                <ProductsSwiper products={products} />
            </main>
        </>
    )
}

export default Home;