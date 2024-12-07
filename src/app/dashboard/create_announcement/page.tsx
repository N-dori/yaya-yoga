import AnnouncementCreationIndex from '@/app/cmps/dashboard/create-announcement/AnnouncementCreationIndex'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <main className='announcement-creation-page-container  gc2'>
        <h1 className='tac p-1'> יצירת לוח מודעות</h1>
        <AnnouncementCreationIndex/>

    </main>
  )
}