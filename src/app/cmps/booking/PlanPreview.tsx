'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Tmembership } from '@/app/types/types';
import { useDispatch } from 'react-redux';
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice';
import LoginForm from '../auth/LoginForm';
import { setUser } from '@/app/store/features/userSlice';
import { updateUserWithNewMembershipAtDatabase } from '@/app/actions/userActions';
import { createNewMembership, getPlan } from '@/app/actions/membershipActions';
type PlanPreviewProps = {
  planId: string,
  planType: string,
  planDesc: string,
  planPrice: number,
  planConstraints: string[],
  mode: "booking" | "details"

}

export default function PlanPreview(props: PlanPreviewProps) {

  const router = useRouter()
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const [notLogin, setNotLogin] = useState(false)

  const handelClick = () => {

    router.replace(`/pricing/${props.planId}`)

  }

  const getUserMsg = (txt: string, isSuccess: boolean) => {
    dispatch(callUserMsg({ msg: txt, isSuccess }))
    setTimeout(() => {
      dispatch(hideUserMsg())
    }, 3500);
  }

  const updateUserMembership = async (membership: Tmembership, userId: string) => {
    try {
      const wasMembershipJustPurchesed = true
    const [isSuccess,updatedUser]= await updateUserWithNewMembershipAtDatabase( membership._id, userId, wasMembershipJustPurchesed)
     if(isSuccess){
       dispatch(setUser(updatedUser))
      return isSuccess
    }
    return isSuccess
    } catch (error) {
      console.log('had a problem updating user with new membership', error)
    }

  }
  const onGetMembership = async (membershipType: string) => {
    if (!session?.user?.email) {
      setNotLogin(true)
      return [null, null]

    }
    const email=session.user.email
   return await getPlan(membershipType,email)
  }

  const onPurchase = async () => {
    //get the wanted membership object- with user's _id under userId
    const [membership, userId] = await onGetMembership(props.planType)
    if (!membership || !userId) {
      return
    }
    //creating new memebership  
 const newMembership =    await createNewMembership(membership)
   
    if (newMembership) {
      //updating the user memberships array - pushing membership _id 
      const isSuccess = await updateUserMembership(newMembership, userId)
      if (isSuccess) {
        let txt = '🙏 תודה על רכישתך'
        getUserMsg(txt, true)
        router.replace('/')
        router.push('/weekly_schedule')
      } else {
        let txt = 'הייתה בעיה נסו שוב מאוחר יותר'
        getUserMsg(txt, false)
      }
    }
  }
  return (
    <>

      <article className='plan-card-container flex-col gap1' onClick={props.mode === "details" ? handelClick : () => { }}>
        <h2 className='plan-type'>{props.planType}</h2>
        <h2 className='plan-price'>{props.planPrice} ש"ח</h2>
        {props.mode === "booking" && <p className='book-plan-btn' onClick={onPurchase} >לרכישה</p>}
        <p className='plan-desc'>{props.planDesc}</p>
        <ul className='plan-constriants flex-col' >
          {props.planConstraints.map((constraint, i) =>
            <li key={i} className='plan-constriant'>{constraint}</li>
          )}
        </ul>
        {props.mode === "booking" &&
          <Link className='regulations-link' href={'/regulations'}>לתקנון סטודיו קדם</Link>}
        {notLogin && <LoginForm redirectTo={`/pricing/${props.planId}`} />}
      </article >
    </>
  )
}