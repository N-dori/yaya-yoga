'use client'
import React, { useEffect,} from 'react'
import {  useAppSelector,  } from '../libs/hooks'

type Props = {

}

export function UserMsg2({ }: Props) {
  const bgColor = useAppSelector(state => state.userMsgSlice.bgColor)
  const userMsg = useAppSelector(state => state.userMsgSlice.userMsg)
  const isMsgShown = useAppSelector(state => state.userMsgSlice.isMsgShown)
  const sucsses = useAppSelector(state => state.userMsgSlice.sucsses)


  useEffect(() => {

    console.log('sucsses', sucsses);
  
  }, [isMsgShown, userMsg, bgColor, sucsses])
  const styles :any = {
    position: 'absolute',
    top: isMsgShown?`2em`:`-200px`,
    left: '50%',
    translate:' -50%',
    transition: 'top .4s ease-in-out',
    padding:' 1em',
    borderRadius: '20px',
    border: '2px solid #2b40ce',
    backgroundColor:bgColor
  } 

  return (
    <div className='user-msg2' style={ styles } >
      {userMsg ? userMsg : ''}</div>
  )
}