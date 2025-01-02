import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    isNew?: boolean; // Add the isNew property
  }

  interface Session {
    user: User; // Extend session.user to match the extended User type
  }
}