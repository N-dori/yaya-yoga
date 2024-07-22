"use client"

import { handelPeriodicAgendaForm } from '@/app/actions/actions'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PeriodDates from './PeriodDates'
import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import UserMsg from '../../UserMsg'
import PeriodicAgendaPreviewDisplay from './PeriodicAgendaPreviewDisplay'
import { StartEndTimePickers } from './StartEndTimePickers'
import { he } from 'date-fns/locale';
import { strict } from 'assert'
import CheckSvg from '@/app/assets/svgs/CheckSvg'
import { makeId } from '@/app/util'
type selectedDateInputProps = {

}

export default function PeriodicAgendaForm({ }: selectedDateInputProps) {
    //first 4 states realted to PeriodDates
    const [startPeriodicAgendaDate, setStartPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [endPeriodicAgendaDate, setEndPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [periodicAgendaDates, setPeriodicAgendaDates] = useState<{ start: string, end: string }>({ start: '', end: '' })
    const [isPeriodicAgendaDates, setIsPeriodicAgendaDates] = useState<boolean>(false)

    const [allDaysOfPeriod, setAllDaysOfPeriod] = useState<Date[]>()
    const [periodLength, setPeriodLength] = useState<number>()
    const [datesCounter, setDatesCounter] = useState<number>(0)

    const [periodicAgenda, setPeriodicAgenda] = useState<TperiodicAgenda>()

    const [activityDate, setActivityDate] = useState<Date | null | undefined>(null)

    const [activityStartTime, setActivityStartTime] = useState<Date | null | undefined>(null)
    const [activityEndTime, setActivityEndTime] = useState<Date | null | undefined>(null)
    const [activityName, setActivityName] = useState<string>('אשטנגה')
    const [activityType, setActivityType] = useState<string>('שיעור')
    const [activityTeacher, setActivityTeacher] = useState<string>('יאיר שוורץ')
    const [activityLocation, setActivityLocation] = useState<string>('בית פעם רחוב הדקלים 92, פרדס חנה-כרכור')

    const [isPreviewDisplayShown, setIsPreviewDisplayShown] = useState<boolean>(false)
    const [isMsgShown, setIsMsgShown] = useState<boolean>(false)
    const [userMsg, setUserMsg] = useState('')

    const [error, setError] = useState<string>('')
    useEffect(() => {

    }, [datesCounter])

    useEffect(() => {
        if (startPeriodicAgendaDate && endPeriodicAgendaDate) {
            getAllDaysOfPeriod(startPeriodicAgendaDate, endPeriodicAgendaDate)
        }
    }, [startPeriodicAgendaDate, endPeriodicAgendaDate])

    useEffect(() => {
        if (periodicAgendaDates.start && periodicAgendaDates.end) {
            if (!isPreviewDisplayShown) {
                addPeriodicAgendaDates()
                setIsPeriodicAgendaDates(true)
            }

        }
    }, [periodicAgendaDates.start, periodicAgendaDates.end])


    const getAllDaysOfPeriod = (startPeriodicAgendaDate: Date, endPeriodicAgendaDate: Date) => {
        let dates = [];
        let currentDate = new Date(startPeriodicAgendaDate);

        // Ensure endDate is at least one day after startDate
        endPeriodicAgendaDate = new Date(endPeriodicAgendaDate);
        endPeriodicAgendaDate.setDate(endPeriodicAgendaDate.getDate() + 1);

        while (currentDate < endPeriodicAgendaDate) {
            dates.push(new Date(currentDate)); // Add currentDate to the array
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
        console.log('all Days Of Period length', dates.length);

        setAllDaysOfPeriod(dates)
        setPeriodLength(dates.length)

    }

    const stripTime = (date: Date) => {
        const date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        // console.log('stripTime', date1);

        return date1;
    };
    const chackDateInPeriod = (dateToChack: Date) => {
        if (allDaysOfPeriod) {
            console.log('chacking if Date is part of Period', allDaysOfPeriod);

            const index = allDaysOfPeriod.findIndex(date => stripTime(date).getTime() === stripTime(dateToChack).getTime());
            if (index !== -1) {
                return true
            } else {
                return false
            }
        }

    }
    const handelDateChange = (currDate: Date | null | undefined) => {
        setActivityDate(currDate);
    };

    const handelTimeChange = (currDate: Date | null | undefined, startEnd: string) => {
        console.log('selected time is  : ', new Date(currDate ? currDate : '').getHours());
        if (currDate) {
            const time = new Date(currDate);
            if (!isNaN(time.getTime())) {
                if (startEnd === 'start') {
                    if (activityEndTime && time) {
                        console.log('hi');
                        const isValid = chackTimeValid(new Date(time).getTime(), new Date(activityEndTime).getTime())
                        if (isValid) {
                            setActivityStartTime(currDate)
                        } else {
                            setActivityStartTime(null)
                            setError('זמן ההתחלה חייב להיות לפני זמן  הסיום')
                            setTimeout(() => { setError('') }, 7500);

                            return
                        }
                    } else {
                        setActivityStartTime(currDate)
                    }
                }
                if (startEnd === 'end') {
                    if (activityStartTime && time) {
                        const isValid = chackTimeValid(new Date(activityStartTime).getTime(), new Date(time).getTime())
                        if (isValid) {
                            setActivityEndTime(currDate)
                        } else {
                            setActivityEndTime(null)
                            setError('זמן ההתחלה חייב להיות לפני זמן הסיום')
                            setTimeout(() => { setError('') }, 7500);
                            return
                        }
                    } else {
                        setActivityEndTime(currDate)
                    }
                }
            }
        }
    }

    const chackTimeValid = (startTime: number, endTime: number) => {
        if (startTime && endTime) {
            return startTime < endTime ? true : false
        }

    }
    const addPeriodicAgendaDates = () => {
        let newPeriodicAgenda = {
            date: periodicAgendaDates,
            activities: []
        }
        setPeriodicAgenda({ ...newPeriodicAgenda })
    }
    const addActivity = () => {
        let UpdatedPeriodicAgenda = { ...periodicAgenda }
        if (!activityDate || !activityStartTime || !activityEndTime) {
            setError('חיב למלא את כל השדות ')
            callUserMsg('הוספת פעילות נכשלה')
            setTimeout(() => { setError('') }, 5500);
            return
        }
        const newActivity: Tactivity = {
            id:makeId(),
            date: activityDate,
            name: activityName,
            hoursRange: {
                start: activityStartTime,
                end: activityEndTime
            },
            classOrWorkshop: activityType,
            teacher: activityTeacher,
            location: activityLocation,
            practitioners: []

        }
        UpdatedPeriodicAgenda.activities?.push({ ...newActivity })
        resetDateTime()
        callUserMsg('פעילות נוספה בהצלחה')
        const isFound = chackDateInPeriod(activityDate)
        console.log(`is ${activityDate} found in dates range of curr period`, isFound);

        if (isFound) {
            setDatesCounter(datesCounter + 1)
            const index = allDaysOfPeriod?.findIndex(date => stripTime(date).getTime() === stripTime(activityDate).getTime())
            if (index || index === 0) allDaysOfPeriod?.splice(index, 1)
        }
        console.log('UpdatedPeriodicAgenda', UpdatedPeriodicAgenda);
        console.log('all Days Of Period after reducing', allDaysOfPeriod?.length);

    }
    const callUserMsg = (msg: string) => {
        window.scroll(0, 0)
        setIsMsgShown(true)
        setUserMsg(msg)
    }
    const resetDateTime = () => {
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
    const PreviewDisplayProps = {
        setIsPreviewDisplayShown,
        periodicAgenda,
        isPreview: true
    }
    const userMsgProps = {
        userMsg,
        setIsMsgShown,
        isMsgShown
    }
    const StartEndTimePickersProps = {
        activityEndTime,
        handelTimeChange,
        activityStartTime,
        error,

    }
    return (
        !isPeriodicAgendaDates ?
            <PeriodDates {...PeriodDatesProps} />
            :
            isPreviewDisplayShown ?
                <PeriodicAgendaPreviewDisplay {...PreviewDisplayProps} />
                :
                <main className='periodic-agenda-form-container'>
                    <div className='range-dates flex-jc-ac flex-col gap1 '>
                        <h4 >  <span className='circle mb-1'> שלב 2</span> יצירת פעילויות לתקופה </h4>
                        <h4>{periodicAgendaDates.start + " עד " + periodicAgendaDates.end}</h4>
                        <progress className='progress-bar' value={datesCounter} max={periodLength}>  </progress>
                        {
                            allDaysOfPeriod ? allDaysOfPeriod.length ?  <span>נשארו  {allDaysOfPeriod ? allDaysOfPeriod.length : ''} תאריכים למלא מתוך {periodLength}</span>
                                            :<span className='all-dates-checked flex-jc-ac'> <CheckSvg/> פעילויות הוזנו לכל תקופת הפעילות</span>:""
                        }

                    </div>
                    <form className='periodic-agenda-form flex-col gap1' action={handelPeriodicAgendaForm}>
                        <div className='flex-col gap1 flex-jc-ac'>
                            <DatePicker
                                selected={activityDate}
                                onChange={(currDate) => handelDateChange(currDate)}
                                dateFormat={'dd/MM/yyyy'}
                                minDate={startPeriodicAgendaDate ? startPeriodicAgendaDate : undefined}
                                maxDate={endPeriodicAgendaDate ? endPeriodicAgendaDate : undefined}
                                placeholderText="בחר את תאריך הפעילות"
                                showIcon
                                locale={he}

                            />
                            <StartEndTimePickers {...StartEndTimePickersProps} />

                        </div>
                        <label htmlFor={'name'} className='flex-col'>
                            שם הפעילות:

                            <select className='form-input' name='name' onChange={(e) => setActivityName(e.target.value)} value={activityName} >
                                <option value={'אשטנגה'}>אשטנגה</option>
                                <option value={'יסודות'}>יסודות</option>
                                <option value={'108 ברכות שמש'}>108 ברכות שמש</option>
                            </select>

                        </label>

                        <label htmlFor='activity-type' className='flex-col'>
                            סוג הפעילות:
                            <select className='form-input' name='activity-type' onChange={(e) => setActivityType(e.target.value)} value={activityType} >
                                <option value={'שיעור'}>שיעור</option>
                                <option value={'סדנא'}>סדנא</option>
                            </select>
                        </label>

                        <label className='flex-col'>
                            מורה :
                            <input className='form-input' name='teacher' onChange={(e) => setActivityTeacher(e.target.value)} value={activityTeacher} />
                        </label>
                        <label className='flex-col'>
                            מיקום :
                            <input className='form-input' name='location' onChange={(e) => setActivityLocation(e.target.value)} value={activityLocation} />
                        </label>

                        <button className='form-btn flex-jc-ac' type='button' onClick={addActivity}>הוסף פעילות </button>
                        <button className='form-btn flex-jc-ac' type='button' onClick={() => setIsPreviewDisplayShown(true)}> תצוגה מקדימה</button>
                        <button className='form-btn flex-jc-ac' type='submit'>סיים ופרסם לוז תקופתי</button>
                    </form>
                    <UserMsg {...userMsgProps} />
                </main>

    )
}