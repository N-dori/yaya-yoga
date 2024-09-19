import { createDaysRange, createMonthsRange, createYearsRange } from '@/app/util';
import React from 'react'

type Props = {}

export default function userQuestionnaire({params}) {
    console.log('userQuestionnaire',params.userId);

const years:number[] = createYearsRange()
const months:number[] = createMonthsRange()
const days:number[] = createDaysRange()
const places:string [] = ['פרדס-כרכור-משמרות-פינס-עין עירון','עין שמר-גן שומרון-תלמי אלעזר-גן שמואל',
  'מאור-להבות-מגל-מושבים','עמיקם-גבעת עדה-נילי-גליקסון','חדרה-אור עקביא-בנימינה','חריש-קציר והסביבה','אחר']

  return (
    <main className='gc2'>
      <h1 className=''>שאלון אישי -YAYA YOGA</h1>
      <form className='flex-col gap1'>
            <label className='input-label' htmlFor="first-name" >
                שם פרטי
                <input type='text' name='first-name' />
            </label>

            <label className='input-label' htmlFor="last-name">
                שם משפחה
                <input type='text' name='last-name' />
            </label>

            <label className='input-label' htmlFor="israeli-id">
                תעודת זהות
                <input type='text' name='israeli-id' />
            </label>
            <label className='input-label' htmlFor="gender">
                
                <select name='gender'  >
                    <option disabled selected>מין</option>
                    <option>זכר</option>
                    <option>נקבה</option>
                </select>
            </label>
            <fieldset className='fieldset-form flex-col'>
            <legend>תאריך יום הולדת </legend>
            <label className='input-label' htmlFor="years">
                שנה
                <select name='years'>
                   {years.map(year=> 
                    <option>{year}</option>
                   )} 
                </select>
            </label>
            <label className='input-label' htmlFor="months">
                חודש 
                <select name='months'>
                   {months.map(month=> 
                    <option>{month}</option>
                   )} 
                </select> 
            </label>
            <label className='input-label' htmlFor="months">
               יום
                <select name='months'>
                   {days.map(day=> 
                    <option>{day}</option>
                   )} 
                </select> 
            </label>
            
            </fieldset>
            <label className='input-label' htmlFor="occupation">
            במה את/ה עוסק/ת?           
            <input type='text' name='occupation' />
            </label>
            <label className='input-label' htmlFor="months">
            מאיפה את/ה?
                <select name='months'>
                   {places.map(palce=> 
                    <option>{palce}</option>
                   )} 
                </select> 
            </label>
            <label className='input-label' htmlFor="phone" >
              מספר טלפון
                <input type='text' name='phone' />
            </label>
            <label className='input-label flex-col' htmlFor="notes">
              הערות נוספת
            <textarea name='notes' placeholder='כל דבר נוסף שתירצו לשתף זה המקום בשבילו.
אשמח מאד לשמוע מה הם הציפיות,רצונות וכוונות שאיתם את/ה מגיעים לתרגל יוגה
וגם לשמוע מאיפה שמעת והגעת אלי.
תודה :)'></textarea>

            </label>
            </form>

      </main>
  )
}