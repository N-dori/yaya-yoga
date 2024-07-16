import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

type PeriodDatesProps = {
    setEndPeriodicAgendaDate:(endDate:Date | null | undefined)=> void
    setStartPeriodicAgendaDate:(startDate:Date | null | undefined)=> void
    startPeriodicAgendaDate:Date | null | undefined
    endPeriodicAgendaDate:Date | null | undefined
    setPeriodicAgendaDates:(periodicAgendaDates:{start:string,end:string})=> void
    periodicAgendaDates: {start:string,end:string}
}

export default function PeriodDates({periodicAgendaDates
    ,setPeriodicAgendaDates, 
    startPeriodicAgendaDate,
    endPeriodicAgendaDate,setStartPeriodicAgendaDate,setEndPeriodicAgendaDate}: PeriodDatesProps) {
   
    const handelStartDateChange = (currDate: Date | null | undefined) => {
        console.log('start date is  : ', currDate?.toLocaleString().split(',')[0]);
        let startDate = currDate?.toLocaleString().split(',')[0] || ''
        setStartPeriodicAgendaDate(currDate)
      let  newPeriodicAgendaDates= {...periodicAgendaDates}
      newPeriodicAgendaDates.start=startDate
        setPeriodicAgendaDates({...newPeriodicAgendaDates});
    }

    const handelEndDateChange = (currDate: Date | null | undefined) => {
        console.log('start date is  : ', currDate?.toLocaleString().split(',')[0]);
        let endDate = currDate?.toLocaleString().split(',')[0] || ''
        setEndPeriodicAgendaDate(currDate)
      let  newPeriodicAgendaDates= {...periodicAgendaDates}
      newPeriodicAgendaDates.end=endDate
        setPeriodicAgendaDates({...newPeriodicAgendaDates});
    }

return (
    <section className='flex-col flex-start gap1'>
        <h4 className=' mb-1'> שלב 1 יצירת תקופת פעילות </h4>
        <label className='flex-jc-ac'>
            תאריך תחילת תקופה :
        <DatePicker
            selected={startPeriodicAgendaDate}
            onChange={handelStartDateChange}
            dateFormat={'dd/MM/yyyy'}
            // showIcon
        />
       
        </label>
        <label className='flex-jc-ac'>
            תאריך סוף תקופה :
        <DatePicker
            selected={endPeriodicAgendaDate}
            onChange={handelEndDateChange}
            dateFormat={'dd/MM/yyyy'}
            // showIcon
        />
       
        </label>

    </section>
)
}