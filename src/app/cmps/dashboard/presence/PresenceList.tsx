"use client"
import { Tactivity } from '@/app/types/types'
import { stripTime } from '@/app/utils/util'
import React, { useEffect, useState } from 'react'
import PresencePrivew from './PresencePreview'

type PresenceListProps = {
    activities:Tactivity[]|undefined
}

export default function PresenceList({activities}: PresenceListProps) {
    const [currDate, setCurrDate] = useState<Date>(new Date())
    const [activitiesToDisplay, setActivitiesToDisplay] = useState<Tactivity[]>()

    useEffect(() => {
      
        getActivities()
   
    }, [])
    

    const getActivities = () => {
        let activitiesToDisplay:Tactivity[] =[]
        if(activities){
            activities.forEach(activity => {
                if (stripTime(activity.date).getTime() === stripTime(currDate).getTime()) {
                    activitiesToDisplay.push(activity)
                  } 
            })
        }
        if(activitiesToDisplay){
            setActivitiesToDisplay([...activitiesToDisplay])
        }

    }
  return (
    <main className='presence-list-container'>
            <h1 className='healine tac'>דף נוכחות  </h1>
            <p className='title-date gc1 flex-jc-ac'>תאריך : {new Date(currDate).toLocaleDateString('he-IL')}</p>
            
            {activitiesToDisplay?.length?activitiesToDisplay.map(activity=>
                <PresencePrivew key={activity.id} activity={activity}/>)
                :<p className='flex-jc-ac'>לוח זמנים לא קיים</p>}
            
                

    </main>
  )
}