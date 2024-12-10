import { Tannouncement } from '@/app/types/types'
import Image from 'next/image'
import React from 'react'

type MyAnnouncementPreviewProps = {
  announcement: Tannouncement
  i: number
  setCurrAnnuncement: (annuncement: Tannouncement) => void
  removeAnnuncement: (id: string) => void

}

export default function MyAnnouncementPreview({ setCurrAnnuncement, announcement, i, removeAnnuncement }: MyAnnouncementPreviewProps) {

  return (
    <>
    <div className='flex-col flex-sb remove-annuncement-btn-wrapper'>
      <button title='להסרה' className='remove-annuncement-btn' onClick={() => removeAnnuncement(announcement.id)}>X</button>
      <span>{i + 1}. </span>

    </div>
      <article className='pointer' onClick={() => setCurrAnnuncement(announcement)}>
        <Image className='announcement-preview-img' src={announcement.img}
          width={70}
          height={70}
          unoptimized
          quality={90} alt="image of announcement" />
      </article>
    </>
  )
}