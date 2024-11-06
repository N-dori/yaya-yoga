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


  const styles :any = {
    position: 'absolute',
    top: isMsgShown?`2em`:`-200px`,
    left: '50%',
    translate:' -50%',
    transition: 'top .4s ease-in-out',
    padding:' 1em',
    borderRadius: '20px',
    border:sucsses? `2px solid rgb(0, 242, 61)`:`2px solid rgb(199, 165, 165)`,
    textAlign: `center`,
    background:bgColor
  }

  useEffect(() => {

    console.log('sucsses', sucsses);
  
  }, [isMsgShown, userMsg, bgColor, sucsses,styles])


  return (
    <div className='user-msg2' style={ styles } >
      {userMsg ? userMsg : ''}</div>
  )
}