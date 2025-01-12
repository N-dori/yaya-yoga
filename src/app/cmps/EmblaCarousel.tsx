'use client'
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import DynamicImage from './DynamicImage'
import Autoplay from 'embla-carousel-autoplay'
import BillboardPreview from './home/BillboardPreview'
import { Tannouncement } from '../types/types'

type slide = {
    id: string,
    image: string,
    title: string,
    subTitle: string,
    desc: string,
    date: Date | null | undefined;
    hours?: {
        start: Date;
        end: Date;
    };
    img: string;
    price?: number;
    workshopId?: string;
}
type embleProps = {
    slides: Tannouncement[]
}
export default function EmblaCarousel({ slides }: embleProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true ,  direction: 'rtl'},
         [Autoplay({delay:5000})])

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
            
        }
        console.log('slides', slides);

    }, [emblaApi])

    return (
        <div className="embla flex-jc" ref={emblaRef}>
            <div className="embla__container w100">
                {
                    slides?.map(slide =>
                
                        <BillboardPreview announcement={slide} />
                    )
                }

            </div>
        </div>
    )
}
