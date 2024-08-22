import React from 'react'
import PeriodicAgendaPreviewDisplay from '../cmps/dashboard/create-periodic-agenda/PeriodicAgendaPreviewDisplay'
import { TperiodicAgenda } from '../types/types'

type Props = {}
const getPreiodicAgenda = async ()=> {
  try {
      
      const res = await fetch('http://localhost:3000/api/periodicAgenda/getPeriodicAgenda', {
          method: 'POST',
          headers: { "Content-type": "application/json" },
      })
      if (res.ok) {

         return  await res.json()

      } else {
          throw new Error('faild to get a new periodic Agenda')
      }
  } catch (err) {
      console.log(err);
  }
}

export default async function page({}: Props) {

  const {periodicAgenda} = await getPreiodicAgenda()
  const isPreview:boolean =false

 const PeriodicAgendaPreviewDisplayProps = {
   periodicAgenda,
  isPreview,
 }

  return (
    <main className=' gc2'>
      <PeriodicAgendaPreviewDisplay {...PeriodicAgendaPreviewDisplayProps} />
    </main>
   
  )
}