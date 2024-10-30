import React from 'react'
import WeeklySchedule from '../cmps/dashboard/create-periodic-agenda/WeeklySchedule'
import { TperiodicAgenda } from '../types/types'
import { getPreiodicAgenda } from '../utils/util'

type Props = {}


export default async function page({}: Props) {

  const res= await getPreiodicAgenda()
  let periodicAgenda:TperiodicAgenda
  
  if(res){
    periodicAgenda = res.periodicAgenda
  }

 const WeeklyScheduleProps = {
   periodicAgenda,
   periodicAgendaId:periodicAgenda._id
 }

  return (
    <main className=' gc2'>
      <WeeklySchedule {...WeeklyScheduleProps} />
    </main>
   
  )
}