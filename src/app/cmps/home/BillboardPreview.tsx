''
import { Tannouncement } from '@/app/types/types'
import { getFormattedTime } from '@/app/utils/util'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ParagraphsIndex from '../ParagraphsIndex'
import DynamicImage from '../DynamicImage'

type ThisMounthPreviewProps = {
    announcement: Tannouncement
}

export default function announcementPreview({ announcement }: ThisMounthPreviewProps) {

    return (
        <section className='announcement-wrapper flex-col '>
            <section className='announcement-title-and-image '>
                <h3 className='announcement-title'>{announcement.title}</h3>
                <h5 className='announcement-subtitle mb-1'>{announcement.subTitle}</h5>
                {/* {(announcement.price != 0)
                && <p className='announcement-price '> מחיר : {announcement.price} ש"ח</p>
            } */}
                {/* <div className='image-conatiner flex-ac-jc'>
                <Image className='announcement-image'
                    style={{ width: '100%', height: '100%' }}
                    quality={90} src={announcement.img}
                    sizes="100vw"
                    width={0}
                    height={0}
                    alt={'this mounth event image'} /> */}
                <DynamicImage imgClassName={'announcement-image'} alt={'announcement-image'} url={announcement.img} />
                {/* </div> */}



                <div className='flex-sb'>
                    {announcement?.date &&
                        <h5 className='announcement-date'>{new Date(announcement.date).toLocaleDateString('he-IL')}</h5>
                    }
                    {
                        announcement?.hours?.start &&
                        <h5 className='announcement-date'>{getFormattedTime(announcement.hours.start) + '-' + getFormattedTime(announcement.hours.end)}</h5>
                    }
                </div>
            </section>
            <ParagraphsIndex desc={announcement.desc} workshopId={announcement.workshopId} />





        </section>
    )
}