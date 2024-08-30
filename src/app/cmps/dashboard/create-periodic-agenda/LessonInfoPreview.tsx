import { Tactivity } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import LessonInfoHoursRange from './LessonInfoHoursRange'
import Image from 'next/image'

type LessonInfoPreviewProps = {
    activity: Tactivity
    handelLessonCancelation: (id: string,isCanceled:boolean,lastDate:Date| null | undefined) => void


}

export function LessonInfoPreview({ activity,handelLessonCancelation }: LessonInfoPreviewProps) {
    const LessonInfoHoursRangeProps = {
        isCanceled: activity.isCanceled,
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
    }
    useEffect(() => {
     
    }, [activity.isCanceled])
    
    const handelClick = () => {
    
            handelLessonCancelation(activity.id, activity.isCanceled, activity.date)

        
    }


    
    return (
        <li className='actitity-card-container flwx-col clean'>
            <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
            {activity.isCanceled&&<span > השיעור בוטל</span>}

            <section className='activity-info-container flex-col'
            >
                <div  style={activity.isCanceled?{textDecoration:' line-through'}:{}} className='activity-info mb-1 grid'>
                    <Image className='activity-teacher-img gc1' 
                    alt={'teacher-img'} width={50} height={50} src={'https://robohash.org/kkk'} />
                   <div className=' flex-col gc2'>
                      <span  className='activity-name gc2'> {activity.name} </span>
                    <span className='activity-teacher-name gc2'> {activity.teacher} </span>
                    <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>
 
                   </div>
                </div>
                <div  className='check-in-container flex-sb'>
                    <span  style={activity.isCanceled?{textDecoration:' line-through'}:{}} className='drop-in'>
                        מחיר כניסה חד פעמית : 50 ש"ח
                    </span>
                    <button style={activity.isCanceled?{backgroundColor:'green'}:{backgroundColor:'#cf00009e'}} 
                            type='button' className='check-in-button'
                            onClick={()=>handelClick()}>{activity.isCanceled?'שחזר ':'בטל '}
                    </button>

                </div>
            </section>


        </li>
    )
}