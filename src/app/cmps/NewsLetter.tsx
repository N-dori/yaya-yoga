'use client'
import React, { useState } from 'react'
import { useAppDispatch } from '../libs/hooks'
import { callUserMsg, hideUserMsg } from '../store/features/msgSlice'
import { scrollUp } from '../utils/util'

type Props = {}
export default function NewsLetter({}: Props) {
    const [email, setEmail] = useState<string>('')
    const dispatch =useAppDispatch()
    const getUserMsg = (txt: string, isSuccess: boolean) => {

        dispatch(callUserMsg({ msg: txt, isSuccess}))

        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);

    }
    const handelNewsLetter = () => {
        scrollUp()
        getUserMsg('תודה על הרשמתך נשתמע בקרוב', true)
       setEmail('')
    }
  return (
       <div className="footer-section">
             <h4 className='tac news-letter-txt'>השארו בקשר לחדשות ועידכונים </h4>
   
             <section className='flex-warp flex-jc gap1'>
               <input type='email' placeholder='כתובת מייל' className='input-email-letter' 
               onChange={(e)=>setEmail(e.target.value)}/>
               <button type='button' className='news-letter-btn pointer' onClick={handelNewsLetter}>הרשם</button>
             </section>
   
           </div>
  )
}