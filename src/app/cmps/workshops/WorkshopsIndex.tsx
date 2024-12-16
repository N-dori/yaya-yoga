'use client'
import { Tworkshop } from '@/app/types/types'
import React, { useState } from 'react'
import WorkshopsList from './WorkshopsList'

type WorkshopsIndexProps = {
  workshops:Tworkshop[]
}

export default function WorkshopsIndex({workshops}: WorkshopsIndexProps) {

  const WorkshopsListProps ={
    workshops
  }
  return (
    <section className='p-1'>
      <WorkshopsList {...WorkshopsListProps}/>

    </section>
  )
}