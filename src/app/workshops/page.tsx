import React from 'react'
import WorkshopsIndex from '../cmps/workshops/WorkshopsIndex'

type Props = {}

export default function page({}: Props) {
  return (
    <main className='workshops-page-container'>
      <h1 className='tac'>סדנאות</h1>
      <WorkshopsIndex />
    </main>
  )
}