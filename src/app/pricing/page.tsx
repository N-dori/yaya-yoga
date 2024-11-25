import React from 'react'
import PlansList from '../cmps/booking/PlansList';

type Props = {}

export default async function Pricing({ }: Props) {

  return (
    <main className='pricing-page-container gc2'>
      <h1 className='tac p-1'>מחירון</h1>
      <h3 className='title '> מנויים לרכישה</h3>
      <PlansList />
    </main>
  )
}