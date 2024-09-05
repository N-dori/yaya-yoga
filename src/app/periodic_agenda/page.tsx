import React from 'react'
import PeriodicAgendaPreviewDisplay from '../cmps/dashboard/create-periodic-agenda/PeriodicAgendaPreviewDisplay'
import { TperiodicAgenda } from '../types/types'
import { getUrl } from '../util'

type Props = {}
const getPreiodicAgenda = async ()=> {
  try {
    const url = getUrl('periodicAgenda/getPeriodicAgenda')
      const res = await fetch(url, {
          method: 'POST',
          headers: { "Content-type": "application/json" },
      })
      if (res.ok) {

         return  await res.json()

      } else {
          throw new Error('faild to get a new periodic Agenda')
      }
  } catch (err) {
      console.log('failed to fetch a periodic agenda reason: ',err);
  }
}

export default async function page({}: Props) {
  const res= await getPreiodicAgenda()
  let periodicAgenda:TperiodicAgenda
  if(res){
    periodicAgenda = res.periodicAgenda
  }
  const isPreview:boolean =false

 const PeriodicAgendaPreviewDisplayProps = {
   periodicAgenda,
   isWorkInProgress:false,
 }

  return (
    <main className=' gc2'>
      <PeriodicAgendaPreviewDisplay {...PeriodicAgendaPreviewDisplayProps} />
    </main>
   
  )
}