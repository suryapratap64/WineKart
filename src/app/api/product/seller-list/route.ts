import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 });
    }

    await connectDB();

    const products = await Product.find({ userId }); // Fetch only seller's products
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// import connectDB from "@/config/db";
// import authSeller from "@/lib/authSeller";
// import Product from "@/models/Product";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";


// export async function GET(request){
//     try {

//         const {userId}=getAuth(request);
//         const isSeller=authSeller(userId)
//         if(!isSeller){
//             return NextResponse.json({success:false,message:'not authorized'})


//         }
//         await connectDB();

//         const products=await Product.find({})
//         return NextResponse.json({success:true,products})
        
//     } catch (error) {
//         return NextResponse.json({success:false,message:error.message})
//     }
// }