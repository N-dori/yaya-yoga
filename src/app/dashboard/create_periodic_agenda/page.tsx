import React from 'react'
import PeriodicAgendaForm from '@/app/cmps/dashboard/create-periodic-agenda/PeriodicAgendaForm'
type Props = {}

export default function createPeriodicAgenda(props:any, searchParams:any) {



  return (
    <main className='create-periodic-agenda-container gc2 '>

      <h1 className='headilne tac'>יצירת לוז תקופתי </h1>

     <PeriodicAgendaForm/>
    
      </main>
  )
}