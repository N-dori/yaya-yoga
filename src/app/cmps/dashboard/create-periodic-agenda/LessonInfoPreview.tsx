import { Tactivity } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import LessonInfoHoursRange from './LessonInfoHoursRange'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { getUrl } from '@/app/utils/util'

type LessonInfoPreviewProps = {
    activity: Tactivity
    isOnWeeklyScheduleMode?: boolean
    handelLessonCancelation: (id: string, isCanceled: boolean, lastDate: Date | null | undefined) => void
    periodicAgendaId?: string
    onBooking?: () => void

}

export function LessonInfoPreview({ onBooking, periodicAgendaId, isOnWeeklyScheduleMode, activity, handelLessonCancelation }: LessonInfoPreviewProps) {
    const LessonInfoHoursRangeProps = {
        isCanceled: activity.isCanceled,
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
    }
    const { data: session } = useSession()
    useEffect(() => {

    }, [activity.date, activity.isCanceled, activity.id, periodicAgendaId])

    const handelClick = () => {

        handelLessonCancelation(activity.id, activity.isCanceled, activity.date)

    }

    const handelSignInToClass = async () => {
        if (session?.user?.email) {


            const url = getUrl('periodicAgenda/updatePeriodicAgendaPractitioners')
            const res = await fetch(url, {
                method: 'PUT',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ periodicAgendaId, 
                                       activityId: activity.id,
                                       email: session?.user?.email,
                                       name: session?.user?.name })
            })
            if (res.ok) {
                console.log('periodic agenda was updated activity with a new practitioner ');

            } else {
                console.log('ther was a problem  updateding  activity with a new practitioner ');

            }
        } else {
            onBooking()
            console.log('in order to sign in you must login first !',);
        }

    }

    return (
        <li className='actitity-card-container flwx-col clean'>
            <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
            {activity.isCanceled && <span > השיעור בוטל</span>}

            <section className='activity-info-container flex-col'
            >
                <div style={activity.isCanceled ? { textDecoration: ' line-through' } : {}} className='activity-info mb-1 grid'>
                    <Image className='activity-teacher-img gc1'
                        alt={'teacher-img'} width={50} height={50} src={'https://robohash.org/kkk'} />
                    <div className=' flex-col gc2'>
                        <span className='activity-name gc2'> {activity.name} </span>
                        <span className='activity-teacher-name gc2'> {activity.teacher} </span>
                        <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>

                    </div>
                </div>
                <div className='check-in-container flex-sb'>
                    <span style={activity.isCanceled ? { textDecoration: ' line-through' } : {}} className='drop-in'>
                        מחיר כניסה חד פעמית : 50 ש"ח
                    </span>
                    {!isOnWeeklyScheduleMode ? <button style={activity.isCanceled ? { backgroundColor: 'green' } : { backgroundColor: '#cf00009e' }}
                        type='button' className='check-in-button'
                        onClick={() => handelClick()}>{activity.isCanceled ? 'שחזר ' : 'בטל '}
                    </button> : <></>}
                    {isOnWeeklyScheduleMode ?
                        <button type='button' className='sign-in-to-class-btn'
                            onClick={() => handelSignInToClass()}>
                            הרשמה
                        </button> : <></>}

                </div>
            </section>


        </li>
    )
}