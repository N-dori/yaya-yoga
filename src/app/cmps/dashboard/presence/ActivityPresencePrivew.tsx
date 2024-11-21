import { Tactivity, Tpractitioner } from '@/app/types/types'
import React, { useState } from 'react'
import PractitionerPreview from './ActivityPractitionersPreview'
import ActivityPractitionersList from './ActivityPractitionersList'

type ActivityPresencePrivewProps = {
    activity: Tactivity
    periodicAgendaId:string
    removePractitionerFromClientSideActivities : (email:string,activityId:string) => void

}

export default function ActivityPresencePrivew({removePractitionerFromClientSideActivities, activity ,periodicAgendaId }: ActivityPresencePrivewProps) {
  
    const timeOptions: Intl.DateTimeFormatOptions ={
        hour: '2-digit',       // Ensures 2-digit hour format
        minute: '2-digit',     // Ensures 2-digit minute format
        hour12: false 
    }
    const [startTime] = useState(new Date(activity?.hoursRange?.start).toLocaleTimeString('he-IL',timeOptions))
    const [endTime] = useState(new Date(activity?.hoursRange?.end).toLocaleTimeString('he-IL',timeOptions))
const ActivityPractitionersListProps ={
    practitioners:activity.practitioners,
    activity,
    periodicAgendaId,
    removePractitionerFromClientSideActivities
}
    return (
        <>
        
        <h3 className='name-of-class '> שיעור {activity.name} {" "} {startTime} - {endTime}</h3>
        <section className='presence-table grid'>
   
        {activity?.practitioners?.length?
        <ActivityPractitionersList {...ActivityPractitionersListProps}/>
       :
        <p className='full'>אין מתרגלים רשומים עדיין...</p>
        }


            
        </section>
            </>
        )
}