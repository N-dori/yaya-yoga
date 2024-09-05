
import nextAuth from "next-auth";
import {authOptions} from './AuthOptions'



const handler = nextAuth(authOptions)

export {handler as GET , handler as POST }