import { Tannouncement } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'

type MyAnnouncementPreviewProps = {
  announcement:Tannouncement
  i:number
  setCurrAnnuncement: (annuncement: Tannouncement) => void

}

  export default function MyAnnouncementPreview({setCurrAnnuncement,announcement,i}: MyAnnouncementPreviewProps) {
 console.log('imgggggggggg:',announcement.img);
 
    return (
  <article  className='pointer' onClick={()=>setCurrAnnuncement(announcement)}>
    <span>{i+1}. </span>
      <Image className='announcement-preview-img' src={announcement.img}
      width={70}
      height={70}
      quality={90} alt="image of announcement" /> 
      </article>
)}