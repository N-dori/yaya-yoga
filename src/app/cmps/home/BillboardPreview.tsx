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

export default function BillboardPreview({ announcement }: ThisMounthPreviewProps) {

    return (
        <section className='embla__slide  '>
            <section className='announcement-border flex-col flex-ac'>

            <section className='announcement-title-and-image  '>
                <h3 className='announcement-title underline mb-1'>{announcement.title}</h3>
                <h5 className='announcement-subtitle mb-1'>{announcement.subTitle}</h5>
           
                    <section className='announcement-image w100'>
                <DynamicImage imgClassName={'announcement-image'} alt={'announcement-image'} url={announcement.img} />

                    </section>
                {/* </div> */}



                <div className='flex-sb mt-1'>
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





        </section>
    )
}