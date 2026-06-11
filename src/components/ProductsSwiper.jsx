import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ShopProductCard from "./ShopProductCard";


function ProductsSwiper({ products }) {
  return (
    <Swiper className="mt-6 !pb-12"
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={20}
      autoplay={{ delay: 6000 }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },

        640: {
          slidesPerView: 2,
        },

        768: {
          slidesPerView: 3,
        },

        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {products?.map((product) => (
        <SwiperSlide key={product.id}>
          <ShopProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductsSwiper;