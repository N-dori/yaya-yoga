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

2. Use a Type Assertion

In the callback, explicitly tell TypeScript that the user object you're working with includes the isNew property. You can do this with a type assertion.
Example:

import NextAuth, { DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

// Extend the DefaultUser type locally for clarity
type ExtendedUser = DefaultUser & { id: string; isNew?: boolean };

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      // Cast to ExtendedUser to ensure TypeScript knows about isNew
      const extendedUser = user as ExtendedUser;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        extendedUser.isNew = true;
      } else {
        extendedUser.isNew = false;
      }

      return true;
    },
    async session({ session, user }) {
      // Ensure session.user includes id and isNew
      session.user = {
        ...session.user,
        id: user.id,
        isNew: (user as ExtendedUser).isNew, // Safely access the property
      };

      return session;
    },
  },
});

3. Explanation of the Fix

    ExtendedUser Type:
        A local type that combines the base DefaultUser type with your additional properties (id and isNew).

    Type Assertion:
        user as ExtendedUser tells TypeScript to treat user as having the properties defined in ExtendedUser.

    Accessing isNew in session:
        (user as ExtendedUser).isNew ensures that TypeScript knows the property exists when assigning it to session.user.

4. Alternative Approach: Direct Database Query

If you'd rather avoid casting, you can fetch isNew directly from the database in the session callback to ensure type safety.
Example:

async session({ session, user }) {
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  session.user = {
    ...session.user,
    id: dbUser?.id || user.id,
    isNew: dbUser?.isNew || false,
  };

  return session;
}

This approach avoids needing to store isNew in the user object during the signIn callback and instead retrieves it dynamically.
Final Workflow:

    Ensure next-auth.d.ts defines your extended types.
    Use type assertions or fetch directly from the database.
    Access the isNew property in components safely with session?.user?.isNew.

This guarantees full TypeScript type safety while adhering to the NextAuth callback structure.
