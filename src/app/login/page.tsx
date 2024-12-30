import React from 'react'
import LoginForm from '../cmps/auth/LoginForm'
import LogInSignup from '../cmps/auth/LogInSignup'

type Props = {}

export default function Login({}: Props) {
  return (
    <>
    <LogInSignup />
    {/* <LoginForm redirectTo='/'/> */}
    
    </>
  )
}