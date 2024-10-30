'use client'
import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivities from './DaysOfActivities'
import { LesssonsInfoList } from './LesssonsInfoList'
import 'react-datepicker/dist/react-datepicker.css'
import { getUrl, stripTime } from '@/app/utils/util'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import PeriodicAgenda from '@/app/models/periodicAgenda'
import BookingIndex from '../../booking/BookingIndex'


type WeeklyScheduleProps = {
  periodicAgenda: TperiodicAgenda | undefined
  periodicAgendaId:string
}

export default function WeeklySchedule({
  periodicAgendaId,
  periodicAgenda }: WeeklyScheduleProps) {

  const [currDate, setCurrDate] = useState<Date>(new Date())
  const [isOnBookingMode, setIsOnBookingMode] = useState<boolean>(false)

  const [activities, setActivities] = useState<Tactivity[] | undefined[]>([])
  const [isOnWeeklyScheduleMode, setIsOnWeeklyScheduleMode] = useState<boolean>(true)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    getWeeklyActivities(periodicAgenda?.activities)
  }, [])
  
  const onBooking = () => {
    setIsOnBookingMode(true)
  }
  const getWeeklyActivities = (activities: Tactivity[]) => {
    // get nearst sunday.
    let currentDate = new Date()
    if (currentDate.getDay() > 0) {
      while (currentDate.getDay() > 0) {
        currentDate.setDate(currentDate.getDate() - 1); // Move to the prev day

      }
      console.log('activities[0].date', new Date(activities[0].date))
      const activitiesOfTheWeek = creactWeeklyActivities(activities, currentDate)
      console.log('activitiesOfTheWeek', activitiesOfTheWeek);
      setActivities([...activitiesOfTheWeek])
    }

    if (currentDate.getDay() === 0) {
      const activitiesOfTheWeek = creactWeeklyActivities(activities, currentDate)
      setActivities([...activitiesOfTheWeek])
    }

  }


  const creactWeeklyActivities = (daysOfActivities: Tactivity[], currentDate: Date) => {
    let weeklyActivities: Tactivity[] = []
  //currentDate.getDay() === 0
    
    while (currentDate.getDay() < 6) {

      daysOfActivities.forEach(dayOfActivity => {
        const isDateMatch = stripTime(new Date(dayOfActivity.date)).getTime() === stripTime(new Date(currentDate)).getTime()
        if (isDateMatch) {
          //there migth be more then one activity that can be match that 
          //day, that is why to loop the array again to get all the activities in the same date 
          daysOfActivities.forEach(activity => {
            if (stripTime(new Date(activity.date)).getTime() === stripTime(currentDate).getTime()) {
             const isFound =weeklyActivities.some(activityOfWeek=>activityOfWeek.id===activity.id)
              if(!isFound){
               weeklyActivities.push(activity); // Add activity to the array
             }
            }
          })
        }
      })
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      console.log('currentDate.getDay()',currentDate.getDay());
      
    }
    return weeklyActivities

  }


  const DaysOfActivitiesProps = {
    activities,
    setCurrDate,
    currDate,
    isOnWeeklyScheduleMode,
  }

  const LesssonsListProps = {
    activities,
    currDate,
    isOnWeeklyScheduleMode,
    periodicAgendaId,
    onBooking,


  }

  return (
    <main className='preview-display-container flex-col gap1'>
      {<h1 className='schedule-headline tac mt1'>לוח זמנים שבועי</h1>}
      <h4 className='studio-name mb-05'>בית פעם- סטודיו קדם</h4>
      <h6 className='studio-address mb-05'>רחוב הדקלים 92, פרדס חנה-כרכור</h6>
      <h6 className='studio-phone mb-1'>052-437-7820</h6>
{!isOnBookingMode&&<h3>כדי להרשם לשיעור יש ללחוץ על כפתור  "הרשמה" </h3>}
    {!isOnBookingMode?
    <>
    <DaysOfActivities {...DaysOfActivitiesProps} />
    <LesssonsInfoList {...LesssonsListProps} />
    </>
    :
    <BookingIndex/>
    }
    </main>
  )
}