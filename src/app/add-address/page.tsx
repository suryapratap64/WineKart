'use client';

import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { headers } from "next/headers";
import { toast } from "react-toastify";
import axios from "axios";

// Type for the address state
interface Address {
  fullName: string;
  phoneNumber: string;
  pincode: number|string;
  area: string;
  city: string;
  state: string;
}

const AddAddress = () => {

    const {getToken,router}=useAppContext()
  const [address, setAddress] = useState<Address>({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    area: '',
    city: '',
    state: '',
  });

  // Event handler types
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here

    try {
        const token=await getToken();

        const {data}=await axios.post('/api/user/add-address',{address},{headers:{Authorization:`Bearer${token}`}})
        if(data.success){
            toast.success(data.message)
            router.push('/cart')
        }else{
            toast.error(data.message)

        }


    } catch (error) {
  toast.error((error as Error).message);
}
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping <span className="font-semibold text-orange-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <input
              name="fullName"
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Full name"
              onChange={handleChange}
              value={address.fullName}
            />
            <input
              name="phoneNumber"
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Phone number"
              onChange={handleChange}
              value={address.phoneNumber}
            />
            <input
              name="pincode"
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Pin code"
              onChange={handleChange}
              value={address.pincode}
            />
            <textarea
              name="area"
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
              rows={4}
              placeholder="Address (Area and Street)"
              onChange={handleChange}
              value={address.area}
            ></textarea>
            <div className="flex space-x-3">
              <input
                name="city"
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="City/District/Town"
                onChange={handleChange}
                value={address.city}
              />
              <input
                name="state"
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="State"
                onChange={handleChange}
                value={address.state}
              />
            </div>
          </div>
          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
          >
            Save address
          </button>
        </form>
        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="my_location_image"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
