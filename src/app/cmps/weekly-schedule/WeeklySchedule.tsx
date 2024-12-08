'use client'
import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import { LesssonsInfoList } from '../dashboard/create-periodic-agenda/LesssonsInfoList'
import 'react-datepicker/dist/react-datepicker.css'
import { stripTime } from '@/app/utils/util'
import DatesOfActivities from './DatesOfActivities'
import PlansLogin from '../booking/PlansLogin'


type WeeklyScheduleProps = {
  periodicAgenda: TperiodicAgenda | undefined
  periodicAgendaId: string
}

export default function WeeklySchedule({
  periodicAgendaId,
  periodicAgenda }: WeeklyScheduleProps) {
  const today = new Date()
  // if(today.getDay() === 6 )today.setDate(new Date().getDate()+1 )

  const [currDate, setCurrDate] = useState<Date>(today)
  const [isOnBookingMode, setIsOnBookingMode] = useState<boolean>(false)

  const [activities, setActivities] = useState<Tactivity[] | undefined[]>([])
  const [isOnWeeklyScheduleMode] = useState<boolean>(true)
  const [isOnCancelMode, setIsOnCancelMode] = useState<boolean>(false)



  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [])
  useEffect(() => {
    getWeeklyActivities(periodicAgenda?.activities)
    console.log('activities', activities);

  }, [isOnCancelMode, currDate])




  const onBooking = () => {
    setIsOnBookingMode(true)
  }

  const getWeeklyActivities = (activities: Tactivity[]) => {
    if(activities){

      // get nearst sunday.
      // if today is Saturday than moving to the next day Sunday and dispalying the next week 
      let currentDate = new Date()
      // if(currentDate.getDay() === 6 )currentDate.setDate(new Date().getDate()+1 )
      if (currentDate.getDay() === 0) {
        const activitiesOfTheWeek = creactWeeklyActivities(activities, currentDate)
        
        setActivities([...activitiesOfTheWeek])
        return 
      }
      
      while (currentDate.getDay() > 0) {
        currentDate.setDate(currentDate.getDate() - 1); // Move to the prev day
      }
      const activitiesOfTheWeek = creactWeeklyActivities(activities, currentDate)
      setActivities([...activitiesOfTheWeek])
      
    }
  }


  const creactWeeklyActivities = (daysOfActivities: Tactivity[], currentDate: Date) => {
    
    let weeklyActivities: Tactivity[] = []
    let count: number = 0
    while (count <= 6) {

      daysOfActivities.forEach(dayOfActivity => {
        const isDateMatch = stripTime(new Date(dayOfActivity.date)).getTime() === stripTime(new Date(currentDate)).getTime()
        if (isDateMatch) {
          //there migth be more then one activity that can be match that 
          //day, that is why to loop the array again to get all the activities in the same date 
          daysOfActivities.forEach(activity => {
            if (stripTime(new Date(activity.date)).getTime() === stripTime(currentDate).getTime()) {
              const isFound = weeklyActivities.some(activityOfWeek => activityOfWeek.id === activity.id)
              if (!isFound) {
                weeklyActivities.push(activity); // Add activity to the array
              }
            }
          })
        }
      })
      count++
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day

    }
    return weeklyActivities

  }


  const DatesOfActivitiesProps = {
    activities,
    setCurrDate,
    currDate,
    isOnCancelMode, setIsOnCancelMode
  }

  const LesssonsListProps = {
    activities,
    currDate,
    isOnWeeklyScheduleMode,
    periodicAgendaId,
    onBooking,
    setActivities

  }

  return (
    <main className='preview-display-container flex-col gap05'>
      <h1 className='schedule-headline tac'>לוח זמנים שבועי</h1>
      <h3 className='tac yaya-yoga-txt'>יאיא יוגה</h3>
      <h6 className='studio-address mb-05'>בית פעם- סטודיו קדם, רחוב הדקלים 92, פרדס חנה-כרכור </h6>
      <h6 className='studio-phone mb-1'>052-437-7820</h6>
      {!isOnBookingMode && <h3>כדי להרשם לשיעור יש ללחוץ על כפתור  "הרשמה" </h3>}
      {!isOnBookingMode ?
        <>
          <DatesOfActivities {...DatesOfActivitiesProps} />
          {/* <DaysOfActivities {...DaysOfActivitiesProps} /> */}
          <LesssonsInfoList {...LesssonsListProps} />
        </>
        :
        <PlansLogin />
      }
    </main>
  )
}