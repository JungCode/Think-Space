import { createClerkClient } from "@clerk/backend";

// Khởi tạo Clerk với secret key
export const clerkConnection = ()=> {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
  return clerk;
};