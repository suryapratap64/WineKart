import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextResponse as NextResponseType } from 'next/server';

// Return type can be: `boolean` if successful, or a `NextResponse` if error.
type AuthSellerReturn = Promise<boolean | ReturnType<typeof NextResponse.json>>;

const authSeller = async (userId: string): AuthSellerReturn => {
  try {
    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata.role === 'seller') {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};

export default authSeller;

// import { clerkClient } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const authSeller = async (userId) => {
//     try {

//         const client = await clerkClient()
//         const user = await client.users.getUser(userId)

//         if (user.publicMetadata.role === 'seller') {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         return NextResponse.json({ success: false, message: error.message });
//     }
// }

// export default authSeller;