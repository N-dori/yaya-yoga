
import React, { useEffect, useState } from 'react'
import { TuserMsgProps } from '../types/types'

type Props = {
    userMsg:TuserMsgProps|undefined
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
      if(userMsg){
        if(userMsg.msg){
                const color = (userMsg.sucsses)?"rgb(18, 199, 57)":'red'
      setBgColor(color)

        }
      }
    }
  return (
    <div className='user-msg' style={isMsgShown?{top:'2em',backgroundColor:bgColor}:{}} >
      {userMsg?userMsg.msg:''}</div>
  )
}