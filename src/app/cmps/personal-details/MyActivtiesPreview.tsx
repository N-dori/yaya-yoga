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
        <p>{activity.name} שיעור </p>
    <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
    <div style={activity.isCanceled ? { textDecoration: ' line-through' } : {}} className='activity-info mb-1 grid'>
                        <Image className='activity-teacher-img gc1'
                            alt={'teacher-img'} width={50} height={50} src={'https://robohash.org/kkk'} />
                        <div className=' flex-col gc2'>
                            <span className='activity-name gc2'> {activity.name} </span>
                            <span className='activity-teacher-name gc2'> {activity.teacher} </span>
                            <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>

                        </div>
                    </div>
        
    </li>
  )
}