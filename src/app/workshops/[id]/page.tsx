
import WorkshopsPreview from '@/app/cmps/workshops/WorkshopsPreview'
import { getWorkshop } from '@/app/utils/util'
import React from 'react'


export default async  function page({params}) {

const workshop = await getWorkshop(params.id)
  return (
    <main className='workshop-details-container  gc2'>
    <h1 className='title tac mt-1'>YAYA YOGA</h1>
      <h2 className='mb-1 tac'>סדנאות</h2>
     { workshop&&<WorkshopsPreview workshop={workshop} isDetailsMode={true}/>}
     <div className='flex-jc-ac'>
      <button type='button' className='btn'>להרשמה</button>

     </div>
    </main>
  )
}