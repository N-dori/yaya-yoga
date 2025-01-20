import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { StartEndTimePickers } from './StartEndTimePickers'
import { he } from 'date-fns/locale';
import CheckSvg from '@/app/assets/svgs/CheckSvg'
import RepeatingActivityRadioBtns from './RepeatingActivityRadioBtns'
import { getFormattedDate } from '@/app/utils/util';
import { Tactivity, TperiodicAgenda, Tworkshop } from '@/app/types/types';

type PeriodicAgendaFromProps = {
    periodicAgenda:TperiodicAgenda
    isEditCurrPeriodicAgenda:boolean

    handelTimeChange: (currDate: Date | null | undefined, startEnd: string) => void
    error: string

    imgPreview: string, setImgPreview: (imgPreview: string) => void

    isActivityRepeating: boolean
    repetitionNumber: number
    handelDateChange: (date: Date | null | undefined) => void
    setIsActivityRepeating: (isRepeating: boolean) => void
    setRepetitionNumber: (num: number) => void

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
    handelActivityChange:(field:string,value:string)=>void
    handelWorkShopChange:(field:string,value:string|Date)=>void
    workshop:Tworkshop
    activity:Tactivity
}

export default function PeriodicAgendaFrom(props: PeriodicAgendaFromProps) {
    const [options] = useState<string[]>(['אשטנגה', 'פראניאמה + אשטנגה', '108 ברכות שמש', 'ויניאסה', 'יסודות', 'האטה יוגה', 'פראניאמה'])

 
    const RepeatingActivityRadioBtnsProps = {
        isActivityRepeating: props.isActivityRepeating,
        setIsActivityRepeating: props.setIsActivityRepeating,
        setRepetitionNumber: props.setRepetitionNumber,
        repetitionNumber: props.repetitionNumber,
        removeSaturdays: props.removeSaturdays
    }

    const StartEndTimePickersProps = {
        activityEndTime: props.activity.hoursRange.end,
        handelTimeChange: props.handelTimeChange,
        activityStartTime: props.activity.hoursRange.start,
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
        props.handelWorkShopChange('img',file)
        props.handelWorkShopChange('imgUrl',imgLink)
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
                <div className='flex-col gap1 flex-jc-ac relative'>
                    <small className='mandatory-felid'>{(!props.activity.date||!props.activity.hoursRange.start||!props.activity.hoursRange.end)&&'*שדות חובה'}</small>
                    <DatePicker
                        selected={props.activity.date}
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
                <label htmlFor='type' className='flex-col'>
                    סוג הפעילות:
                    <select className='form-input' name='type' onChange={(e) =>
                        props.handelActivityChange('classOrWorkshop',e.target.value)} value={props.activity.classOrWorkshop} >
                        <option value={'שיעור'}>שיעור</option>
                        <option value={'סדנא'}>סדנא</option>
                    </select>
                </label>
                {props.activity.classOrWorkshop === 'סדנא' &&
                    <fieldset className='fieldset-form p-1 flex-col '>
                        <legend>פרטי הסדנא</legend>
                        <label className='flex-col relative'>
                            כותרת :
                            <input className='form-input'
                            placeholder={(!props.workshop.title)&&'*שדה חובה'}
                             name='workshop-title' onChange={(e) => props.handelWorkShopChange('title',e.target.value)} value={props.workshop.title} />

                        </label>
                        <label className='flex-col'>
                            תת כותרת:
                            <input className='form-input'
                             placeholder={(!props.workshop.subTitle)&&'*שדה חובה'}
                             name='workshop-sub-title' onChange={(e) => props.handelWorkShopChange('subTitle',e.target.value)} value={props.workshop.subTitle} />

                        </label>

                        {props.imgPreview && (
                            <div>
                                <p className='mb-1'>תמונה שנבחרה</p>
                                <img src={props.imgPreview} alt="Preview" style={{ maxWidth: '300px' }} />
                            </div>
                        )}
                        <div className=' flex-col relative ' style={!props.workshop.img?{border:'1px solid firebrick',borderRadius:'12px'}:{}}>
                            <input className='input-select-img' id='select-img' type='file' accept="image/*" name='select-img'
                                onChange={(e: any) => handelImgInput(e)} />

                            <label className='custom-input-select-img btn tac' htmlFor='select-img'
                            >{'לחץ לבחירת תמונה'}

                            </label>
                        </div>
                        <DatePicker
                        selected={props.workshop.lastDateForRegistration}
                        onChange={(currDate:Date|null) => props.handelWorkShopChange('lastDateForRegistration',currDate)}
                        dateFormat={'dd/MM/yyyy'}
                        placeholderText="תאריך אחרון להרשמה"
                        showIcon
                        locale={he}

                    />
                        <small>להפרדת הטקסט לפסקאות הוסף /</small>
                        <textarea className='workshop-desc' placeholder='תיאור הסדנא שלך ...'
                         style={!props.workshop.desc?{border:'1px solid firebrick'}:{}}
                            onChange={(e) => props.handelWorkShopChange('desc',e.target.value)} value={props.workshop.desc} />
                   <label  className='flex-col'>
                    מחיר :
                    <input className='form-input' name='price' type='number' onChange={(e) => props.handelWorkShopChange('price',e.target.value)} value={props.workshop.price} />
                </label>
                     </fieldset>
                }

                <RepeatingActivityRadioBtns {...RepeatingActivityRadioBtnsProps} />

                {props.activity.classOrWorkshop === 'שיעור' &&
                    <label htmlFor={'name'} className='flex-col' >
                        שם הפעילות:
                        <input className='form-input' id={'name'}
                            type={'text'}
                            list='options'
                            placeholder={(!props.activity.name)&&'*שדה חובה'}
                            onChange={(ev: any) => props.handelActivityChange('name',ev.target.value)}
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
                        props.handelActivityChange('teacher',e.target.value)} value={props.activity.teacher} >
                        <option value={'יאיר שורץ'}>יאיר שורץ</option>
                        <option value={'טלי רודי'}>טלי רודי</option>
                    </select>
                </label>
                <label className='flex-col'>
                    מיקום :
                    <input className='form-input' name='location' onChange={(e) => props.handelActivityChange('location',e.target.value)} value={props.activity.location} />
                </label>
                <button className='form-btn flex-jc-ac pointer' type='button' onClick={props.addActivity}>הוסף פעילות </button>
{ props.isEditCurrPeriodicAgenda&&  <button className='form-btn flex-jc-ac pointer' type='button' onClick={() => props.setIsPreviewDisplayShown(true)}> בטל/שחזר שיעור</button>}                <button className='form-btn flex-jc-ac pointer' type='button' 
                onClick={props.createNewPeriodicAgenda}>{props.isEditCurrPeriodicAgenda?'עדכן לוז תקופתי':'סיים ופרסם לוז תקופתי'}</button>
            </form>

        </main>)
}