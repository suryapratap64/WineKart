import connectDB from "@/config/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; // Make sure you're importing this if not already

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const { cartItems } = user;

    return NextResponse.json({ success: true, cartItems });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// import connectDB from "@/config/db"
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function GET(request){
//     try {
//         const {userId}=getAuth(request)
//         await connectDB()
//         const user=await User.findById(userId);
//         const {cartItems}=user

// return NextResponse.json({success:true,cartItems})
        
//     } catch (error) {
//         return NextResponse.json({success:false,message:error.message})
        
//     }
// }