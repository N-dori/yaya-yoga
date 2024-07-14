import React from 'react'
import DaysOWeek from '../cmps/weekly-schedule/DaysOWeek'

type Props = {}

export default function WeeklySchedule({}: Props) {
 
  return (
    <main className='weekly-schedule-container flex-jc-ac gc2'>
      <DaysOWeek/>
      {/* <ActivitiesIndex/> */}
    </main>
   
  )
}