'use client'
import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import { LessonsInfoList } from '../dashboard/create-periodic-agenda/LessonsInfoList'
import 'react-datepicker/dist/react-datepicker.css'
import { isBothTheSameDate, stripTime } from '@/app/utils/util'
import PlansLogin from '../booking/PlansLogin'
import { useSession } from 'next-auth/react'
import ExistingUserLoginBtn from '../booking/ExistingUserLoginBtn'
import DatesOfActivitiesIndex from './DatesOfActivitiesIndex'


type WeeklyScheduleProps = {
  periodicAgenda: TperiodicAgenda | undefined
  periodicAgendaId: string
}

export default function WeeklySchedule({periodicAgendaId,periodicAgenda }: WeeklyScheduleProps) {
  const [activities, setActivities] = useState<Tactivity[] | undefined[]>([])

    const { data: session } = useSession()
  
  var today = new Date()
  // change today date to Sunday if today is Saturday and either no activities are scheduled or it's past 5:00 PM.
  const checkIfAnyThingScheduleOnSaturday = (activities: Tactivity[], givenDate: Date) => {
    if (givenDate.getDay() === 6) {
      // if today is Saturday and there is nothing scheduled! 
      //than moving to the next day Sunday and displaying the next week   
      const SaturdayFound = activities.some(activity => isBothTheSameDate(new Date(activity.date), givenDate))
      if (!SaturdayFound) {
        givenDate.setDate(new Date().getDate() + 1) //moving to the next day
        return givenDate
      }
      //if there was a class schedule on saturday
      //we check if it is now pass 17:00 if yes display the next day  
      const fivePM = new Date(givenDate);
      fivePM.setHours(17, 0, 0, 0);
      if (givenDate > fivePM) {
        givenDate.setDate(new Date().getDate() + 1) //moving to the next day

      }
    }
    return givenDate
  }

  today = checkIfAnyThingScheduleOnSaturday(periodicAgenda?.activities, today)//if not moving to next day
  const [currDate, setCurrDate] = useState<Date>(today)
  const [isOnBookingMode, setIsOnBookingMode] = useState<boolean>(false)

  const [isOnWeeklyScheduleMode] = useState<boolean>(true)
  const [isOnCancelMode, setIsOnCancelMode] = useState<boolean>(false)



  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [])
  useEffect(() => {
    getWeeklyActivities(periodicAgenda?.activities)

  }, [isOnCancelMode, currDate])


  const onBooking = () => {
    setIsOnBookingMode(true)
  }

  const getWeeklyActivities = (activities: Tactivity[]) => {
    if (activities) {

      let currentDate = new Date()

      currentDate = checkIfAnyThingScheduleOnSaturday(activities, currentDate)

      if (currentDate.getDay() === 0) {
        const activitiesOfTheWeek = createWeeklyActivities(activities, currentDate)
        setActivities([...activitiesOfTheWeek])
        return
      }

      // get nearst sunday.
      while (currentDate.getDay() > 0) {// moving back to sunday
        currentDate.setDate(currentDate.getDate() - 1); // Move to the prev day
      }
      const activitiesOfTheWeek = createWeeklyActivities(activities, currentDate)

      setActivities([...activitiesOfTheWeek])

    }
  }


  const createWeeklyActivities = (daysOfActivities: Tactivity[], currentDate: Date) => {

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

  const LessonsListProps = {
    activities,
    currDate,
    isOnWeeklyScheduleMode,
    periodicAgendaId,
    onBooking,
    setActivities

  }

  return (
    <main className='preview-display-container flex-col gap05'>
      {!isOnBookingMode && <h3 className='instructions mt-1'>כדי להרשם לשיעור יש ללחוץ על כפתור  "הרשמה" </h3>}
   <section className='preview-display-wrapper'>
      <div className={`${session? 'tac':'flex-sb gap1'}`}>
      <h2 className={`schedule-headline `}>לוח זמנים שבועי</h2>
        {(!session&&!isOnBookingMode)&& <ExistingUserLoginBtn/>}
    </div>
      <h3 className='tac yaya-yoga-txt overline pb-1'>YAYA-YOGA</h3>
      <h6 className='studio-address mb-05'>בית פעם- סטודיו קדם, רחוב הדקלים 92, פרדס חנה-כרכור </h6>
      <h6 className='studio-phone mb-1'>052-437-7820</h6>
      {!isOnBookingMode ?
        <>
          <DatesOfActivitiesIndex {...DatesOfActivitiesProps} />
          <LessonsInfoList {...LessonsListProps} />
        </>
        :
        <PlansLogin />
      }
      </section> 
    </main>
  )
}