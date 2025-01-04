'use client'
import { Tactivity, Tpractitioner, Tuser } from '@/app/types/types'
import React from 'react'
import LessonInfoHoursRange from '../dashboard/create-periodic-agenda/LessonInfoHoursRange'
import Image from 'next/image'
import Spinner from '../Spinner'

type MyActivtiesPreviewProps = {
    activity: Tactivity
    periodicAgendaId: string
    userEmail: string
    setCurrActivityId:(currActivityId:string)=>void
    askUserIfToRemoveHimFromActivity:(membershipId:string, activityName:string) => void
    isLoading:boolean
    currActivityId:string

}

export default function MyActivtiesPreview({ activity, setCurrActivityId, userEmail,currActivityId,askUserIfToRemoveHimFromActivity,isLoading }: MyActivtiesPreviewProps) {
    
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
    const checkActivityTime = () => {
        let currentTime: Date = new Date();
        let activityStart: Date = new Date(activity.date)
        let activityTime = new Date(activity.hoursRange.start)
        let hours = activityTime.toLocaleTimeString('he-IL').split(':')[0]
        let minutes = activityTime.toLocaleTimeString('he-IL').split(':')[1]
        activityStart.setHours(+hours, +minutes, 0, 0);
        console.log('activityStart : ', activityStart)

        // Define 9:00 and 17:00 as reference times
        const nineAM = new Date(activityStart);
        nineAM.setHours(9, 0, 0, 0);

        const fivePM = new Date(activityStart);
        fivePM.setHours(17, 0, 0, 0);

        // Condition 1: Early activity, starting at or before 9:00
        if (activityStart <= nineAM) {
            const twentyTwoDayBefore = new Date(activityStart);
            twentyTwoDayBefore.setDate(twentyTwoDayBefore.getDate() - 1); // Set to the previous day
            twentyTwoDayBefore.setHours(22, 0, 0, 0);

            // If current time is after 22:00 on the day before, return false
            if (currentTime >= twentyTwoDayBefore) {
                return false;
            }
        }

        // Condition 2: Late activity, starting at or after 17:00
        if (activityStart >= fivePM) {
            const timeDifference = Math.abs((+currentTime) - (+activityStart)) / (1000 * 60 * 60);

            // If the time difference is less than 2 hours, return false
            if (timeDifference < 2) {
                return false;
            }
        }

        // If neither condition returns false, return true
        return true;
    }

    return (
        <li className='my-activity-card '>
            <p className='activity-date tac '> {new Date(activity.date).toLocaleDateString('he-IL')} </p>
            <div className='activity-info-container flex-sb'>
                <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
                <p className='activity-name'>{activity.classOrWorkshop} {activity.name}  </p>

            </div>
            <div style={activity.isCanceled ? { textDecoration: ' line-through' } : {}}
                className='activity-info mb-1 grid'>
                <Image className='activity-teacher-img gc1'
                    alt={'teacher-img'} width={50} height={50} src={'/hero.jpg'} />
                <div className='activity-teacher-warpper flex-col gc2'>
                    <span className='activity-teacher-name gc2'> {activity.teacher} </span>
                    <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>

                </div>
               {!activity.workshopId&& <button disabled={!checkActivityTime() || activity.isCanceled}
                   style={!checkActivityTime() || activity.isCanceled ? { color: `var(--clr3)` } : {}}
                 onClick={handelCancelation} className='btn flex-jc-ac gc3'>
                {isLoading&& activity.id === currActivityId?
                <Spinner/>
                :
                <span>ביטול</span>
                }   
                </button>}
            </div>

        </li>
    )
}