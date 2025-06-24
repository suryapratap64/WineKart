import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

type AuthSellerReturn = Promise<boolean | ReturnType<typeof NextResponse.json>>;

const authSeller = async (userId: string): AuthSellerReturn => {
  try {
    // ✅ Correct usage — no `()`
       const client = await clerkClient()
       const user = await client.users.getUser(userId)

    if (user.publicMetadata.role === 'seller') {
      return true;
    }

    return false;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ success: false, message });
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