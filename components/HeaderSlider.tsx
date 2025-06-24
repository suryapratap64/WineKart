"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const HeaderSlider = () => {
 const sliderData = [

  {
    id: 1,
    title: "Chill with Classic Brew Taste the Craft in Every Sip!",
    offer: "Limited Time: 25% Off on 6-Packs",
    buttonText1: "Order Beer",
    buttonText2: "See Varieties",
    imgSrc: assets.thumbnil_3,
  },
  {
    id: 2,
    title: "Golden Lager Refreshing Flavor, Timeless Taste!",
    offer: "Buy 2 Get 1 Free  Today Only!",
    buttonText1: "Buy Now",
    buttonText2: "View Deals",
    imgSrc: assets.thumbnil_4,
  },
  {
    id: 3,
    title: "Savor the Sophistication Premium Red Wine Awaits!",
    offer: "Flat 30% Off Limited Bottles Left!",
    buttonText1: "Shop Wine",
    buttonText2: "Explore Collection",
    imgSrc: assets.thumbnil_1, 
  },
  {
    id: 4,
    title: "Celebrate Moments Discover Elegant White Wines",
    offer: "Special Discount: 20% Off Today",
    buttonText1: "Buy White Wine",
    buttonText2: "Know More",
    imgSrc: assets.thumbnil_2, 
  },
];


  const [currentSlide,setCurrentSlide]=useState(0);
  useEffect(()=>{
    const interval=setInterval(()=>{
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
    }, 4000);
    return ()=>clearInterval(interval);

  },[ sliderData.length]);

  // const handleSliderChange=()=>{
  //   setCurrentSlide();
  // }
  return (
   <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-white py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1  transition" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 rounded-xl w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => (index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
