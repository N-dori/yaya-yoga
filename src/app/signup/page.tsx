import React from 'react'
import SignupForm from '../cmps/auth/SignupForm';
import LogInSignup from '../cmps/auth/LogInSignup';

type Props = {}

export default async function Signup({}: Props) {

      return (
            <>
            <LogInSignup redirectTo='/'/>
             {/* //    <SignupForm redirectTo='/'></SignupForm> */}
            </>
     
      )
}