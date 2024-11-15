import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import React, { useState } from "react";
import Slider from "react-slick";

import { getMediaPath } from "../../services/utils";

const ImageSlider = ({ images, title }) => {
  const [showArrows, setShowArrows] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const NextArrow = ({ onClick }) =>
    showArrows && (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-all duration-200 hover:bg-white group-hover:opacity-100 md:p-3"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-gray-700 md:h-6 md:w-6" />
      </button>
    );

  const PrevArrow = ({ onClick }) =>
    showArrows && (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-all duration-200 hover:bg-white group-hover:opacity-100 md:p-3"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700 md:h-6 md:w-6" />
      </button>
    );

  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
    appendDots: (dots) => (
      <div className="absolute bottom-4 w-full">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className={`h-2 w-2 rounded-full transition-all duration-300 md:h-2.5 md:w-2.5 ${i === activeSlide ? "bg-white" : "bg-white/50"}`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div
      className="group relative w-full rounded-lg"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {images && images.length > 0 ? (
        <div className="relative">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full">
                <div className="relative aspect-[16/10]">
                  <img
                    src={getMediaPath(image)}
                    alt={`${title}-${index + 1}`}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center">
          <Home className="h-12 w-12 text-gray-400 md:h-16 md:w-16" />
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
