import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User"; // should be default export
import { NextRequest, NextResponse } from "next/server";

interface CartItem {
  productId: string;
  quantity: number;
  // add more fields if needed
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { cartData }: { cartData: CartItem[] } = await request.json();

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    user.cartItems = cartData;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


// import connectDB from "@/config/db";
// import { getAuth} from "@clerk/nextjs/server";
// import {User} from '@/models/User'
// import { NextResponse } from "next/server";

// export async function POST(request){
//     try {
//         const {userId}=getAuth(request);
//         const {cartData}=await request.json()

//         await connectDB()
//         const user=await User.findById(userId);

//         user.cartItems=cartData;
//         await user.save();
//         return  NextResponse.json({success:true})


        
//     } catch (error) {
//        return  NextResponse.json({success:false,message:error.message})
        
//     }
// }