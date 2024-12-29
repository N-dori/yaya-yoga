import connectMongoDB from "../../../libs/mongoDB";
import User from "../../../models/user";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GooglePovider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { getLastUserId, getUrl } from "@/app/utils/util";
import { createUser } from "@/app/actions/userActions";

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
               
                        const url = getUrl('auth/registration/')

                        const newUser = await createUser({name, email, isAdmin:false})
                        if (newUser) {
                          
                            return true
                        } else {
                            return false
                        }
               

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
                token.id = user.id
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
            // console.log('url in redirect is: ', url);
        
            // Allows relative callback URLs
            if (url.startsWith("/")) {
                console.log('baseUrl in redirect is: ', `${baseUrl}${url}`);
                
                return `${baseUrl}${url}`}
                // Allows callback URLs on the same origin
                else if (new URL(url).origin === baseUrl){
                console.log('new URL(url).origin is: ', `${new URL(url).origin}`);
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