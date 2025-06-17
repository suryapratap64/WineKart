import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        
    },
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    imageUrl:{type:String, required:true},
    cartItems:{type:Object, default:{}},

},{minimize: false, timestamps:true});
const User=mongoose.models.user|| mongoose.model('User', userSchema);
export default User;

// //typescript 
// import mongoose, { Schema, Document, Model } from "mongoose";

// // Define an interface for the user document
// export interface IUser extends Document {
//   _id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   cartItems: Record<string, any>; // or you can define a more specific type here
// }

// // Create the schema using the interface
// const userSchema: Schema<IUser> = new Schema(
//   {
//     _id: {
//       type: String,
//       required: true,
//     },
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     imageUrl: { type: String, required: true },
//     cartItems: { type: Object, default: {} },
//   },
//   { minimize: false, timestamps: true }
// );

// // Use existing model if it exists (for Next.js hot-reloading)
// const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

// export default User;
