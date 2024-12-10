import React from 'react'
import MyAnnouncementPreview from './MyAnnouncementPreview'
import { Tannouncement } from '@/app/types/types'

type MyAnnouncementListProps = {
  announcements: Tannouncement[]
  setCurrAnnuncement: (annuncement: Tannouncement) => void
  removeAnnuncement: (id: string) => void

}

export default function MyAnnouncementList({ setCurrAnnuncement, announcements, removeAnnuncement }: MyAnnouncementListProps) {
  return (
    <ul className='my-announcement-list-container flex-ac'>
      {
        announcements.map((announcement, i) => 
         <MyAnnouncementPreview key={i}
          removeAnnuncement={removeAnnuncement}
          setCurrAnnuncement={setCurrAnnuncement}
          announcement={announcement} i={i} />)
      }
    </ul>
  )
}