import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 });
    }

    const productId = request.nextUrl.searchParams.get("id");
    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is missing" }, { status: 400 });
    }

    await connectDB();

    const product = await Product.findOne({ _id: productId, userId });
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found or not owned" }, { status: 404 });
    }

    await Product.deleteOne({ _id: productId });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
