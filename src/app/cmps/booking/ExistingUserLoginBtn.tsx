'use client'
import LoginSvg from '@/app/assets/svgs/LoginSvg'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function ExistingUserLoginBtn({}: Props) {
const router = useRouter()
  return (
    <button className='existing-users-login-btn grid gc2'
    onClick={()=> router.push('/login')}>
    <div >
      <LoginSvg />
    </div>
    <p>
      התחברות
    </p>
  </button>
  )
}