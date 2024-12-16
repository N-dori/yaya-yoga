
import WorkshopsPreview from '@/app/cmps/workshops/WorkshopsPreview'
import { getWorkshop } from '@/app/utils/util'
import React from 'react'


export default async  function page({params}) {

const workshop = await getWorkshop(params.id)
  return (
    <main className='workshop-details-container  gc2'>
    <h1 className='title tac'>YAYA YOGA</h1>
      <h2>פרטי סדנא</h2>
      <WorkshopsPreview workshop={workshop}/>

    </main>
  )
}