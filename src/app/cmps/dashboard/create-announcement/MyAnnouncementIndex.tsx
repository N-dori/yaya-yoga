import React from 'react'
import MyAnnouncementList from './MyAnnouncementList'
import { Tannouncement } from '@/app/types/types'

type MyAnnouncementIndexProps = {
    announcements:Tannouncement[]
    setCurrAnnuncement: (annuncement: Tannouncement) => void


}

export default function MyAnnouncementIndex({announcements,setCurrAnnuncement}: MyAnnouncementIndexProps) {
  return (
    
        <MyAnnouncementList announcements={announcements} setCurrAnnuncement={setCurrAnnuncement}/>
        
  )
}