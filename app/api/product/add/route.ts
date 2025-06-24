import connectDB from "../../../../config/db";
import authSeller from "../../../../lib/authSeller";
import Product from "../../../../models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const offerPrice = formData.get("offerPrice") as string;
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    // Upload all images to Cloudinary
    const uploadResults = await Promise.all(
      files.map((file) => {
        return new Promise<any>((resolve, reject) => {
          const bufferPromise = file.arrayBuffer().then((arrayBuffer) => {
            const buffer = Buffer.from(arrayBuffer);

            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );

            uploadStream.end(buffer);
          });

          bufferPromise.catch(reject);
        });
      })
    );

    const image = uploadResults.map((result) => result.secure_url);

    await connectDB();

    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      newProduct,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Server error" },
      { status: 500 }
    );
  }
}

// import connectDB from "@/config/db"
// import authSeller from "@/lib/authSeller"
// import Product from "@/models/Product"
// import { getAuth } from "@clerk/nextjs/server"
// import {v2 as cloudinary} from "cloudinary"
// import { NextResponse } from "next/server"

// //configure cloudinary
// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET,

// })

// export async function POST(request){
//     try {

//         const {userId}=getAuth(request)

//         const isSeller=await authSeller(userId)

//         if(!isSeller){
//             return NextResponse.json({success:false,message:'not authorised'})

//         }

//         const fromData=await request.fromData()

//         const name =fromData.get('name')
//         const description=fromData.get('description');
//         const category =fromData.get('category');
//         const price=fromData.get('price');
//         const offerPrice=fromData.get('offerPrice');
//         const files=fromData.getAll('images');

//         if(!files ||files.length==0){
//             return NextResponse.json({success:false,message:'no file uploaded'})
//         }

//         const result =await Promise.all(
//             files.map(async(file)=>{
//                 const arrayBuffer=await file.arrayBuffer()
//                 const buffer=Buffer.from(arrayBuffer)

//                 return new Promise((resolve,reject)=>{
//                     const stream=cloudinary.uploader.upload_stream({
//                         resource_type:'auto'
//                     },
//                 (error,result)=>{
//                     if(error){
//                         reject(error)
//                     }else{
//                         resolve(result)
//                     }

//                    stream.end(buffer)
//                 })
//                 })

//             }
//         )

//     )

//     const image=result.map(result=>result.secure_url)

//     await connectDB()
//     const newProduct=await Product.create({
//         userId,
//         name,
//         description,
//         category,
//         price:Number(price),
//         offerPrice:Number(offerPrice),
//         image,
//         date:Date.now()
//     })
//     return NextResponse.json({success:true,message:'upload successful',newProduct})

//     } catch (error) {
//          return NextResponse.json({success:false,message:error.message})

//     }
// }
