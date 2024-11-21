'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Tmembership } from '@/app/types/types';
import { getUrl, getUserByEmail } from '@/app/utils/util';
import { useDispatch } from 'react-redux';
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice';
import LoginForm from '../auth/LoginForm';
import { setUser } from '@/app/store/features/userSlice';
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

  const getUserMsg = (txt: string, isSucsses: boolean) => {
    dispatch(callUserMsg({ msg: txt, isSucsses }))
    setTimeout(() => {
      dispatch(hideUserMsg())
    }, 3500);
  }
  const updateUserMembership = async (membership: Tmembership, userId: string) => {
    try {
      const url = getUrl('user/updateUserMembership')

      const res = await fetch(url, {
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ _id: userId, membershipId: membership._id })
      })
      if (res.ok) {
        const updatedUser = await res.json()
        dispatch(setUser(updatedUser))
        // console.log('User was updated with new membership');
        return true

      } else {
        return false
      }
    } catch (error) {
      console.log('had a problem updating user with new membership', error)
    }

  }
  const getMembership = async (membershipType: string) => {
    if (!session?.user?.email) {
      setNotLogin(true)
      return [null, null]

    }
    const user = await getUserByEmail(session.user.email)

    let membership: Tmembership
    const dropInMembership: Tmembership =
    {
      userId: user._id,
      isExpired: false,
      subscription: { type: 'drop-in', entries: 1 },
      paid: 50,
      dateOfPurchase: new Date(),
    }

    const fivePassMembership: Tmembership =
    {
      userId: user._id,
      subscription: { type: 'כרטיסייה 5 כניסות', entries: 5 },
      isExpired: false,
      paid: 250,
      dateOfPurchase: new Date(),

    }
    const tenPassMembership: Tmembership =
    {
      userId: user._id,
      subscription: { type: 'כרטיסייה 10 כניסות', entries: 10 },
      isExpired: false,
      paid: 450,
      dateOfPurchase: new Date(),
    }
    const monthlyPassMembership: Tmembership =
    {
      userId: user._id,
      subscription: { type: 'חופשי חודשי', entries: 100 },
      isExpired: false,
      paid: 350,
      dateOfPurchase: new Date(),
    }
    switch (membershipType) {
      case 'כניסה חד-פעמית':
        membership = dropInMembership
        let end = new Date(dropInMembership.dateOfPurchase);
        end.setMonth(end.getMonth() + 6); // Move 6 months ahead
        dropInMembership.end = end
        break;
      case 'כרטיסייה 5 כניסות':
        membership = fivePassMembership
        break;
      case 'כרטיסייה 10 כניסות':
        membership = tenPassMembership
        break;
      case 'חופשי חודשי':
        membership = monthlyPassMembership
        break;

      default:
        break;
    }
    return [membership, user._id]
  }

  const onPurchase = async () => {
    //get the wanted membership object- with user's _id under userId
    const [membership, userId] = await getMembership(props.planType)
    if (!membership || !userId) {
      return
    }
    //creating new memebership  
    const url = getUrl('membership/createNewMembership')
    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ membership })
    })
    if (res.ok) {
      //updating the user memberships array - pushing membership _id 
      const isSucsses = await updateUserMembership(await res.json(), userId)
      if (isSucsses) {
        let txt = '🙏 תודה על רכישתך'
        getUserMsg(txt, true)
        router.replace('/weekly_schedule')
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