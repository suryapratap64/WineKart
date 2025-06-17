"use client"
import React from "react";
export const NewsLetter =() =>{
    return (
        <div className=" flex flex-col items-center justify-center text-center space-y-2 pt-7 pb-10">
            <h2 className="md:text-4xl text-2xl font-medium">Subscribe now & get free delivery </h2>
            <p className="md:text-base text-gray-500/80 pb-8">
            this product is best and less costly as compare to your local theka ssave your privecy and enjoy it in your life with privecy </p>
             <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
        />
        <button className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none">
          Subscribe
        </button>
      </div>

        </div>
    )
}