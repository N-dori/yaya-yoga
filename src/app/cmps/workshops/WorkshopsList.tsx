
import { Tworkshop } from '@/app/types/types'
import React from 'react'
import WorkshopsPreview from './WorkshopsPreview'

type WorkshopsListProps = {
  workshops:Tworkshop[]
}

export default function WorkshopsList({workshops}: WorkshopsListProps) {



  const WorkshopsPreviewProps={
    workshop:workshops[0]
  }
  return (
   <WorkshopsPreview {...WorkshopsPreviewProps}/>
 

  )
}