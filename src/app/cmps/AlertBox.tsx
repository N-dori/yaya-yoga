'use client'
import React, { useEffect, useState, } from 'react'
import { useAppSelector, } from '../libs/hooks'
import { useDispatch } from 'react-redux'
import { clearTxts, hideAlertBox } from '@/app/store/features/alertBoxSlice';

type Props = {

}

export function AlertBox({ }: Props) {
  const isAlertBoxShown = useAppSelector(state => state.alertBoxSlice.isAlertBoxShown)
  const userMsg = useAppSelector(state => state.alertBoxSlice.userMsg)
  const btnTxt = useAppSelector(state => state.alertBoxSlice.btnTxt)
  const func = useAppSelector(state => state.alertBoxSlice.func)

  const dispatch = useDispatch()


  const styles: any = {
    opacity: isAlertBoxShown ? 1 : 0,
    visibility: isAlertBoxShown ? 'visible' : 'hidden',
    transition: `opacity 0.5s ease, visibility 0.5s ease`,
    background: isAlertBoxShown ? `linear-gradient(
      rgba(0, 0, 0, 0.7), 
      rgba(0, 0, 0, 0.3))`: 'transparent'

  }

  useEffect(() => {


  }, [userMsg, btnTxt])

  const hideBox = () => {
    dispatch(hideAlertBox())
    setTimeout(() => {
      dispatch(clearTxts())
      
    }, 500);
  }
  const handelMyFunc = () => {
    func()
    dispatch(hideAlertBox())
  }

  return (
    <section className='backdrop' style={styles} >

      <div className='alert-box-container grid'  >
        <span className='close-btn gr1 flex-jc-ac' onClick={hideBox} >X</span>
        <span className='txt gr2'>
          {userMsg}
        </span>
       <button type='button' className='alert-box-btn gr3 pointer'onClick={handelMyFunc}>{btnTxt}</button>
      </div>
    </section>
  )
}