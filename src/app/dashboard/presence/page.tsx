import ActivityPresenceIndex from '@/app/cmps/dashboard/presence/ActivityPresenceIndex'
import { TperiodicAgenda } from '@/app/types/types'
import { getPeriodicAgenda } from '@/app/actions/periodicAgendaActions'
import React from 'react'

type Props = {}

export default async function  page({}: Props) {
    const res = await getPeriodicAgenda()
    let periodicAgenda:TperiodicAgenda
    
    if(res){
      periodicAgenda = res.periodicAgenda
    }

  return (
    <main className='presence-container gc2'>
      <ActivityPresenceIndex periodicAgenda={periodicAgenda}/>
    </main>
  )
}