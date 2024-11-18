'use client'
import { Tactivity } from '@/app/types/types'
import React from 'react'
import LessonInfoHoursRange from '../dashboard/create-periodic-agenda/LessonInfoHoursRange'
import Image from 'next/image'

type MyActivtiesPreviewProps = {
    activity:Tactivity
}

export default function MyActivtiesPreview({activity}: MyActivtiesPreviewProps) {
    const LessonInfoHoursRangeProps = {
        isCanceled: activity.isCanceled,
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
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
                    </div>
        
    </li>
  )
}