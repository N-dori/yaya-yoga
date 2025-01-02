import connectMongoDB from "../../../libs/mongoDB";
import User from "../../../models/user";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GooglePovider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { getFullUserByEmail } from "@/app/utils/util";
import { Tuser } from "@/app/types/types";

type Tcredentials = {
    email: string
    password: string
}

export const authOptions: NextAuthOptions = {
    providers: [CredentialsProvider(
        {
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                console.log('Received credentials:', credentials); // Debug input credentials
                try {
                    const { email, password } = credentials as Tcredentials;
                    await connectMongoDB();

                    const user = await User.findOne({ email });
                    if (!user) {
                        console.log('User not found');
                        return null

                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        console.log('Invalid password');
                        return null; // Password mismatch
                    }

                    console.log('Authentication successful, returning user:', user);
                    return user; // Authentication successful
                } catch (err) {
                    console.error('Error in authorize function:', err); // Catch any errors
                    throw new Error('Authentication failed'); // Ensure meaningful error messages
                }
            }
        }
    ),
    GooglePovider(
        {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }
    )
    ],
    callbacks: {
        async signIn({ user, account }) {

            if (account.provider === 'google') {


                try {
                    const { email ,name } = user 
                    const userFound: Tuser = await getFullUserByEmail(email)
                    if (userFound) {
                        user.id =userFound._id
                        if (userFound.password) {
                            return false
                        }
                    }

                    return true




                } catch (err) {
                    console.log('had aproblem saving google user to data base', err);
                    return false; // Sign-in failure
                }
            }
            //if user signed up not via google but localy
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email
                token.name = user.name
                token.id = user.id
            }
            return token
        },
        async session({ session , token }) {
         
            if (session.user ) {
                session.user.email = token.email
                session.user.name = token.name

            }
            return session
        },
        async redirect({ url, baseUrl }) {

            // Allows relative callback URLs
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) {
                return url
            }
            return baseUrl
        }

    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30 * 3 // 60 seconds * 60 minutes * 24 hours * 30 days * 3 month

    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signup'
    }
}

const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }