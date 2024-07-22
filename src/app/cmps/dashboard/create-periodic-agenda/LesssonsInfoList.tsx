import { TperiodicAgenda } from '@/app/types/types'
import React from 'react'
import { LessonInfoPreview } from './LessonInfoPreview'

type LesssonsInfoListProps = {
    periodicAgenda:TperiodicAgenda| undefined
}

export  function LesssonsInfoList({periodicAgenda}: LesssonsInfoListProps) {
  return (
    <ul className='lessons-container'>
    {periodicAgenda?.activities.map(activity =>
     <LessonInfoPreview key={activity.id} activity={activity}/> )    }

    </ul>
  )
}