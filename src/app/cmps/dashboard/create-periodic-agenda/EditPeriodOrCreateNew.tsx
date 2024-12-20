import React, { useState } from 'react'
import PeriodDates from './PeriodDates'

type EditPeriodOrCreateNewProps = {
    setEndPeriodicAgendaDate: (endDate: Date | null | undefined) => void
    setStartPeriodicAgendaDate: (startDate: Date | null | undefined) => void
    startPeriodicAgendaDate: Date | null | undefined
    endPeriodicAgendaDate: Date | null | undefined
    
    setPeriodicAgendaDates: (periodicAgendaDates: { start: string, end: string }) => void
    periodicAgendaDates: { start: string, end: string }
    handelEditMode:()=>void
}

export default function EditPeriodOrCreateNew(props: EditPeriodOrCreateNewProps) {
    
    const [isCreateNewPeriodMode, setisCreateNewPeriodMode] = useState(false)
    const PeriodDatesProps = {
        setStartPeriodicAgendaDate:props.setStartPeriodicAgendaDate,
        setEndPeriodicAgendaDate:props.setEndPeriodicAgendaDate,
        startPeriodicAgendaDate:props.startPeriodicAgendaDate,
        endPeriodicAgendaDate:props.endPeriodicAgendaDate,
        setPeriodicAgendaDates:props.setPeriodicAgendaDates,
        periodicAgendaDates:props.periodicAgendaDates
    }
    return (
        isCreateNewPeriodMode ? <PeriodDates {...PeriodDatesProps} />
            :
            <section className='edit-or-create-new flex-col flex-jc-ac' >
                <button type='button' className='btn' onClick={()=>setisCreateNewPeriodMode(true)} > ליצירה של תקופת פעילות חדשה</button>
              
                <button type='button' className='btn' onClick={props.handelEditMode} >לעריכה של תקופת פעילות נוכחית</button>

            </section>
    )
}