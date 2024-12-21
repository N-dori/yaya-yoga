'use client'
import { Tworkshop } from '@/app/types/types'
import React from 'react'
import WorkshopsPreview from './WorkshopsPreview'

type WorkshopsListProps = {
  workshops:Tworkshop[]
}

export default function WorkshopsList({workshops}: WorkshopsListProps) {



  const WorkshopsPreviewProps={
    workshops,
    workshop:workshops[0],
    isDetailsMode:false,
    numberOfMeetings:workshops?.length
  }
  return (
    <section >

      <WorkshopsPreview {...WorkshopsPreviewProps}/>
    </section >
 

  )
}