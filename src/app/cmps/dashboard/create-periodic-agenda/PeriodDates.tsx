import React, { forwardRef, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { he } from 'date-fns/locale';
type PeriodDatesProps = {
    setEndPeriodicAgendaDate: (endDate: Date | null | undefined) => void
    setStartPeriodicAgendaDate: (startDate: Date | null | undefined) => void
    startPeriodicAgendaDate: Date | null | undefined
    endPeriodicAgendaDate: Date | null | undefined
    
    setPeriodicAgendaDates: (periodicAgendaDates: { start: string, end: string }) => void
    periodicAgendaDates: { start: string, end: string }
}

export default function PeriodDates({ periodicAgendaDates
    , setPeriodicAgendaDates,
    startPeriodicAgendaDate,
    endPeriodicAgendaDate, 
    setStartPeriodicAgendaDate,
     setEndPeriodicAgendaDate}: PeriodDatesProps) {
        
        const inputRef = useRef()

    const handelDateChange = (currDate: Date | null | undefined, startEnd: string) => {
        if (startEnd === 'start') setStartPeriodicAgendaDate(currDate)
        if (startEnd === 'end') setEndPeriodicAgendaDate(currDate)
        let formatedDate = currDate?.toLocaleString().split(',')[0] || ''

        let newPeriodicAgendaDates = { ...periodicAgendaDates }
        if (startEnd === 'start') newPeriodicAgendaDates.start = formatedDate
        if (startEnd === 'end') newPeriodicAgendaDates.end = formatedDate
        setPeriodicAgendaDates({ ...newPeriodicAgendaDates });
    }
 

    return (
        <section className='periodic-agenga-dates-container flex-col flex-jc-ac gap1'>
           <h1 className='headline tac mb-1'>יצירת לוז תקופתי </h1>
            <h4 className=' headline mb-1'> <span className="circle">שלב 1</span> יצירת תקופת פעילות </h4>
            <label className='flex-jc-ac'>
                תאריך תחילת תקופה :       </label>
                <DatePicker
                    selected={startPeriodicAgendaDate}
                    onChange={(currDate) => handelDateChange(currDate, 'start')}
                    dateFormat={'dd/MM/yyyy'}
                    showIcon
                    locale={he}
                />

     
            <label className='flex-jc-ac'>
                תאריך סוף תקופה : </label>
                <DatePicker
                    selected={endPeriodicAgendaDate}
                    onChange={(currDate) => handelDateChange(currDate, 'end')}
                    dateFormat={'dd/MM/yyyy'}
                    showIcon
                    locale={he}
                />

           

        </section>
    )
}