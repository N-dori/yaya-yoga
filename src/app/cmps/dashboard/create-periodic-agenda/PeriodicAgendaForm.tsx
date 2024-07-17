"use client"

import { handelPeriodicAgendaForm } from '@/app/actions/actions'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PeriodDates from './PeriodDates'
import { Tactivity, TperiodicAgenda } from '@/app/types/types'

type selectedDateInputProps = {

}

export default function PeriodicAgendaForm({ }: selectedDateInputProps) {
    //first 4 states realted to PeriodDates
    const [startPeriodicAgendaDate, setStartPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [endPeriodicAgendaDate, setEndPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [periodicAgendaDates, setPeriodicAgendaDates] = useState<{ start: string, end: string }>({ start: '', end: '' })
    const [isPeriodicAgendaDates, setIsPeriodicAgendaDates] = useState<boolean>(false)

    const [periodicAgenda, setPeriodicAgenda] = useState<TperiodicAgenda>()

    const [activityDate, setActivityDate] = useState<Date | null | undefined>(null)

    const [activityStartTime, setActivityStartTime] = useState<Date | null | undefined>(null)
    const [activityEndTime, setActivityEndTime] = useState<Date | null | undefined>(null)
    const [activityName, setActivityName] = useState<string>('אשטנגה')
    const [activityType, setActivityType] = useState<string>('שיעור')
    const [activityTeacher, setActivityTeacher] = useState<string>('יאיר שוורץ')
    const [activityLocation, setActivityLocation] = useState<string>('בית פעם רחוב הדקלים 92, פרדס חנה-כרכור')



    useEffect(() => {
        if (periodicAgendaDates.start && periodicAgendaDates.end) {
            addPeriodicAgendaDates()
            setIsPeriodicAgendaDates(!isPeriodicAgendaDates)
        }
    }, [periodicAgendaDates.start, periodicAgendaDates.end])

    const handelDateChange = (currDate: Date | null | undefined) => {
        console.log('selected date is  : ', currDate);
        setActivityDate(currDate)
    };
    const handelTimeChange = (currDate: Date | null | undefined,startEnd:string) => {
        console.log('selected time is  : ', currDate);
        if(startEnd === 'start')setActivityStartTime(currDate)
        if(startEnd === 'end')setActivityEndTime(currDate)

    };
    const addPeriodicAgendaDates = () => {
        let newPeriodicAgenda = {
            date: periodicAgendaDates,
            activities:[]
        }
        setPeriodicAgenda({ ...newPeriodicAgenda })
    }
    const addActivity = () => {
        let UpdatedPeriodicAgenda ={...periodicAgenda}

        const newActivity: Tactivity = {
            date: activityDate?.toLocaleString().split(',')[0] || '',
            name: activityName,
            hoursRange: {
                start: activityStartTime?.toLocaleString().split(',')[0] || '',
                end: activityEndTime?.toLocaleString().split(',')[0] || '',
            },
            classOrWorkshop: activityType,
            teacher: activityTeacher,
            location: activityLocation,
            practitioners: []

        }
        UpdatedPeriodicAgenda.activities?.push({...newActivity})
        resetDateTime()
        console.log('UpdatedPeriodicAgenda',UpdatedPeriodicAgenda);
        
    }
 const resetDateTime =() => {
    setActivityDate(null)
    setActivityStartTime(null)
    setActivityEndTime(null)
 }
    const createNewPeriodicAgenda = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/periodicAgenda', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(periodicAgendaDates)
            })
            if (res.ok) {
                const { periodicAgenda } = await res.json()

                console.log('created a new Periodic Agenda', periodicAgenda)

            } else {
                throw new Error('faild to create a new periodic Agenda')
            }

        } catch (err) {
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
                    <h4>{periodicAgendaDates.start + " עד " + periodicAgendaDates.end}</h4>

                </div>
                <form className='periodic-agenda-form flex-col gap1' action={handelPeriodicAgendaForm}>
                    <label className='flex-col mb-1'>
                        תאריך הפעילות :
                        <DatePicker
                            selected={activityDate}
                            onChange={handelDateChange}
                            dateFormat={'dd/MM/yyyy'}
                            showIcon />
                    </label>
                    <label className='flex-col mb-1'>
                        שעת תחילת הפעילות :
                        <DatePicker
                            selected={activityStartTime}
                            onChange={(curtime)=>handelTimeChange(curtime,'start')}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="hh:mm aa"
                        />
                    </label>
                    <label className='flex-col mb-1'>
                        שעת סיום הפעילות :
                        <DatePicker
                            selected={activityEndTime}
                            onChange={(curtime)=>handelTimeChange(curtime,'end')}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="hh:mm aa"
                        />
                    </label>

                    <label htmlFor={'name'} className='flex-col'>
                        שם הפעילות:

                        <select name='name' onChange={(e) => setActivityName(e.target.value)} value={'אשטנגה'} >
                            <option value={'אשטנגה'}>אשטנגה</option>
                            <option value={'יסודות'}>יסודות</option>
                            <option value={'108 ברכות שמש'}>108 ברכות שמש</option>
                            <option value={'סדנא'}>סדנא...</option>
                        </select>

                    </label>

                    <label htmlFor='activity-type' className='flex-col'>
                        סוג הפעילות:
                        <select name='activity-type' onChange={(e) => setActivityType(e.target.value)} value={'שיעור'} >
                            <option value={'סדנא'}>שיעור</option>
                            <option value={'סדנא'}>סדנא</option>
                        </select>
                    </label>

                    <label className='flex-col'>
                        מורה :
                        <input name='teacher' onChange={(e) => setActivityTeacher(e.target.value)} value={'יאיר שוורץ'} />
                    </label>
                    <label className='flex-col'>
                        מיקום :
                        <input name='location' onChange={(e) => setActivityLocation(e.target.value)} value={'בית פעם רחוב הדקלים 92, פרדס חנה-כרכור'} />
                    </label>

                    <button type='button' onClick={addActivity}>הוסף פעילות </button>
                    <button type='submit'>סיים ופרסם לוז תקופתי</button>
                </form>
            </main>

    )
}