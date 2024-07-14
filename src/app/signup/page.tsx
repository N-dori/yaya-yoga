import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import SignInForm from '../cmps/auth/SignInForm';

type Props = {}

export default async function Signup({}: Props) {
    // const session = await  getServerSession(authOptions as any )
    // console.log('session session',session);
    
    //   if(session){
    //     redirect('/')
    //   }
      return (
         <SignInForm></SignInForm>
      )
}