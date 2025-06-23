import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: "User Not Found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// import { getAuth } from "@clerk/nextjs/server";
// import connectDB from "@/config/db";
// import User from "@/models/User";
// import { NextResponse } from "next/server";
// export async function GET(request) {
//   try {
//     const { userId } = getAuth(request);
//     await connectDB();
//     const user = await User.findById(userId);

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User NOt Found" });
//     }
//     return NextResponse.json({ success: true, user });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }
