import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const products = await Product.find({});
    
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message || "Failed to fetch products",
    }, { status: 500 });
  }
}

// import connectDB from "@/config/db";
// import authSeller from "@/lib/authSeller";
// import Product from "@/models/Product";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";


// export async function GET(request){
//     try {

//        await connectDB();

//         const products=await Product.find({})
//         return NextResponse.json({success:true,products})
        
//     } catch (error) {
//         return NextResponse.json({success:false,message:error.message})
//     }
// }