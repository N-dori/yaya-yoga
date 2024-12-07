import React from 'react'
import MyAnnouncementPreview from './MyAnnouncementPreview'
import { Tannouncement } from '@/app/types/types'

type MyAnnouncementListProps = {
  announcements:Tannouncement[]
  setCurrAnnuncement: (annuncement: Tannouncement) => void

}

export default function MyAnnouncementList({setCurrAnnuncement,announcements}: MyAnnouncementListProps) {
  return (
    <ul className='flex-ac gap05 mb-1'>
        {
          announcements.map((announcement,i) => <MyAnnouncementPreview key={i} setCurrAnnuncement={setCurrAnnuncement} announcement={announcement} i={i}/>)
        }
      </ul>
  )
}