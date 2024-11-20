import React from 'react'
import SignupForm from '../cmps/auth/SignupForm';

type Props = {}

export default async function Signup({}: Props) {

      return (
         <SignupForm redirectTo='/'></SignupForm>
      )
}