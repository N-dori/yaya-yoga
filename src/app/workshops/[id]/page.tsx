
import WorkshopsPreview from '@/app/cmps/workshops/WorkshopsPreview'
import { Tworkshop } from '@/app/types/types'
import { getWorkshop, getWorkshops } from '@/app/utils/util'
import React from 'react'


export default async  function page({params}) {

  const allWorkshops:Tworkshop[] = await getWorkshops()
  const workshop = allWorkshops.find(workshop=>workshop.id === params.id)
  const workshops :Tworkshop[]= allWorkshops.filter(currWorkshop => currWorkshop.title === workshop.title)

  return (
    <main className='workshop-details-container  gc2'>
    <h1 className='title tac mt-1'>YAYA YOGA</h1>
      <h2 className='mb-1 tac'>סדנאות</h2>
     { workshop&&<WorkshopsPreview numberOfMeetings={workshops?.length} workshop={workshop} workshops={workshops} isDetailsMode={true}/>}
   
    </main>
  )
}