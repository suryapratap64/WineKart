import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import type { NextRequest as AppNextRequest } from "next/server";

// Fix the type for context by explicitly declaring params
interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(request: AppNextRequest, context: Context) {
  try {
    const { id } = context.params;

    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 });
    }

    await connectDB();

    const product = await Product.findOne({ _id: id, userId });
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found or not owned" }, { status: 404 });
    }

    await Product.deleteOne({ _id: id });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Server error" },
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
