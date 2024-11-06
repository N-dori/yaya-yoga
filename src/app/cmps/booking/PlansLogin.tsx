import LoginSvg from '@/app/assets/svgs/LoginSvg'
import React, { useState } from 'react'
import PlansList from './PlansList'
import Link from 'next/link'


type Props = {}

export default function PlansLogin({ }: Props) {

  return (
    <main className='bookin-index-conatiner'>
      <Link href={'/login'} className='existing-users-login-msg clean grid'>
        <p className='gc1'>
          למתרגלים רשומים, בבקשה התחברו לאתר להשלמת התהליך
        </p>
        <button className='existing-users-login-btn grid gc2'>
          <div >
            <LoginSvg />
          </div>
          <p>
            התחברות
          </p>
        </button>
      </Link>

      <h2 className='new-to-studio tac'>חדש בסטודיו קדם?</h2>
      <h3 className='new-to-studio-sub-txt tac'>ברוכים הבאים! התוכניות הבאות זמינות לרכישה באתר</h3>
      <PlansList />
    </main>
  )
}