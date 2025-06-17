"use client";
import { useAppContext } from "@/context/AppContext";
import { ProductCard } from "./ProductCard";

 const HomeProducts=()=>{
    const { products, router } = useAppContext();
    return (
        <div className="flex flex-col items-center pt-14">
            <p className="text-2xl font-medium text-left w-full">Popular products</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">


                {/* Map through your product data and render product cards here */}
                {products.map((product,index)=>
                <ProductCard key={index} product={product} />)}
            </div>
            <div className="mt-6">
                <button className="px-4 py-2 bg-orange-600 text-white rounded">View All Products</button>
            </div>
            <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
        </div>
    )
 }
 export default HomeProducts