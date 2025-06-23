import mongoose, { Connection } from 'mongoose';

interface MongooseConnectionCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// 🌐 Extend global type for TypeScript (MUST be in same file or a `.d.ts` file)
declare global {
  // This is needed only in Node.js environments
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnectionCache | undefined;
}

// ✅ Ensure global cache is always initialized
const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseConnectionCache;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB(): Promise<Connection> {
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGODB_URI not defined');
    }

    const opts = {
      bufferCommands: false,
    };

    globalWithMongoose.mongoose.promise = mongoose
      .connect(`${process.env.MONGO_URI}/quickcart`, opts)
      .then((mongoose) => mongoose.connection);
  }

  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  return globalWithMongoose.mongoose.conn;
}

export default connectDB;

// import mongoose from 'mongoose';
// let catched=global.mongoose;

// if(!catched){
//     catched = global.mongoose = {conn:null,promise:null}

// }

// async function connectDB(){
//     if(catched.conn) {
//         return catched.conn;
//     }

//     if(!catched.promise) {
//         const opts = {
//             bufferCommands: false,
//         }
//         catched.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then((mongoose) => {
//             return mongoose;
//         });

//     }
//     catched.conn = await catched.promise;
//     return catched.conn;
// }
// export default connectDB;
