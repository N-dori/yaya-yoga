import { Tworkshop } from '@/app/types/types'
import { getFormatedDate, getFormatedTime } from '@/app/utils/util'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type WorkshopsPreviewProps = {
  
  workshop: Tworkshop
}


export default function WorkshopsPreview({ workshop }: WorkshopsPreviewProps) {

  const paragraphs = workshop.desc.split('/')

  return (
    <Link className='workshop-card-container flex-col gap1 clean ' href={`workshops/${workshop.id}`} >

      <h2 className='title tac'>{workshop.title}</h2>
      <h4 className='sub-title'>{workshop.subTitle}</h4>
      <section>
      {/* <div className='flex-sb'>
        <p className='date bold'>{getFormatedDate(workshop.date)}</p>
        <p className='hours bold'>{getFormatedTime(workshop.activityStartTime)} - {getFormatedTime(workshop.activityEndTime)}</p>
      </div> */}

      <Image className='work-shop-image' src={workshop.imgUrl} alt={'imageOfWorkshop'}
        style={{ width: '100%' }}
        sizes='100vw'
        width={0}
        height={270}
      />
      </section>
   
      <span> תאריך אחרון להרשמה  {getFormatedDate(workshop.lastDateForRegistration)}</span>
    {
      paragraphs.map(paragraph=>
        <p className='paragraph content'>{paragraph}</p>
      )
    }

<div className="blur-overlay flex-jc-ac">
    <span className="more">למידע נוסף</span>
  </div>
    </Link>
  )
}