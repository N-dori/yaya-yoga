import { Tactivity } from '@/app/types/types'
import React from 'react'
import LessonInfoHoursRange from './LessonInfoHoursRange'
import Image from 'next/image'

type LessonInfoPreviewProps = {
    activity: Tactivity

}

export function LessonInfoPreview({ activity }: LessonInfoPreviewProps) {
    const LessonInfoHoursRangeProps = {
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
    }
    return (
        <li className='actitity-card-container flwx-col clean'>
            <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
            <section className='activity-info-container flex-col '>
                <div className='activity-info mb-1 grid'>
                    <Image className='activity-teacher-img gc1' 
                    alt={'teacher-img'} width={50} height={50} src={'https://robohash.org/kkk'} />
                   <div className=' flex-col gc2'>
                                       <span  className='activity-name gc2'> {activity.name} </span>
                    <span className='activity-teacher-name gc2'> {activity.teacher} </span>
                    <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>
 
                   </div>
                </div>
                <div className='check-in-container flex-sb'>
                    <span className='drop-in'>
                        מחיר כניסה חד פעמית : 50 ש"ח
                    </span>
                    <button type='button' className='check-in-button'>הרשם</button>

                </div>
            </section>


        </li>
    )
}