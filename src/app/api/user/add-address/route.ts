import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the userId from Clerk auth
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Parse the incoming address data
    const { address } = await request.json();

    // Ensure DB connection
    await connectDB();

    // Create a new address entry with the associated userId
    const newAddress = await Address.create({
      ...address,
      userId,
    });

    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error:unknown) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to add address" },
      { status: 500 }
    );
  }
}

// import connectDB from "@/config/db";
// import Address from "@/models/Address";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(request){
//     try {
//         const {userId}=getAuth();
//         const {address}= await request.json()

//         await connectDB();
//         const newAddress=await Address.create(...address,userId)

//         return NextResponse.json({success:true,message:"Address added successfully"})

        
//     } catch (error) {
//         return NextResponse.json({success:false,message:error.message})
        
//     }
// }