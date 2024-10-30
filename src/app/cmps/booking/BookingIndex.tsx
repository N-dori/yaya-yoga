import LoginSvg from '@/app/assets/svgs/LoginSvg'
import React from 'react'
import PlansList from './PlansList'

type Props = {}

export default function BookingIndex({}: Props) {
  return (
    <main className='bookin-index-conatiner'>
        <section className='existing-users-login-msg grid'>
          <p className='gc1'>
              למתרגלים רשומים, בבקשה התחברו לאתר להשלמת התהליך 
          </p>
          <button className='existing-users-login-btn grid gc2'>
            <div >
            <LoginSvg/>
            </div>
            <p>
            התחברות
            </p>
          </button>

             </section>
             <h2 className='new-to-studio tac'>חדש בסטודיו קדם?</h2>
             <h3 className='new-to-studio-sub-txt tac'>ברוכים הבאים! התוכניות הבאות זמינות לרכישה באתר</h3>
            <PlansList/>
        </main>
  )
}