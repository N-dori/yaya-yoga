import { Tannouncement } from '@/app/types/types'
import React from 'react'
import BillboardPreview from './BillboardPreview'

type thisMountListProps = {
    announcements:Tannouncement[]
}

export default function BillboardList({announcements}: thisMountListProps) {
  return (
    <section className='billboard-warpper flex-col flex-jc-ac gap3'>
      {
        announcements?.map(announcement => 
        <BillboardPreview key={announcement.id} announcement={announcement}/> )
      }

     </section>)}