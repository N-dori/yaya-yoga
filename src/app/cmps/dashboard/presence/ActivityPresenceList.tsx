"use client"
import { Tactivity } from '@/app/types/types'
import { stripTime } from '@/app/utils/util'
import React, { useEffect, useState } from 'react'
import ActivityPresencePrivew from './ActivityPresencePrivew'

type PresenceListProps = {
    activities: Tactivity[] | undefined
    periodicAgendaId: string
    currDate:Date
    removePractitionerFromClientSideActivities : (email:string,activityId:string) => void
}

export default function ActivityPresenceList({removePractitionerFromClientSideActivities, currDate,activities, periodicAgendaId }: PresenceListProps) {
  
    const [activitiesToDisplay, setActivitiesToDisplay] = useState<Tactivity[]>()

    useEffect(() => {

        getActivities()

    }, [currDate])


    const getActivities = () => {
        let activitiesToDisplay: Tactivity[] = []
        if (activities) {
            activities.forEach(activity => {
                if (stripTime(activity.date).getTime() === stripTime(currDate).getTime()) {
                    activitiesToDisplay.push(activity)
                }
            })
        }
        if (activitiesToDisplay) {
            setActivitiesToDisplay([...activitiesToDisplay])
        }

    }
    return (
        <section className='presence-list-wapper'>
      
            <p className='title-date gc1 flex-jc-ac'>תאריך : {new Date(currDate).toLocaleDateString('he-IL')}</p>

            {activitiesToDisplay?.length ? activitiesToDisplay.map(activity =>
                <ActivityPresencePrivew 
                key={activity.id} 
                activity={activity} 
                periodicAgendaId={periodicAgendaId}
                removePractitionerFromClientSideActivities={removePractitionerFromClientSideActivities} />)
                : <p className='flex-jc-ac'>לוח זמנים לא קיים</p>}



        </section>
    )
}