'use client'

import React, { useState } from 'react'
import { createDaysRange, createMonthsRange, createYearsRange } from '@/app/utils/util';

const years: number[] = createYearsRange()
const months: number[] = createMonthsRange()
const days: number[] = createDaysRange()
const places: string[] = ['פרדס-כרכור-משמרות-פינס-עין עירון', 'עין שמר-גן שומרון-תלמי אלעזר-גן שמואל',
    'מאור-להבות-מגל-מושבים', 'עמיקם-גבעת עדה-נילי-גליקסון', 'חדרה-אור עקביא-בנימינה', 'חריש-קציר והסביבה', 'אחר']

type Props = {}

export default function UserQuestionnaire({}: Props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [id, setId] = useState('')
    const [gender, setGender] = useState('')
    const [dayBirth, setDayBirth] = useState('')
    const [monthBirth, setMonthBirth] = useState('')
    const [yearBirth, setYearBirth] = useState('1990')
    const [occupation, setOccupation] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [conmments, setComments] = useState('')

  return (
<form className='flex-col gap1'>
                <label className='input-label flex-col' htmlFor="first-name" >
                    שם פרטי
                    <input className='input-text' type='text' name='first-name' value={firstName} onChange={(e:any)=>setFirstName(e.target.value)}/>
                </label>

                <label className='input-label flex-col' htmlFor="last-name">
                    שם משפחה
                    <input className='input-text' type='text' name='last-name' value={lastName} onChange={(e:any)=>setLastName(e.target.value) }/>
                </label>

                <label className='input-label flex-col' htmlFor="israeli-id">
                    תעודת זהות
                    <input className='input-text' type='text' name='israeli-id' value={id} onChange={(e:any)=>setId(e.target.value) } />
                </label>
                <label className='input-label flex-col' htmlFor="gender">
                    
                    <select className='form-select' name='gender' value={gender} onChange={(e:any)=>setGender(e.target.value) } >
                        <option disabled value={''} >מין</option>
                        <option>זכר</option>
                        <option>נקבה</option>
                    </select>
                </label>
                <label className='input-label flex-col' htmlFor="phone" >
                    מספר טלפון
                    <input type='text' name='phone' className='input-text' value={phone} onChange={(e:any)=>setPhone(e.target.value) } />
                </label>
                <label className='input-label flex-col' htmlFor="address">
                    מקום מגורים
                    <select className='form-select' name='address' value={address} onChange={(e:any)=>setOccupation(e.target.value) }>
                        {places.map(palce =>
                            <option key={palce}>{palce}</option>
                        )}
                    </select>
                </label>
                
                <fieldset className='fieldset-form flex-col'>
                    <legend>תאריך יום הולדת </legend>
                    <label className='input-label flex-col' htmlFor="years">
                        שנה
                        <select  className='form-select' value={yearBirth} name='years' onChange={(e:any)=>setYearBirth(e.target.value) }>
                            {years.map(year =>
                        
                            <option key={year} value={year} >{year}</option>
                        
                            )}
                        </select>
                    </label>
                    <label className='input-label flex-col' htmlFor="months">
                        חודש
                        <select className='form-select' name='months' value={monthBirth} onChange={(e:any)=>setMonthBirth(e.target.value) }>
                            {months.map(month =>
                                <option key={month} value={month}>{month}</option>
                            )}
                        </select>
                    </label>
                    <label className='input-label flex-col' htmlFor="days">
                        יום
                        <select className='form-select' name='days' value={dayBirth} onChange={(e:any)=>setDayBirth(e.target.value) } >
                            {days.map(day =>
                                <option key={day} value={day}>{day}</option>
                            )}
                        </select>
                    </label>

                </fieldset>
                <label className='input-label flex-col' htmlFor="occupation">
                    במה את/ה עוסק/ת?
                    <input type='text' name='occupation' className='input-text' value={occupation} onChange={(e:any)=>setOccupation(e.target.value) } />
                </label>
             
                <label className='input-label flex-col flex-col' htmlFor="notes">
                    הערות נוספת
                    <textarea className='txt-area' name='notes' value={conmments} placeholder='כל דבר נוסף שתרצו לשתף זה המקום בשבילו.
אשמח מאד לשמוע מה הם הציפיות, רצונות וכוונות שאיתם את/ה מגיעים לתרגל יוגה
וגם לשמוע מאיפה שמעת והגעת אלי.
תודה :)' onChange={(e:any)=>setComments(e.target.value) }></textarea>

                </label>
            </form>
          )
}