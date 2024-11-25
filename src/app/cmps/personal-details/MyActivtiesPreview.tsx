'use client'
import { Tactivity, Tpractitioner, Tuser } from '@/app/types/types'
import React from 'react'
import LessonInfoHoursRange from '../dashboard/create-periodic-agenda/LessonInfoHoursRange'
import Image from 'next/image'
import { getFullUserByEmail, refundPractitionerMembershipAtDatabase, removePractitionerFromActivityFromDatabase, updateUserWithNewMembershipAtDatabase } from '@/app/utils/util'
import { useDispatch } from 'react-redux'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'

type MyActivtiesPreviewProps = {
    activity: Tactivity
    periodicAgendaId: string
    userEmail: string
}

export default function MyActivtiesPreview({ activity, periodicAgendaId, userEmail }: MyActivtiesPreviewProps) {
    const LessonInfoHoursRangeProps = {
        isCanceled: activity.isCanceled,
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
    }
const dispatch = useDispatch()
    const handelCancelation = () => {
        console.log('cancelation!!! ');
        removePractitionerFromActivity()

    }
    const getUserMsg = (txt: string, isSucsses: boolean) => {
        window.scrollTo(0, 0)
        dispatch(callUserMsg({ msg: txt, isSucsses }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }
    const removePractitionerFromActivity = async () => {
        const practitioner:Tpractitioner = activity.practitioners.find(currPractitioner => currPractitioner.email === userEmail)
       const membershipId = practitioner.membershipId
        const isAgree = confirm(`האם לבטל ולזכות את ${practitioner.name}?`)
        if (isAgree) {

            const wasRemoved = await removePractitionerFromActivityFromDatabase(periodicAgendaId, activity.id, userEmail)
            if (wasRemoved) {
                // removePractitionerFromClientSideActivities(userEmail ,activity.id)
                let txt = `${practitioner.name} הוסר משיעור ${activity.name} בהצלחה`
                getUserMsg(txt, true)

            } else {
                let txt = `הייתה בעייה לבטל שיעור, נסה מאוחר יותר`
                getUserMsg(txt, false)

            }
            const wasRefunded = await refundPractitionerMembershipAtDatabase(membershipId)
            if (wasRefunded) {
                console.log('practitioner after refund', wasRefunded);
            }
            const user: Tuser = await getFullUserByEmail(userEmail)
            // here we check if after refund user stil have memebershipId under user.memberships?
            const doUserOwnMembership = user.memberships.some(membership => membership === membershipId)
            //if yes do nothing if no add it back to user.memberships[]
            console.log('do User Own Membership', doUserOwnMembership);
            if (!doUserOwnMembership) {
                const updatedUser = await updateUserWithNewMembershipAtDatabase(membershipId, user._id)
                if (updatedUser) console.log('user.memberships was updated whith the refunded membership?', updatedUser);

            }
        }
    }
    return (
        <li className='my-activity-card '>
            <p className='activity-date tac '> {new Date(activity.date).toLocaleDateString('he-IL')} </p>
            <div className='activity-info-container flex-sb'>
                <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
                <p className='activity-name'>שיעור {activity.name}  </p>

            </div>
            <div style={activity.isCanceled ? { textDecoration: ' line-through' } : {}}
                className='activity-info mb-1 grid'>
                <Image className='activity-teacher-img gc1'
                    alt={'teacher-img'} width={50} height={50} src={'https://robohash.org/kkk'} />
                <div className='activity-teacher-warpper flex-col gc2'>
                    <span className='activity-teacher-name gc2'> {activity.teacher} </span>
                    <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>

                </div>
                <button onClick={handelCancelation} className='sign-in-or-cancel-btn gc3'>ביטול</button>
            </div>

        </li>
    )
}