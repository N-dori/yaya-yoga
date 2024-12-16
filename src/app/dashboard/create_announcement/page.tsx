import AnnouncementCreationIndex from '@/app/cmps/dashboard/create-announcement/AnnouncementCreationIndex'
import { Tbillboard } from '@/app/types/types'
import { getBillboard } from '@/app/utils/util'
import React from 'react'

type Props = {}

export default async function page({}: Props) {
  const currBillboard = await getBillboard()
  const billboard: Tbillboard=currBillboard.billboard
  return (
    <main className='announcement-creation-page-container  gc2'>
        <h1 className='tac p-1'> יצירת לוח מודעות</h1>
        <AnnouncementCreationIndex billboard={billboard}/>
    </main>
  )
}