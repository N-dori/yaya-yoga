import React from 'react'
import LoginForm from '../cmps/auth/LoginForm'

type Props = {}

export default function Login({}: Props) {
  return (
<LoginForm redirectTo='/'/>
  )
}