"use client"

import { handelPeriodicAgendaForm } from '@/app/actions/actions'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PeriodDates from './PeriodDates'

type selectedDateInputProps = {

}

export default function PeriodicAgendaForm({ }: selectedDateInputProps) {

    const [startPeriodicAgendaDate, setStartPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [endPeriodicAgendaDate, setEndPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [periodicAgendaDates, setPeriodicAgendaDates] = useState<{ start: string, end: string }>({ start: '', end: '' })
    const [isPeriodicAgendaDates, setIsPeriodicAgendaDates] = useState<boolean>(false)

    const [selectedDate, setSelectedDate] = useState('')
    const [startTime, setStartTime] = useState('')
    useEffect(() => {
        if (periodicAgendaDates.start && periodicAgendaDates.end) {
            createNewPeriodicAgenda()
            setIsPeriodicAgendaDates(!isPeriodicAgendaDates)
        }
    }, [periodicAgendaDates.start, periodicAgendaDates.end])

    const handelDateChange = (currDate: Date | null | undefined) => {
        console.log('selected date is  : ', currDate?.toLocaleString().split(',')[0]);
        let selectedDate = currDate?.toLocaleString().split(',')[0] || ''
        let startTime = currDate?.toLocaleString().split(',')[1] || ''
        setSelectedDate(selectedDate)
        setStartTime(startTime)

    };
    const createNewPeriodicAgenda =async () => {
          try{
            const res = await fetch('http://localhost:3000/api/periodicAgenda',{
                method:'POST',
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(periodicAgendaDates)
              })
              if(res.ok){
                console.log('created a new Periodic Agenda');
                
              }else{
                throw new Error ('faild to create a new periodic Agenda')
              }
    
        }catch(err){
            console.log(err);
            
        }
    }
    const PeriodDatesProps = {
        setStartPeriodicAgendaDate,
        setEndPeriodicAgendaDate,
        startPeriodicAgendaDate,
        endPeriodicAgendaDate,
        setPeriodicAgendaDates,
        periodicAgendaDates
    }
    return (
        !isPeriodicAgendaDates ?
            <PeriodDates {...PeriodDatesProps} />
            :
         <main className='periodic-agenda-form-container'>
         <div className='flex-jc-ac flex-col mb-1'>
         <h4> שלב 2 יצירת פעילויות לתקופה </h4>
         <h4>{periodicAgendaDates.start+" עד "+ periodicAgendaDates.end}</h4>
         
         </div>
          <form className='periodic-agenda-form' action={handelPeriodicAgendaForm}>
                <label className='flex-col mb-1'>
                    תאריך ושעת הפעילות :
                <DatePicker
                    selected={null}
                    onChange={handelDateChange}
                    dateFormat={'MM/dd/yyyy; hh:mm'}
                    showTimeSelect
                    timeIntervals={30}
                    timeFormat='hh:mm'
                    showIcon
                />
                </label>
                <input name={'startPeriodDates'} readOnly type='text' className='date-picker-values' value={periodicAgendaDates.start} />
                <input name={'endPeriodDates'} readOnly type='text' className='date-picker-values' value={periodicAgendaDates.end} />
                <input name={'date'} readOnly type='text' className='date-picker-values' value={selectedDate} />
                <input name={'time'} readOnly type='text' className='date-picker-values' value={startTime} />
                <label htmlFor={'name'} className='flex-col'>
                    שם הפעילות:

                    <select name='name' defaultValue={'אשטנגה'} >
                        <option value={'אשטנגה'}>אשטנגה</option>
                        <option value={'יסודות'}>יסודות</option>
                        <option value={'108 ברכות שמש'}>108 ברכות שמש</option>
                        <option value={'סדנא'}>סדנא...</option>
                    </select>

                </label>

                <label htmlFor='activity-type' className='flex-col'>
                    סוג הפעילות:
                    <select name='activity-type' defaultValue={'שיעור'} >
                        <option value={'סדנא'}>שיעור</option>
                        <option value={'סדנא'}>סדנא</option>
                    </select>
                </label>
                <label className='flex-col'>
                    משך הפעילות בדקות:
                    <select name='duration' defaultValue={'60'} >
                        <option value={'60'}>60</option>
                        <option value={'90'}>90</option>
                        <option value={'30'}>30</option>
                    </select>
                </label>

                <label className='flex-col'>
                    מורה :
                    <input name='teacher' defaultValue={'יאיר שוורץ'} />
                </label>
                <label className='flex-col'>
                    מיקום :
                    <input name='location' defaultValue={'בית פעם רחוב הדקלים 92, פרדס חנה-כרכור'} />
                </label>

                <button type='submit'>הוסף פעילות </button>
            </form>
         </main>
           
    )
}