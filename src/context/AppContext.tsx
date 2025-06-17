'use client';


import React from "react";
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import type { UserResource } from "@clerk/types";
import {

  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";

// Types
interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  category: string;
  image: string[];
}

interface UserType {
  name: string;
  email: string;
  [key: string]: any; // Extend as needed
}

interface CartItemsType {
  [key: string]: number;
}

interface AppContextType {
  
  currency: string | undefined;
  router: ReturnType<typeof useRouter>;
  isSeller: boolean;
  setIsSeller: (val: boolean) => void;
  userData: UserType | false;
  fetchUserData: () => Promise<void>;
  products: ProductType[];
  fetchProductData: () => Promise<void>;
  cartItems: CartItemsType;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemsType>>;
  addToCart: (itemId: string | number) => Promise<void>;
  updateCartQuantity: (itemId: string | number, quantity: number) => Promise<void>;
  getCartCount: () => number;
  getCartAmount: () => number;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppContextProvider");
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();
  const {user}= useUser();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [userData, setUserData] = useState<UserType | false>(false);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemsType>({});

  const fetchProductData = async () => {
    setProducts(productsDummyData);
  };

  const fetchUserData = async () => {
    setUserData(userDummyData);
  };

  const addToCart = async (itemId: string | number) => {
    const cartData = structuredClone(cartItems);
    const key = String(itemId);
    cartData[key] = cartData[key] ? cartData[key] + 1 : 1;
    setCartItems(cartData);
  };

  const updateCartQuantity = async (itemId: string | number, quantity: number) => {
    const cartData = structuredClone(cartItems);
    const key = String(itemId);
    if (quantity === 0) delete cartData[key];
    else cartData[key] = quantity;
    setCartItems(cartData);
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (product) totalAmount += product.offerPrice * cartItems[itemId];
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
    fetchUserData();
  }, []);

  const value: AppContextType = {
    user,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
