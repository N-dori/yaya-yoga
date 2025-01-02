'use client'
import React from 'react'
import { sendEmail } from '../utils/util'

type Props = {}

export default function SendTestEmail({}: Props) {
    const send = async () => {

            
        await sendEmail('dori.nadav@gmail.com', 'נדב הגבר', 'welcome', '6772a2f067a48ae8940d4c9c')
    
    }

  return (
<button onClick={send}>שלח מייל ניסיון</button>
  )
}