
import WorkshopsPreview from '@/app/cmps/workshops/WorkshopsPreview'
import { Tworkshop } from '@/app/types/types'
import { getWorkshop, getWorkshops, isAfterToday } from '@/app/utils/util'
import React from 'react'


export default async  function page({params}) {
  let workshopsAfterToday :Tworkshop[]
  const allWorkshops:Tworkshop[] = await getWorkshops()

  console.log('allWorkshops: ',allWorkshops);
  const workshop :Tworkshop= allWorkshops?.find(workshop=>workshop.id === params.id)
  console.log('workshop by id: ',workshop);
  if(workshop){

    const workshopsWithSameTitle :Tworkshop[]= allWorkshops.filter(currWorkshop => currWorkshop.title === workshop.title)
  console.log('workshopsWithSameTitle',workshopsWithSameTitle);
  
    workshopsAfterToday  = workshopsWithSameTitle.filter(currWorkshop => isAfterToday(currWorkshop.date))
  }
    const workshops =  workshopsAfterToday?.sort((a: Tworkshop, b: Tworkshop) => {
      if (!a.date || !b.date) return 0;
      if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1
      if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1
      return 0
    });
  return (
    <main className='workshop-details-container  gc2'>
    <h1 className='title tac mt-1'>YAYA YOGA</h1>
      <h2 className='mb-1 tac'>סדנאות</h2>
     { workshop&&<WorkshopsPreview numberOfMeetings={workshops?.length} workshop={workshops[0]} workshops={workshops} isDetailsMode={true}/>}
   
    </main>
  )
}