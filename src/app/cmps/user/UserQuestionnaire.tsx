'use client'

import React, { useState } from 'react'
import { createDaysRange, createMonthsRange, createYearsRange, getUrl, scrollUp } from '@/app/utils/util';
import { TuserQuestionnaire } from '@/app/types/types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice';

const years: number[] = createYearsRange()
const months: number[] = createMonthsRange()
const days: number[] = createDaysRange()
const places: string[] = ['פרדס-כרכור-משמרות-פינס-עין עירון', 'עין שמר-גן שומרון-תלמי אלעזר-גן שמואל',
    'מאור-להבות-מגל-מושבים', 'עמיקם-גבעת עדה-נילי-גליקסון', 'חדרה-אור עקביא-בנימינה', 'חריש-קציר והסביבה', 'אחר']

type UserQuestionnaireProps = {
    _id: string
}

export default function UserQuestionnaire({ _id }: UserQuestionnaireProps) {

    const [firstName, setFirstName] = useState('')
    const [firstNameInError, setFirstNameInError] = useState(false)
    const [lastName, setLastName] = useState('')
    const [lastNameInError, setLastNameInError] = useState(false)
    const [israelid, setIsraeliId] = useState('')
    const [israelidInError, setIsraeliIdInError] = useState(false)
    const [gender, setGender] = useState('')
    const [genderInError, setGenderInError] = useState(false)
    const [dayBirth, setDayBirth] = useState('')
    const [dayBirthInError, setDayBirthInError] = useState(false)
    const [monthBirth, setMonthBirth] = useState('')
    const [monthBirthInError, setMonthBirthInError] = useState(false)
    const [yearBirth, setYearBirth] = useState('1990')
    const [yearBirthInError, setYearBirthInError] = useState(false)
    const [occupation, setOccupation] = useState('')
    const [occupationInError, setOccupationInError] = useState(false)
    const [address, setAddress] = useState('')
    const [addressInError, setAddressInError] = useState(false)
    const [phone, setPhone] = useState('')
    const [phoneInError, setPhoneInError] = useState(false)
    const [comments, setComments] = useState('')
    const [commentsInError, setCommentsInError] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()
    const dispatch = useDispatch()


    const handelSubmit = async (e: any) => {
        try {
            e.preventDefault()
            if (!firstName || !lastName || !israelid || !gender || !dayBirth || !monthBirth || !yearBirth || !occupation || !address || !phone || !comments) {

                if (!firstName) handelOnError('בבקשה למלא שם פרטי', 'firstName')
                if (!lastName) handelOnError('בבקשה למלא שם משפחה', 'lastName')
                if (!israelid) handelOnError('יש למלא תעודת זהות תקנית', 'israelid')
                if (!gender) handelOnError('יש לציין זכר או נקבה', 'gender')
                if (!dayBirth) handelOnError('יש להזין את היום בו נולדת', 'dayBirth')
                if (!monthBirth) handelOnError('יש להזין את חודש בו נולדת', 'monthBirth')
                if (!yearBirth) handelOnError('יש להזין את השנה בו נולדת', 'yearBirth')
                if (!occupation) handelOnError('זה המקום לציים תחום עיסוק', 'occupation')
                if (!phone) handelOnError('יש להזין מספר טלפון', 'phone')
                if (!address) handelOnError('יש להזין כתובת מגורים', 'address')
                if (!comments) handelOnError('זה המקום ולשתף בכל בעיה, פציעה,מחלה או כל דבר שעשיו לסייע בהתאמת התרגול ', 'comments')
                return
            }
            const data: TuserQuestionnaire = {
                firstName,
                lastName,
                israelid,
                gender,
                dayBirth,
                monthBirth,
                yearBirth,
                occupation,
                address,
                phone,
                comments
            }


            //crearing a new user questoinnaire object  
            const url = getUrl('user/userQeustionnaire')
            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ data })
            })
            if (res.ok) {
                //updating currrent user with user questoinnaire id
                const userQuestionnaireId = await res.json()
                const url = getUrl('user/updateUserQeustionnaire')
                const result = await fetch(url, {
                    method: 'PUT',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ _id, userQuestionnaireId })
                })
                if (result.ok) {
                    let txt = 'שאלון פרטים אישיים נקלט בהצלחה!'
                    dispatch(callUserMsg({ msg: txt, isSucsses: true }))

                    console.log('User qeustionnaire was posted successfuly ');
                } else {
                    let txt = 'השליחה נכשלה!'
                    dispatch(callUserMsg({ msg: txt, isSucsses: false }))

                }
                scrollUp()
                setTimeout(() => {
                    dispatch(hideUserMsg())
                    router.replace('/')
                }, 3500);
            }
        } catch (err) {
            console.log('had a problem to post user questionnaire',);
        }
    }
    const resetErrors = () => {
        setTimeout(() => {
            setError('')
            setFirstNameInError(false)
            setLastNameInError(false)
            setIsraeliIdInError(false)
            setGenderInError(false)
            setDayBirthInError(false)
            setMonthBirthInError(false)
            setYearBirthInError(false)
            setOccupationInError(false)
            setAddressInError(false)
            setPhoneInError(false)
            setCommentsInError(false)
        }, 4000)

    }
    const commandForError = {
        "firstName": () => setFirstNameInError(!firstName),
        "lastName": () => setLastNameInError(!lastName),
        "israelid": () => setIsraeliIdInError(!israelid),
        "gender": () => setGenderInError(!gender),
        "dayBirth": () => setDayBirthInError(!dayBirth),
        "monthBirth": () => setMonthBirthInError(!monthBirth),
        "yearBirth": () => setYearBirthInError(!yearBirth),
        "occupation": () => setOccupationInError(!occupation),
        "address": () => setAddressInError(!address),
        "phone": () => setPhoneInError(!phone),
        "comments": () => setCommentsInError(!comments),

    }

    const handelOnError = (msg: string, field: string) => {
        if (!firstName && !lastName && !israelid && !gender && !dayBirth &&
            !monthBirth  && !occupation && !address && !phone && !comments) {

            let txt = 'בבקשה למלא את כל השדות'
            setError(txt)
            resetErrors()
            return
        }

        commandForError[field]()
        setError(msg)
        resetErrors()
    }


    return (
        <form className='flex-col gap1' onSubmit={handelSubmit}>
            <label className='input-label flex-col' htmlFor="first-name" >
                שם פרטי
                <input className='input-text' type='text' name='first-name'
                    style={firstNameInError ? { border: '1px solid red' } : {}}
                    value={firstName} onChange={(e: any) => setFirstName(e.target.value)}
                />
            </label>

            <label className='input-label flex-col' htmlFor="last-name">
                שם משפחה
                <input className='input-text' type='text' name='last-name'
                    style={lastNameInError ? { border: '1px solid red' } : {}}
                    value={lastName} onChange={(e: any) => setLastName(e.target.value)}
                   />
            </label>

            <label className='input-label flex-col' htmlFor="israeli-israeliid">
                תעודת זהות
                <input className='input-text' type='text' name='israeli-id'
                    style={israelidInError ? { border: '1px solid red' } : {}}
                    value={israelid} onChange={(e: any) => setIsraeliId(e.target.value)}
                />
            </label>
            <label className='input-label flex-col' htmlFor="gender">

                <select className='form-select' name='gender'
                    style={genderInError ? { border: '1px solid red' } : {}}
                    value={gender} onChange={(e: any) => setGender(e.target.value)}
                >
                    <option disabled value={''} >מין</option>
                    <option>זכר</option>
                    <option>נקבה</option>
                </select>
            </label>
            <label className='input-label flex-col' htmlFor="phone" >
                מספר טלפון
                <input type='text' name='phone' className='input-text'
                    style={phoneInError ? { border: '1px solid red' } : {}}
                    value={phone} onChange={(e: any) => setPhone(e.target.value)}
                     />
            </label>
            <label className='input-label flex-col' htmlFor="address">
                מקום מגורים
                <select className='form-select' name='address'
                    style={addressInError ? { border: '1px solid red' } : {}}
                    value={address} onChange={(e: any) => setAddress(e.target.value)}>
                    {places.map(palce =>
                        <option key={palce}>{palce}</option>
                    )}
                </select>
            </label>

            <fieldset className='fieldset-form flex-col'>
                <legend>תאריך יום הולדת </legend>
                <label className='input-label flex-col' htmlFor="years">
                    שנה
                    <select className='form-select' value={yearBirth} name='years'
                        style={yearBirthInError ? { border: '1px solid red' } : {}}
                        onChange={(e: any) => setYearBirth(e.target.value)}>
                        {years.map(year =>

                            <option key={year} value={year} >{year}</option>

                        )}
                    </select>
                </label>
                <label className='input-label flex-col' htmlFor="months">
                    חודש
                    <select className='form-select' name='months' value={monthBirth}
                        style={monthBirthInError ? { border: '1px solid red' } : {}}
                        onChange={(e: any) => setMonthBirth(e.target.value)}>
                        {months.map(month =>
                            <option key={month} value={month}>{month}</option>
                        )}
                    </select>
                </label>
                <label className='input-label flex-col' htmlFor="days">
                    יום
                    <select className='form-select' name='days' value={dayBirth}
                        style={dayBirthInError ? { border: '1px solid red' } : {}}

                        onChange={(e: any) => setDayBirth(e.target.value)} >
                        {days.map(day =>
                            <option key={day} value={day}>{day}</option>
                        )}
                    </select>
                </label>

            </fieldset>
            <label className='input-label flex-col' htmlFor="occupation">
                במה את/ה עוסק/ת?
                <input type='text' name='occupation' className='input-text' value={occupation}
                    style={occupationInError ? { border: '1px solid red' } : {}}
                    onChange={(e: any) => setOccupation(e.target.value)}
                     />
            </label>

            <label className='input-label flex-col flex-col' htmlFor="notes">
                הערות נוספת
                <textarea className='txt-area' name='notes' value={comments}
                    style={commentsInError ? { border: '1px solid red' } : {}}
                    placeholder='כל דבר נוסף שתרצו לשתף זה המקום בשבילו.
אשמח מאד לשמוע מה הם הציפיות, רצונות וכוונות שאיתם את/ה מגיעים לתרגל יוגה
וגם לשמוע מאיפה שמעת והגעת אלי.
 תודה יאיר :)' 
 onChange={(e: any) => setComments(e.target.value)}></textarea>

            </label>
            <button type='submit' className='submit-questionnaire-btn'>שליחת שאלון</button>
        </form>
    )
}