import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import { LessonInfoPreview } from './LessonInfoPreview'
import { stripTime } from '@/app/util'

type LesssonsInfoListProps = {
  periodicAgenda: TperiodicAgenda | undefined
  currDate: Date
}

export function LesssonsInfoList({ currDate, periodicAgenda }: LesssonsInfoListProps) {
  const [activitiesOfTheDay, setActivitiesOfTheDay] = useState<Tactivity[]>()
 
  useEffect(() => {
    getActivitiesOfTheDay()
  }, [currDate])

  useEffect(() => {

  }, [activitiesOfTheDay])

  const getActivitiesOfTheDay = () => {
    let res: Tactivity[] = []
    if (periodicAgenda) {
      if (periodicAgenda.activities) {
        periodicAgenda.activities.forEach(activity => {
          if (activity) {
            if (activity.date) {
              if (!isNaN(new Date(activity.date).getTime())) { // Check if the date is valid
          
                if (stripTime (new Date (activity.date)).getTime() === stripTime(currDate).getTime()) {
                  res.push(activity);
                }

              }
            }
          }
        })
      }
    }


    setActivitiesOfTheDay(res)

  }
  return (
    <ul className='lessons-container'>
      {activitiesOfTheDay?.map(activity =>
        <LessonInfoPreview key={activity.id} activity={activity} />)}

    </ul>
  )
}