import React from 'react'


export default function page(params) {
  return (
    <main className='workshop-details-container  gc2'>
    <h1 className='title tac'>YAYA YOGA</h1>
      <h2>פרטי סדנא</h2>
      
    <span>{params.id}</span>
    {/* <UserQuestionnaire _id={params.userId}/> */}
    </main>
  )
}