import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import { LessonInfoPreview } from './LessonInfoPreview'
import { stripTime } from '@/app/utils/util'

type LesssonsInfoListProps = {
  activities: Tactivity[] | undefined
  currDate: Date
  periodicAgendaId?: string
  isOnSearchMode?: boolean
  isOnWeeklyScheduleMode?: boolean
  hadelExistSearchMode?: () => void
  onBooking?: () => void
  handelLessonCancelation?: (id: string, isCanceled: boolean, lastDate: Date | null | undefined) => void
  setActivities?:(activities:Tactivity[])=>void
}

export function LesssonsInfoList({ onBooking, periodicAgendaId, handelLessonCancelation, hadelExistSearchMode, isOnSearchMode
  , isOnWeeklyScheduleMode, currDate, activities,setActivities }: LesssonsInfoListProps) {
  const [activitiesOfTheDay, setActivitiesOfTheDay] = useState<Tactivity[]>()
  const [day, setDay] = useState<number>()
  const [mounth, setMounth] = useState<number>()
  const [year, setYear] = useState<number>()

  useEffect(() => {

    
    setDay(new Date(currDate).getDate())
    setMounth(new Date(currDate).getMonth() + 1)
    setYear(new Date(currDate).getFullYear())
    getActivitiesOfTheDay()


  }, [currDate, activities.length])

  useEffect(() => {

  }, [activitiesOfTheDay])

  const getActivitiesOfTheDay = () => {
    let res: Tactivity[] = []

    if (activities) {
      activities.forEach(activity => {
        if (activity) {
          if (activity.date) {
            if (!isNaN(new Date(activity.date).getTime())) { // Check if the date is valid

              if (stripTime(new Date(activity.date)).getTime() === stripTime(currDate).getTime()) {
                res.push(activity);
              }

            }
          }
        }
      })
    }
    console.log('res :', res);
    
    let sortRes = res.sort((a: Tactivity, b: Tactivity) => {
      if (!a.date || !b.date) return 0;
      if (a.hoursRange && b.hoursRange) {
        if (a.hoursRange.start && b.hoursRange.start) {
          if (new Date(a.hoursRange.start).getTime() > new Date(b.hoursRange.start).getTime()) return 1
          if (new Date(a.hoursRange.start).getTime() < new Date(b.hoursRange.start).getTime()) return -1

        }
      }
      return 0
    });

    setActivitiesOfTheDay(sortRes)

  }

  return (
    <ul className='lessons-container flex-col gap1'>
      {isOnSearchMode &&
        <div className='flex-col mt-1 mb-1'>
          <p className='pointer' onClick={hadelExistSearchMode}>X</p>
          <p>תוצאות חיפוש בעבור תאריך {`${day}/${mounth}/${year}`}</p>
        </div>}
      {activitiesOfTheDay?.length ? activitiesOfTheDay.map(activity =>
        <LessonInfoPreview key={activity.id}
          periodicAgendaId={periodicAgendaId}
          isOnWeeklyScheduleMode={isOnWeeklyScheduleMode}
          activity={activity}
          handelLessonCancelation={handelLessonCancelation}
          onBooking={onBooking} 
          activities={activities}
          setActivities={setActivities}
          />)
           :
        <p>אין פעילויות בתאריך הנבחר</p>}

    </ul>
  )
}