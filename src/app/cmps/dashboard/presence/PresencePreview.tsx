import { Tactivity, Tpractitioner } from '@/app/types/types'
import React, { useState } from 'react'
import PractitionerPreview from './PractitionerPreview'

type PresencePrivewProps = {
    activity: Tactivity
}

export default function PresencePreview({ activity }: PresencePrivewProps) {
  
    const timeOptions: Intl.DateTimeFormatOptions ={
        hour: '2-digit',       // Ensures 2-digit hour format
        minute: '2-digit',     // Ensures 2-digit minute format
        hour12: false 
    }
    const [startTime] = useState(new Date(activity?.hoursRange?.start).toLocaleTimeString('he-IL',timeOptions))
    const [endTime] = useState(new Date(activity?.hoursRange?.end).toLocaleTimeString('he-IL',timeOptions))

    return (
        <>
        
        <h3 className='class-name '> שיעור {activity.name} {" "} {startTime} - {endTime}</h3>
        <section className='presence-table grid'>
   
        {activity?.practitioners?.length?activity?.practitioners.map(practitioner=>
            <PractitionerPreview key={practitioner.email} practitioner={practitioner}/>
        ):
        <p className='full'>אין מתרגלים רשומים עדיין...</p>
        }


            
        </section>
            </>
        )
}