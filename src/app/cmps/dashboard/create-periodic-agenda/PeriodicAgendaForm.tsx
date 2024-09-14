import React, {  useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { StartEndTimePickers } from './StartEndTimePickers'
import { he } from 'date-fns/locale';
import CheckSvg from '@/app/assets/svgs/CheckSvg'
import RepeatingActivityRadioBtns from './RepeatingActivityRadioBtns'

type PeriodicAgendaFromProps = {
    activityEndTime: Date | null | undefined
    activityStartTime: Date | null | undefined
    handelTimeChange: (currDate: Date | null | undefined, startEnd: string) => void
    error: string

    activityDate: Date | null | undefined

    isActivityRepeating: boolean
    repeationNumber: number
    handelDateChange: (date: Date | null | undefined) => void
    setIsActivityRepeating: (isRepeating: boolean) => void
    setRrepeationNumber: (num: number) => void
    activityName: string
    setActivityName: (name: string) => void
    activityType: string
    setActivityType: (type: string) => void
    activityTeacher: string
    setActivityTeacher: (teacher: string) => void
    activityLocation: string
    setActivityLocation: (location: string) => void

    setIsPreviewDisplayShown: (b: boolean) => void
    createNewPeriodicAgenda: () => void
    addActivity: () => void
    removeSaturdays: () => void

    periodicAgendaDates: { start: string, end: string }
    startPeriodicAgendaDate: Date | null | undefined
    endPeriodicAgendaDate: Date | null | undefined
    datesCounter: number
    periodLength: number | undefined
    allDaysOfPeriod: Date[] | undefined
   

}

export default function PeriodicAgendaFrom({
    activityStartTime,
    activityEndTime,
    periodicAgendaDates,
    startPeriodicAgendaDate,
    endPeriodicAgendaDate,

    activityDate,
    activityName,
    setActivityName,
    activityType,
    setActivityType,
    activityTeacher,
    setActivityTeacher,
    activityLocation,
    setActivityLocation,
    isActivityRepeating,
    setIsActivityRepeating,
    repeationNumber,
    setRrepeationNumber,
    handelDateChange,
    handelTimeChange,

    setIsPreviewDisplayShown,
    createNewPeriodicAgenda,
    addActivity,
    removeSaturdays,
    datesCounter,
    periodLength,
    allDaysOfPeriod,

 
    error,



}: PeriodicAgendaFromProps) {
    const [options, setOptions] = useState<string[]>(['אשטנגה','108 ברכות שמש','יסודות'])
    const RepeatingActivityRadioBtnsProps = {
        isActivityRepeating,
        setIsActivityRepeating,
        setRrepeationNumber,
        repeationNumber,
        removeSaturdays
    }
 
    const StartEndTimePickersProps = {
        activityEndTime,
        handelTimeChange,
        activityStartTime,
        error,

    }


    return (
        <main className='periodic-agenda-form-container'>
            <div className='range-dates flex-jc-ac flex-col gap1 '>
                <h4 >  <span className='circle mb-1'> שלב 2</span> יצירת פעילויות לתקופה </h4>
                <h4>{periodicAgendaDates.start + " עד " + periodicAgendaDates.end}</h4>
                <progress className='progress-bar' value={datesCounter} max={periodLength}>  </progress>
                {
                    allDaysOfPeriod ? allDaysOfPeriod.length ? <span>נשארו  {allDaysOfPeriod ? allDaysOfPeriod.length : ''} תאריכים למלא מתוך {periodLength}</span>
                        : <span className='all-dates-checked flex-jc-ac'> <CheckSvg /> פעילויות הוזנו לכל תקופת הפעילות</span> : ""
                }

            </div>
            <form className='periodic-agenda-form flex-col gap1' >
                <div className='flex-col gap1 flex-jc-ac'>
                    <DatePicker
                        selected={activityDate}
                        onChange={(currDate:Date|null) => handelDateChange(currDate)}
                        dateFormat={'dd/MM/yyyy'}
                        minDate={startPeriodicAgendaDate ? startPeriodicAgendaDate : undefined}
                        maxDate={endPeriodicAgendaDate ? endPeriodicAgendaDate : undefined}
                        placeholderText="בחר את תאריך הפעילות"
                        showIcon
                        locale={he}

                    />
                    <StartEndTimePickers {...StartEndTimePickersProps} />

                </div>
                <RepeatingActivityRadioBtns {...RepeatingActivityRadioBtnsProps} />

                <label htmlFor={'activity-name'} className='flex-col'>
                    שם הפעילות:
                   <input id={'activity-name'}
                     type={'text'}
                     list='options'
                    
                     onChange={(ev:any)=>setActivityName(ev.target.value)}
                   />
                 
                    <datalist id="options">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
             

              </label>

                <label htmlFor='activity-type' className='flex-col'>
                    סוג הפעילות:
                    <select className='form-input' name='activity-type' onChange={(e) =>
                        setActivityType(e.target.value)} value={activityType} >
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
                <button className='form-btn flex-jc-ac' type='button' onClick={createNewPeriodicAgenda}>סיים ופרסם לוז תקופתי</button>
            </form>
          
        </main>)
}