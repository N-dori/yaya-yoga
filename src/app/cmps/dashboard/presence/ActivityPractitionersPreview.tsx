'use client'
import { refundPractitionerMembershipAtDatabase } from '@/app/actions/membershipActions'
import { removePractitionerFromActivityFromDatabase } from '@/app/actions/periodicAgendaActions'
import { getFullUserByEmail, updateUserWithNewMembershipAtDatabase } from '@/app/actions/userActions'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { Tactivity, Tpractitioner, Tuser } from '@/app/types/types'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

type ActivityPractitionersPreviewProps = {
    practitioner: Tpractitioner
    periodicAgendaId:string
    activity:Tactivity
    removePractitionerFromClientSideActivities : (email:string,activityId:string) => void


}

export default function ActivityPractitionersPreview({  practitioner,periodicAgendaId,activity ,removePractitionerFromClientSideActivities}: ActivityPractitionersPreviewProps) {

    const dispatch = useDispatch()
const {data:session} = useSession()
useEffect(() => {
    console.log('practitioner   : ',practitioner);
  
}, [])

    const getUserMsg = (txt: string, isSuccess: boolean) => {
        window.scrollTo(0, 0)
        dispatch(callUserMsg({ msg: txt, isSuccess }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }
    const removePractitionerFromActivity = async (membershipId:string) => {
        const isAgree = confirm(`האם לבטל ולזכות את ${practitioner.name}?`)
        if(isAgree){

      const wasRemoved = await removePractitionerFromActivityFromDatabase(periodicAgendaId,activity.id,session.user.email)  
        if (wasRemoved) {
            removePractitionerFromClientSideActivities(session.user.email ,activity.id)
            let txt = `${practitioner.name} הוסר משיעור ${activity.name} בהצלחה`
            getUserMsg(txt, true)

        } else {
            let txt = `הייתה בעייה לבטל שיעור, נסה מאוחר יותר`
            getUserMsg(txt, false)

        }
        const wasRefunded = await refundPractitionerMembershipAtDatabase(membershipId)
        if(wasRefunded){
            console.log('practitioner after refund',wasRefunded);
        }
        const user:Tuser =await getFullUserByEmail(session?.user?.email)
        // here we check if after refund user stil have memebershipId under user.memberships?
        const doUserOwnMembership = user.memberships.some(membership=>membership===membershipId)
        //if yes do nothing if no add it back to user.memberships[]
        console.log('do User Own Membership',doUserOwnMembership);
        if(!doUserOwnMembership){
            const wasMembershipJustPurchesed= false
            const [isSucsses,updatedUser] = await updateUserWithNewMembershipAtDatabase(membershipId, user._id, wasMembershipJustPurchesed)
            if(isSucsses) console.log('user.memberships was updated whith the refunded membership?',updatedUser);
            
        }
      }   
    }
  

    return (
        < >
            <p className='practitioner-name gc1 flex-jc-ac '>{practitioner.name}</p>

             <button onClick={()=> removePractitionerFromActivity( practitioner.membershipId)}
              className='has-arrived-btn flex-jc-ac gtc2 pointer' >לא הגיע </button>

                
        </>)
}