"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Tuser } from '../types/types'
import { sendEmail } from '../utils/util'

type Props = {
    user:Tuser
}

export default function SendEmailOnlyOnce({user}: Props) {
    // const [wasEmailSent, setWasEmailSent] = useState<boolean>(false)
    const wasEmailSent =useRef(false)
    useEffect(() => {
            if(!wasEmailSent.current){
                sendWelcomeEmail()
                wasEmailSent.current =true
            }
        }, [wasEmailSent])
        
        const sendWelcomeEmail = async () => {
            
            await sendEmail(user.email, user.name, 'welcome', user._id)
    }
    
  return (
    <></>
  )
}