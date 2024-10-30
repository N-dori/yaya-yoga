'use client'
import React, { useEffect, useState,} from 'react'
import {  useAppSelector,  } from '../libs/hooks'

type Props = {

}

export function UserMsg2({ }: Props) {
  const [deg, setDeg] = useState(0)
  const userMsg = useAppSelector(state => state.alertBoxSlice.userMsg)
  const isAlertBoxShown = useAppSelector(state => state.alertBoxSlice.isAlertBoxShown)
  const sucsses = useAppSelector(state => state.userMsgSlice.sucsses)
  const countOneToNine= () =>  {
    let count= 1
    
    while(1<=9){
      setDeg(count)
      count++
    }
  }
  countOneToNine()

  const styles :any = {
    position: 'absolute',
    opcity: `${deg}`,
    left: '50%',
    width:'250px',
    
    translate:' -50%',
    transition: 'top .4s ease-in-out',
    padding:' 1em',
    borderRadius: '20px',
    border:sucsses? `2px solid rgb(0, 242, 61)`:`2px solid rgb(199, 165, 165);`,
    textAlign: `center`,
    backgroundColor:''
  }

  useEffect(() => {

  
  }, [isAlertBoxShown, userMsg,styles])


  return (
    <div className='alert-box' style={ styles } >
      {userMsg ? userMsg : ''}</div>
  )
}