import connectMongoDB from "../../../libs/mongoDB";
import User from "../../../models/user";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GooglePovider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { getUrl } from "@/app/util";

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
                console.log('credentials******',credentials);
                const { email, password } = credentials as Tcredentials


                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })
                    if (!user) {
                        return null
                    }
                    //    console.log('user in authOptions :', user);
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if (!passwordMatch) {
                        return null
                    }
                    return user
                } catch (err) {
                    console.log(err);
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
                console.log('account.provider is : ', account.provider);

                try {
                    const { name, email } = user
                    await connectMongoDB()
                    const userExist = await User.findOne({ email })
                    // console.log('userExist : ',userExist);
                    if (!userExist) {
                        const url = getUrl('auth/registration/')

                        const res = await fetch(url, {

                            method: 'POST',
                            headers: { "Content-type": "appliction/json" },
                            body: JSON.stringify({ name, email, isNewUser:true, isAdmin: false })

                        })
                        if (res.status === 200 || res.status === 201) {
                            
                            return true
                        } else {
                            return false
                        }
                    }
                    // update isNewUser to false
                     
                    return true;
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
                // token.isNewUser = user.isNewUser
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email
                session.user.name = token.name
            }
            return session
        },
         async redirect({ url, baseUrl }) {
        
        
            return baseUrl // Default to the base URL if the URL is external
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