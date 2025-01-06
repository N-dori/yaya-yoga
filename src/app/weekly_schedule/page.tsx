import React from 'react'
import WeeklySchedule from '../cmps/weekly-schedule/WeeklySchedule'
import { TperiodicAgenda } from '../types/types'
import { getPeriodicAgenda } from '../utils/util'

type Props = {}


export default async function page({}: Props) {

  const res= await getPeriodicAgenda()
  let periodicAgenda:TperiodicAgenda
  
  if(res){
    periodicAgenda = res.periodicAgenda
  }

 const WeeklyScheduleProps = {
   periodicAgenda,
   periodicAgendaId:periodicAgenda?._id
 }

  return (
    <main className=' gc2'>
      <WeeklySchedule {...WeeklyScheduleProps} />
    </main>
   
  )
}