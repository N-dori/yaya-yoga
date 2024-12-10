import React, { useEffect } from 'react'
import MyAnnouncementList from './MyAnnouncementList'
import { Tannouncement } from '@/app/types/types'

type MyAnnouncementIndexProps = {
    announcements:Tannouncement[]
    setCurrAnnuncement: (annuncement: Tannouncement) => void
    removeAnnuncement:(id:string) => void


}

export default function MyAnnouncementIndex({announcements,setCurrAnnuncement ,removeAnnuncement}: MyAnnouncementIndexProps) {
  
    // useEffect(() => {

    // }, [announcements?.length])
  return (
    
        <MyAnnouncementList announcements={announcements} removeAnnuncement={removeAnnuncement} setCurrAnnuncement={setCurrAnnuncement}/>
        
  )
}