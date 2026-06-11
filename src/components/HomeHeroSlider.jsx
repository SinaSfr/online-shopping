import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function HomeHeroSlider({ slides }) {
    return (
        <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 10000 }}
            loop={true}
        >
            {slides.map(slide => (
                <SwiperSlide key={slide.id}>
                    <img
                        src={slide.img}
                        loading="lazy"
                        alt="slide image"
                        className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center p-4 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.9)]">
                        <h2 className="text-white text-2xl font-bold">{slide.title}</h2>
                        <h3 className="text-white text-xl font-bold">{slide.subtitle}</h3>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default HomeHeroSlider