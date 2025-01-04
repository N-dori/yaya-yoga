import LoginSvg from '@/app/assets/svgs/LoginSvg'
import React from 'react'

type Props = {}

export default function ExistingUserLoginBtn({}: Props) {
  return (
    <button className='existing-users-login-btn grid gc2'>
    <div >
      <LoginSvg />
    </div>
    <p>
      התחברות
    </p>
  </button>
  )
}