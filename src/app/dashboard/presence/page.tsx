import PresenceList from '@/app/cmps/dashboard/presence/PresenceList'
import { TperiodicAgenda } from '@/app/types/types'
import { getPreiodicAgenda } from '@/app/utils/util'
import React from 'react'

type Props = {}

export default async function  page({}: Props) {
    const res= await getPreiodicAgenda()
    let periodicAgenda:TperiodicAgenda
    
    if(res){
      periodicAgenda = res.periodicAgenda
    }

  return (
    <main className='presence-container gc2'>
         <PresenceList activities={periodicAgenda?.activities}/>
    </main>
  )
}