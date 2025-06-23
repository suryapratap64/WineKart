import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // These lines don't do anything and should be removed unless you're checking schema length (e.g., Address.countDocuments())
    // Address.length
    // Product.length

    const orders = await Order.find({ userId }).populate([
      { path: "address" },
      { path: "items.product" },
    ]);

    return NextResponse.json({ success: true, orders });

  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}


// import connectDB from "@/config/db"
// import Address from "@/models/Address"
// import Order from "@/models/Order"
// import Product from "@/models/Product"
// import { NextResponse } from "next/server"


// export async function  GET(request){
//     try {
//        const {userId}=getAuth(request)
//        await connectDB()
       
//        Address.length
//        Product.length

//        const orders=await Order.find({userId}).populate('address items.product')

//        return NextResponse.json({success:true,orders})
//     } catch (error) {
//          return NextResponse.json({success:false,message:error.message})
        
//     }
// }