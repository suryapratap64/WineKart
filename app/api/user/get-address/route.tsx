import connectDB from "../../../../config/db";
import Address from "../../../../models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const addresses = await Address.find({ userId });

    return NextResponse.json({ success: true, addresses });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

// import connectDB from "@/config/db";
// import Address from "@/models/Address";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function GET(request){
//     try {
//         const {userId}=getAuth()
//         await connectDB()
//         const addresses=await Address.find({userId})

//         return NextResponse.json({success:true,addresses})
//     } catch (error) {
//         return NextResponse.json({success:false,message:error.message})

//     }
// }
