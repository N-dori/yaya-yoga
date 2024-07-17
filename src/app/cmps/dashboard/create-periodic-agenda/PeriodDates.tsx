import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

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
    endPeriodicAgendaDate, setStartPeriodicAgendaDate, setEndPeriodicAgendaDate }: PeriodDatesProps) {


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
        <section className='flex-col flex-start gap1'>
            <h4 className=' mb-1'> שלב 1 יצירת תקופת פעילות </h4>
            <label className='flex-jc-ac'>
                תאריך תחילת תקופה :
                <DatePicker
                    selected={startPeriodicAgendaDate}
                    onChange={(currDate) => handelDateChange(currDate, 'start')}
                    dateFormat={'dd/MM/yyyy'}
                    showIcon
                />

            </label>
            <label className='flex-jc-ac'>
                תאריך סוף תקופה :
                <DatePicker
                    selected={endPeriodicAgendaDate}
                    onChange={(currDate) => handelDateChange(currDate, 'end')}
                    dateFormat={'dd/MM/yyyy'}
                    showIcon
                />

            </label>

        </section>
    )
}