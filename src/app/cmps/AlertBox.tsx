'use client'
import React, { useEffect, useState, } from 'react'
import { useAppSelector, } from '../libs/hooks'
import { useDispatch } from 'react-redux'
import { clearTxts, hideAlertBox } from '@/app/store/features/alertBoxSlice';
import { Tuser } from '../types/types';

type AlertBoxProps = {
  isAlertBoxShown: boolean
  userMsg: string
  btnTxt: string
  setBtnTxt: (btnTxt: string) => void
  setUserMsg: (userMsg: string) => void
  setIsAlertBoxShown: (b: boolean) => void
  handelChargeUser?:()=>void
  navigatTo?:(route:string)=>void
  removePractitionerFromActivity?: (membershipId:string) => void
  currMembershipId:string|null
  userId:string

}

export function AlertBox({removePractitionerFromActivity,currMembershipId,userId,navigatTo,handelChargeUser,setBtnTxt, setUserMsg, setIsAlertBoxShown, isAlertBoxShown, userMsg, btnTxt }: AlertBoxProps) {


  const styles: any = {
    opacity: isAlertBoxShown ? 1 : 0,
    visibility: isAlertBoxShown ? 'visible' : 'hidden',
    transition: `opacity 0.5s ease, visibility 0.05s ease`,
    background: isAlertBoxShown ? `linear-gradient(
      rgba(0, 0, 0, 0.7), 
      rgba(0, 0, 0, 0.3))`: 'transparent'

  }

  useEffect(() => {



  }, [userMsg, btnTxt,isAlertBoxShown,currMembershipId])

  const hideBox = () => {
    setIsAlertBoxShown(false)
    clearTxts()

  }
  const clearTxts = () => {
    setTimeout(() => {
      setUserMsg('')
      setBtnTxt('')
      
    },50);
  }
 const handelMyFunction = () => {
  if(btnTxt=== 'לרכישת מנוי'){
   navigatTo('/pricing') 
  }
  if(btnTxt=== 'בטח רשום אותי!'){
    handelChargeUser()
  }
  if(btnTxt=== 'כן בטוח ברצוני לבטל'){
    removePractitionerFromActivity(currMembershipId)
  }
  if(btnTxt=== 'להצהרת בריאות'){
    navigatTo(`/healthDecleration/${userId}`) 
  }
  hideBox()
 }
  return (
    <section className='backdrop' style={styles} >

      <div className='alert-box-container grid'  >
        <span className='close-btn gr1 flex-jc-ac' onClick={hideBox} >X</span>
        <span className='txt gr2'>
          {userMsg}
        </span>
   <button type='button' className='alert-box-btn gr3 pointer' onClick={handelMyFunction}>{btnTxt}</button>

      </div>
    </section>
  )
}