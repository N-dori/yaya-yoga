'use client'
import React, { useEffect, useRef, useState } from 'react'
import { TuserMsgProps } from '../types/types'
import { useAppDispatch, useAppSelector, useAppStore } from '../libs/hooks'

type Props = {

}

export function UserMsg2({ }: Props) {
  const bgColor = useAppSelector(state => state.userMsgSlice.bgColor)
  const userMsg = useAppSelector(state => state.userMsgSlice.userMsg)
  const isMsgShown = useAppSelector(state => state.userMsgSlice.isMsgShown)
  const sucsses = useAppSelector(state => state.userMsgSlice.sucsses)

  const dispatch = useAppDispatch()

  useEffect(() => {

    console.log('UserMsg2 isMsgShown', isMsgShown);
  
  }, [isMsgShown, userMsg, bgColor, sucsses])


  return (
    <div className='user-msg2' style={isMsgShown ? { top: '2em', backgroundColor: 'green' } : {}} >
      {userMsg ? userMsg : ''}</div>
  )
}