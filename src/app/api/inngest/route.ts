import { serve } from "inngest/next";
import { inngest, SyncUserCreation, syncUserDeletion, SyncUserUpdation } from "@/config/inngest";
import type { NextRequest } from "next/server";

// Serve the functions via Inngest
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    SyncUserCreation,
    SyncUserUpdation,
    syncUserDeletion
  ],
});

// import { serve } from "inngest/next";
// import { inngest, SyncUserCreation, syncUserDeletion, SyncUserUpdation } from "@/config/inngest"

// // Create an API that serves zero functions
// export const { GET, POST, PUT } = serve({
//   client: inngest,
//   functions: [
//     /* your functions will be passed here later! */
//     SyncUserCreation,
//     SyncUserUpdation,
    
//     syncUserDeletion
//   ],
// });
