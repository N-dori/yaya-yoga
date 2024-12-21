'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type ParagraphsProps = {
    desc: string
    workshopId?: string
    isDetailsMode?:boolean
}

export default function ParagraphsIndex({ desc, workshopId ,isDetailsMode}: ParagraphsProps) {
    const [isReadMore, setIsReadMore] = useState(false)
    const [paragraphs] = useState(desc.split('/'))
    useEffect(() => {
     if(isDetailsMode ){
        setIsReadMore(true)
     }
    }, [])
    

    const handelReadMore = () => {
        setIsReadMore(true)
    }

    return (
        <section className='this-mounth-event-desc-wrapper'
            style={!isReadMore ? { maxHeight: '144px', overflow: 'hidden' } : {}}>
            {isReadMore && paragraphs &&
                paragraphs?.map((paragraph, i) =>
                    <p key={i} className='this-mounth-event-desc '>  {paragraph} </p>
                )}
            {!isReadMore&&

                <section className='this-mounth-event-desc mb-1 '> 
                 {paragraphs[0]} {paragraphs[1]}... 
                
                <p className="blur-overlay flex-jc-ac">
                    <span onClick={handelReadMore} className="more pointer">להמשך קריאה</span>
                </p>
                </section>
            }
            
            
            {(workshopId && isReadMore) &&
                <div className="blur-overlay flex-jc-ac">
                    <Link className="more" href={`workshops/${workshopId}`}>למידע נוסף</Link>
                </div>
            }
        </section>
    )
}