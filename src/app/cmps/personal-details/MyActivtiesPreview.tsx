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
    setCurrActivityId:(currActivityId:string)=>void
    askUserIfToRemoveHimFromActivity:(membershipId:string, activityName:string) => void

}

export default function MyActivtiesPreview({ activity, setCurrActivityId, userEmail,askUserIfToRemoveHimFromActivity }: MyActivtiesPreviewProps) {
    
    const practitioner: Tpractitioner = activity.practitioners.find(currPractitioner => currPractitioner.email === userEmail)
    const membershipId = practitioner.membershipId
    const LessonInfoHoursRangeProps = {
        isCanceled: activity.isCanceled,
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
    }
    const handelCancelation = () => {
        console.log('cancelation!!! ');
        setCurrActivityId(activity.id)
        askUserIfToRemoveHimFromActivity(membershipId, activity.name)
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