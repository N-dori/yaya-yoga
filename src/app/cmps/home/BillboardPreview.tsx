''
import { Tannouncement } from '@/app/types/types'
import { getFormatedTime } from '@/app/utils/util'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ParagraphsIndex from '../ParagraphsIndex'

type ThisMounthPreviewProps = {
    announcement: Tannouncement
}

export default function BillboardPreview({ announcement }: ThisMounthPreviewProps) {

    return (
        <section className='this-mount-wrapper flex-col gap05'>
            <h3 className='this-mounth-event-title'>{announcement.title}</h3>
            <h5 className='this-mounth-event-subtitle'>{announcement.subTitle}</h5>

            <div className='image-conatiner flex-ac-jc'>
                <Image className='this-mounth-event-image'
                    style={{ width: '100%', height: '100%' }}
                    quality={90} src={announcement.img}
                    sizes="100vw"
                    width={0}
                    height={0}
                    alt={'this mounth event image'} />
            </div>

            <div className='flex-sb'>
                {announcement?.date &&
                    <h5 className='this-mounth-event-date'>{new Date(announcement.date).toLocaleDateString('he-IL')}</h5>
                }
                {
                    announcement?.hours?.start &&
                    <h5 className='this-mounth-event-date'>{getFormatedTime(announcement.hours.start) + '-' + getFormatedTime(announcement.hours.end)}</h5>
                }
            </div>
            <ParagraphsIndex desc={announcement.desc} workshopId={announcement.workshopId}/>
           

            {(announcement.price != 0)
                && <p className='this-mounth-event-desc '> מחיר : {announcement.price} ש"ח</p>
            }
            
          
        </section>
    )
}