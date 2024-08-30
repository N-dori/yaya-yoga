import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import { LessonInfoPreview } from './LessonInfoPreview'
import { stripTime } from '@/app/util'

type LesssonsInfoListProps = {
  activities: Tactivity[] | undefined
  currDate: Date
  isOnSearchMode: boolean
  hadelExistSearchMode: () => void
  isWorkInProgress: boolean
  handelLessonCancelation: (id: string,isCanceled:boolean,lastDate:Date| null | undefined) => void

}

export function LesssonsInfoList({ handelLessonCancelation, hadelExistSearchMode, isOnSearchMode, isWorkInProgress, currDate, activities }: LesssonsInfoListProps) {
  const [activitiesOfTheDay, setActivitiesOfTheDay] = useState<Tactivity[]>()
  const [day, setDay] = useState<number>()
  const [mounth, setMounth] = useState<number>()
  const [year, setYear] = useState<number>()

  useEffect(() => {
    getActivitiesOfTheDay()
    if (currDate) {
      console.log('cu', typeof currDate);

      setDay(new Date(currDate).getDate())
      setMounth(new Date(currDate).getMonth()+1)
      setYear(new Date(currDate).getFullYear())

    }
  }, [currDate])

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

    let sortRes = res.sort((a: Tactivity, b: Tactivity) => {
      if (!a.date || !b.date) return 0;
      // console.log('new Date(a.date).getTime(', new Date(a.date).getDate());
      if (a.hoursRange && b.hoursRange) {
        if (a.hoursRange.start && b.hoursRange.start) {
          if (new Date(a.hoursRange.start).getTime() > new Date(b.hoursRange.start).getTime()) return 1
          if (new Date(a.hoursRange.start).getTime() < new Date(b.hoursRange.start).getTime()) return -1

        }
      }
      return 0
    });
    console.log('sorted by hours', sortRes);

    setActivitiesOfTheDay(sortRes)

  }

  return (
    <ul className='lessons-container'>
      {isOnSearchMode &&
        <div className='flex-col mt-1 mb-1'>
          <p className='pointer' onClick={hadelExistSearchMode}>X</p>
          <p>תוצאות חיפוש בעבור תאריך {`${day}/${mounth}/${year}`}</p>
        </div>}
      {activitiesOfTheDay?.length ? activitiesOfTheDay.map(activity =>
        <LessonInfoPreview key={activity.id} activity={activity}  handelLessonCancelation={handelLessonCancelation} />) :
        <p>אין פעילויות בתאריך הנבחר</p>}

    </ul>
  )
}