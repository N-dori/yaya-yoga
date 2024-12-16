import { Tworkshop } from '@/app/types/types'
import { getFormatedDate, getFormatedTime } from '@/app/utils/util'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type WorkshopsPreviewProps = {
  isDetailsMode:boolean
  workshop: Tworkshop
  
}


export default function WorkshopsPreview({ workshop, isDetailsMode }: WorkshopsPreviewProps) {

  const paragraphs = workshop.desc.split('/')

  return (
    <article className='workshop-card-container flex-col gap1 clean ' >

      <h2 className=' tac'>{workshop.title}</h2>
      <h4 className='sub-title'>{workshop.subTitle}</h4>
      <section>

     { isDetailsMode&&
     <div className='flex-sb'>
        <p className='date bold'>{getFormatedDate(workshop.date)}</p>
        <p className='hours bold'>{getFormatedTime(workshop.activityStartTime)} - {getFormatedTime(workshop.activityEndTime)}</p>
      </div>}

      <Image className='work-shop-image' src={workshop.imgUrl} alt={'imageOfWorkshop'}
        style={{ width: '100%' }}
        sizes='100vw'
        width={0}
        height={270}
      />
      </section>
   
      <span className='last-date tac'> תאריך אחרון להרשמה <span className='bold'> {getFormatedDate(workshop.lastDateForRegistration)}</span></span>
    {
      paragraphs.map(paragraph=>
        <p className={isDetailsMode?'paragraph':' content'}>{paragraph}</p>
      )
    }

{!isDetailsMode&&<div className="blur-overlay flex-jc-ac">
    <Link className="more" href={`workshops/${workshop.id}`}>למידע נוסף</Link>
  </div>}
    </article>
  )
}