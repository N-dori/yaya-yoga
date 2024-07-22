
import React, { useEffect, useState } from 'react'

type Props = {
    userMsg:string
    isMsgShown:boolean
    setIsMsgShown:(isMsgShown:boolean) => void
}

export default function UserMsg({userMsg,isMsgShown,setIsMsgShown}: Props) {
  const [bgColor, setBgColor] = useState('')
    useEffect(() => {
      setColor()
  setTimeout(() => {
    setIsMsgShown(false)
  }, 2500);
    }, [isMsgShown,userMsg,bgColor])
    
    const setColor = () => {
      const color = (userMsg==='פעילות נוספה בהצלחה')?"rgb(18, 199, 57)":'red'
      setBgColor(color)
    }
  return (
    <div className='user-msg' style={isMsgShown?{top:'2em',backgroundColor:bgColor}:{}} >{userMsg}</div>
  )
}