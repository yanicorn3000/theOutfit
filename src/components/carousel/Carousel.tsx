import { useState, useEffect } from "react";
import { picturePath } from "../../utils";
import clsx from "clsx";

type Banner = {
  id: string;
  image: string;
  text: string;
  color: string;
};

const banners: Banner[] = [
  {
    id: "banner-1",
    image: "1.png",
    text: "Women's New Arrivals",
    color: "text-white",
  },
  {
    id: "banner-2",
    image: "2.png",
    text: "Outlet up to 70%",
    color: "text-gray-600",
  },
  {
    id: "banner-3",
    image: "3.png",
    text: "Men's New Arrivals",
    color: "text-white",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full mx-auto relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => {
          return (
            <div
              key={banner.id}
              className="min-w-full flex justify-center items-center relative"
            >
              <img
                src={picturePath(banner.image)}
                alt={banner.text}
                className="w-full max-h-96 object-cover object-[20%_20%] flex justify-center  items-center"
              />
              <div
                className={clsx(
                  "absolute text-4xl font-bold p-3 bg-gradient-to-r from-transparent via-white/20 to-transparent backdrop-blur-sm",
                  banner.color
                )}
              >
                {banner.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={clsx(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-white scale-125 opacity-80"
                : "bg-gray-400 opacity-50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
