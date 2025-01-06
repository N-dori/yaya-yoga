import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { StartEndTimePickers } from './StartEndTimePickers'
import { he } from 'date-fns/locale';
import CheckSvg from '@/app/assets/svgs/CheckSvg'
import RepeatingActivityRadioBtns from './RepeatingActivityRadioBtns'
import { getFormattedDate } from '@/app/utils/util';
import { TperiodicAgenda } from '@/app/types/types';

type PeriodicAgendaFromProps = {
    periodicAgenda:TperiodicAgenda
    isEditCurrPeriodicAgenda:boolean

    activityEndTime: Date | null | undefined
    activityStartTime: Date | null | undefined
    handelTimeChange: (currDate: Date | null | undefined, startEnd: string) => void
    error: string

    activityDate: Date | null | undefined
    img: string, setImg: (imgString: string) => void
    imgLink: string, setImgLink: (imgLink: string) => void
    imgPreview: string, setImgPreview: (imgPreview: string) => void

    workshopTitle: string, setWorkshopTitle: (workshopTitle: string) => void,
    workshopSubTitle: string, setWorkshopSubTitle: (workshopSubTitle: string) => void,
    workshopDesc: string, setWorkshopDesc: (workshopDesc: string) => void,
    price:string|number,
    setPrice:(num:string|number)=>void
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
    removeSaturdays?: () => void

    periodicAgendaDates: { start: string, end: string }
    startPeriodicAgendaDate: Date | null | undefined
    endPeriodicAgendaDate: Date | null | undefined
    datesCounter: number
    periodLength: number | undefined
    allDaysOfPeriod: Date[] | undefined
    lastDateForRegistration: Date,
    setLastDateForRegistration: (date: Date) => void

}

