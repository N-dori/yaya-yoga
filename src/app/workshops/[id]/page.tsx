
import WorkshopsPreview from '@/app/cmps/workshops/WorkshopsPreview'
import { Tworkshop } from '@/app/types/types'
import { getWorkshops } from '@/app/actions/workshopActions'
import React from 'react'


export default async function page({ params }) {
  const allWorkshops: Tworkshop[] = await getWorkshops();
  const workshop = allWorkshops?.find(workshop => workshop.id === params.id);

const workshopsWithSameTitle = allWorkshops?.filter(currWorkshop => currWorkshop?.title?.trim() === workshop?.title?.trim());
const workshops = workshopsWithSameTitle?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
 
  return (
    <main className='workshop-details-container  gc2'>
      <h1 className='title tac '>YAYA YOGA</h1>
      <h2 className='mb-1 tac'>סדנאות</h2>
      {workshop &&
        <WorkshopsPreview
          numberOfMeetings={workshops?.length}
          workshop={workshops[0]}
          workshops={workshops}
          isDetailsMode={true} />}

    </main>
  )
}