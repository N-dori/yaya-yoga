'use client'
import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ActivityPresenceList from './ActivityPresenceList'
import { he } from 'date-fns/locale'

type ActivityPresenceIndexProps = {
    periodicAgenda:TperiodicAgenda
}

export default function ActivityPresenceIndex({periodicAgenda}: ActivityPresenceIndexProps) {
    const today = new Date()
    if (today.getDay() === 6) today.setDate(new Date().getDate() + 1)

    const [activities, setActivities] = useState<Tactivity[]>(periodicAgenda?.activities)
    const [currDate, setCurrDate] = useState<Date>(today)
    const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(null)
    const [startDate, setStartDate] = useState<Date >(new Date(periodicAgenda.date.start))
    const [endDate, setEndDate] = useState<Date >(new Date(periodicAgenda.date.end))
 
    const removePractitionerFromClientSideActivities = (email:string,activityId:string) => {

        const activityToUpdate = activities.find(act => act.id === activityId)
        const activityIndex = activities.findIndex(act => act.id === activityId)
        const index = activityToUpdate.practitioners.findIndex(practitioner=>practitioner.email === email)
        activityToUpdate.practitioners.splice(index,1)
        activities[activityIndex] = { ...activityToUpdate }
        const updatedActivities = [...activities]
        setActivities(updatedActivities)
    }
    const ActivityPresenceListProps = {
    currDate,
    periodicAgendaId:periodicAgenda._id,
    activities,
    removePractitionerFromClientSideActivities
   }
    return (
        <main className='presence-list-container flex-col flex-jc'>
                        <h1 className='healine tac'>דף נוכחות  </h1>

            <DatePicker
            selected={selectedDate}
            onChange={(currDate: Date | null) => setCurrDate(currDate)}
            dateFormat={'dd/MM/yyyy'}
            minDate={startDate ? startDate : undefined}
            maxDate={endDate ? endDate : undefined}
            placeholderText="הצג דף נוכחות לפי תאריך"
            showIcon
            locale={he}
            
            />
            <ActivityPresenceList {...ActivityPresenceListProps}/>

        </main>
)
}