export default function PeriodicAgendaFrom(props: PeriodicAgendaFromProps) {
    const [options] = useState<string[]>(['אשטנגה', 'פראניאמה + אשטנגה', '108 ברכות שמש', 'ויניאסה', 'יסודות', 'האטה יוגה', 'פראניאמה'])

 
    const RepeatingActivityRadioBtnsProps = {
        isActivityRepeating: props.isActivityRepeating,
        setIsActivityRepeating: props.setIsActivityRepeating,
        setRrepeationNumber: props.setRrepeationNumber,
        repeationNumber: props.repeationNumber,
        removeSaturdays: props.removeSaturdays
    }

    const StartEndTimePickersProps = {
        activityEndTime: props.activityEndTime,
        handelTimeChange: props.handelTimeChange,
        activityStartTime: props.activityStartTime,
        error: props.error,

    }
   

    const handelImgInput = (ev: any) => {
        const file = ev.target.files[0]
        let imgName = file.name // טלי.png
        let imgLink = `https://yayayoga.s3.eu-north-1.amazonaws.com/Workshop-images/${imgName}`

        // Validate the file (e.g., type or size)
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5 MB limit
            alert('ישנה אפרות להעלות קביצים במגבלה של עד 5 מגה');
            return;
        }
        props.setImg(file)
        props.setImgLink(imgLink)
        const reader = new FileReader();
        reader.onload = () => {
            props.setImgPreview(reader.result as string); // Base64 preview
        };
        reader.readAsDataURL(file);
    }
    return (
        <main className='periodic-agenda-form-container'>
            <div className='range-dates flex-jc-ac flex-col gap1 '>
                <h4 >  <span className='circle mb-1'> שלב 2</span> {props.isEditCurrPeriodicAgenda?'עריכת פעילויות לתקופה':'יצירת פעילויות לתקופה'} </h4>
                <h4>{getFormattedDate(props.periodicAgenda.date.start) + " עד " + getFormattedDate(props.periodicAgenda.date.end)}</h4>
               {!props.isEditCurrPeriodicAgenda?
               <section className='flex-jc-ac flex-col gap1'>
                
                <progress className='progress-bar' value={props.datesCounter} max={props.periodLength}>  </progress>
                 {
                     props.allDaysOfPeriod ? 
                     props.allDaysOfPeriod.length ? 
                     <span>נשארו  {props.allDaysOfPeriod ? props.allDaysOfPeriod.length : ''} תאריכים למלא מתוך {props.periodLength}</span>
                     : <span className='all-dates-checked flex-jc-ac'> <CheckSvg /> פעילויות הוזנו לכל תקופת הפעילות</span> : ""
                    }
                    </section>:
                    <p>  הוספת פעילויות  +</p>}

            </div>
            <form className='periodic-agenda-form flex-col gap1' >
                <div className='flex-col gap1 flex-jc-ac'>
                    <DatePicker
                        selected={props.activityDate}
                        onChange={(currDate: Date | null) => props.handelDateChange(currDate)}
                        dateFormat={'dd/MM/yyyy'}
                        minDate={props.startPeriodicAgendaDate ? props.startPeriodicAgendaDate : undefined}
                        maxDate={props.endPeriodicAgendaDate ? props.endPeriodicAgendaDate : undefined}
                        placeholderText="בחר את תאריך הפעילות"
                        showIcon
                        locale={he}

                    />
                    <StartEndTimePickers {...StartEndTimePickersProps} />

                </div>
                <label htmlFor='activity-type' className='flex-col'>
                    סוג הפעילות:
                    <select className='form-input' name='activity-type' onChange={(e) =>
                        props.setActivityType(e.target.value)} value={props.activityType} >
                        <option value={'שיעור'}>שיעור</option>
                        <option value={'סדנא'}>סדנא</option>
                    </select>
                </label>
                {props.activityType === 'סדנא' &&
                    <fieldset className='fieldset-form p-1 flex-col '>
                        <legend>פרטי הסדנא</legend>
                        <label className='flex-col'>
                            כותרת :
                            <input className='form-input' name='workshop-title' onChange={(e) => props.setWorkshopTitle(e.target.value)} value={props.workshopTitle} />
                        </label>
                        <label className='flex-col'>
                            תת כותרת:
                            <input className='form-input' name='workshop-title' onChange={(e) => props.setWorkshopSubTitle(e.target.value)} value={props.workshopSubTitle} />
                        </label>

                        {props.imgPreview && (
                            <div>
                                <p className='mb-1'>תמונה שנבחרה</p>
                                <img src={props.imgPreview} alt="Preview" style={{ maxWidth: '300px' }} />
                            </div>
                        )}
                        <div className=' flex-col'>
                            <input className='input-select-img' id='select-img' type='file' accept="image/*" name='select-img'
                                onChange={(e: any) => handelImgInput(e)} />

                            <label className='custom-input-select-img btn tac' htmlFor='select-img'
                            >{'לחץ לבחירת תמונה'}</label>
                        </div>
                        <DatePicker
                        selected={props.lastDateForRegistration}
                        onChange={(currDate: Date | null) => props.setLastDateForRegistration(currDate)}
                        dateFormat={'dd/MM/yyyy'}
                        placeholderText="תאריך אחרון להרשמה"
                        showIcon
                        locale={he}

                    />
                        <small>להפרדת הטקסט לפסקאות הוסף /</small>
                        <textarea className='workshop-desc' placeholder='תיאור הסדנא שלך ...'
                            onChange={(e) => props.setWorkshopDesc(e.target.value)} value={props.workshopDesc} />
                   <label  className='flex-col'>
                    מחיר :
                    <input className='form-input' name='price' type='number' onChange={(e) => props.setPrice(e.target.value)} value={props.price} />
                </label>
                    </fieldset>
                }

                <RepeatingActivityRadioBtns {...RepeatingActivityRadioBtnsProps} />

                {props.activityType === 'שיעור' &&
                    <label htmlFor={'activity-name'} className='flex-col ' >
                        שם הפעילות:
                        <input className='form-input' id={'activity-name '}
                            type={'text'}
                            list='options'
                            onChange={(ev: any) => props.setActivityName(ev.target.value)}
                        />

                        <datalist id="options" className='form-input'>
                            {options.map((option, index) => (
                                <option key={index} value={option} />
                            ))}
                        </datalist>
                    </label>}

                <label htmlFor='teacher' className='flex-col'>
                    מורה :
                    <select className='form-input' name='teacher' onChange={(e) =>
                        props.setActivityTeacher(e.target.value)} value={props.activityTeacher} >
                        <option value={'יאיר שורץ'}>יאיר שורץ</option>
                        <option value={'טלי רודי'}>טלי רודי</option>
                    </select>
                </label>
                <label className='flex-col'>
                    מיקום :
                    <input className='form-input' name='location' onChange={(e) => props.setActivityLocation(e.target.value)} value={props.activityLocation} />
                </label>
                <button className='form-btn flex-jc-ac pointer' type='button' onClick={props.addActivity}>הוסף פעילות </button>
                <button className='form-btn flex-jc-ac pointer' type='button' onClick={() => props.setIsPreviewDisplayShown(true)}> ביטול שיעור</button>
                <button className='form-btn flex-jc-ac pointer' type='button' 
                onClick={props.createNewPeriodicAgenda}>{props.isEditCurrPeriodicAgenda?'עדכן לוז תקופתי':'סיים ופרסם לוז תקופתי'}</button>
            </form>

        </main>)
}