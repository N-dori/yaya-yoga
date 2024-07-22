import { Tactivity } from '@/app/types/types'
import React from 'react'
import LessonInfoHoursRange from './LessonInfoHoursRange'
import Image from 'next/image'

type LessonInfoPreviewProps = {
    activity: Tactivity
}

export function LessonInfoPreview({ activity }: LessonInfoPreviewProps) {
    const LessonInfoHoursRangeProps = {
        start:activity.hoursRange.start,
        end:activity.hoursRange.end
    }
    return (
        <li className='actitity-card-container'>
            <LessonInfoHoursRange {...LessonInfoHoursRangeProps}/>
            <div className=''>
           <Image alt={'teacher-img'} width={60} height={60} src={'https://robohash.org/kkk'}/>
            <span> {activity.name} </span>
            <span> {activity.teacher} </span>
            <span> בית פעם - סטודיו קדם  </span>
            </div>

        </li>
    )
}