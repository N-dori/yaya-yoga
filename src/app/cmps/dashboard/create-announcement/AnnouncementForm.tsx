import { clockSvg } from '@/app/assets/svgs/ClockSvg'
import { Tannouncement, TselectedHoursRange } from '@/app/types/types'
import { makeId } from '@/app/utils/util'
import { he } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import Spinner from '../../Spinner'

type AnnouncementFormProps = {
    announcements: Tannouncement[]
    setAnnouncements: (data: Tannouncement[]) => void
    title: string
    setTitle: (title: string) => void,
    titleInError: boolean
    setTitleInError: (b: boolean) => void,
    subTitle: string
    setSubTitle: (subTitle: string) => void
    subTitleError: boolean
    setSubTitleInError: (b: boolean) => void
    date: Date
    setDate: (date: Date) => void
    dateInError: boolean
    setDateInError: (b: boolean) => void
    hours: TselectedHoursRange
    setHours: (selectedHoursRange: TselectedHoursRange) => void
    hoursActivityRangeInError: boolean
    setHoursActivityRangeInError: (b: boolean) => void
    desc: string
    setDesc: (desc: string) => void
    descError: boolean
    setDescInError: (b: boolean) => void
    img: string
    setImg: (ing: string) => void
    imgInError: boolean
    setImgInError: (b: boolean) => void
    price: number
    setPrice: (n: number) => void
    priceInError: boolean
    setPriceInError: (b: boolean) => void
    imgPreview: string
    setImgPreview: (imgPreview: string) => void
    errorMsg: string
    setErrorMsg: (errorMsg: string) => void

    selectedDate: Date,
    setSelectedDate: (selectedDate: Date) => void
    handelSubmitAnnouncement: (e: any) => void
    handelTimeChange: (activityTime: Date, startEnd: string) => void
    handelImgInput: (e: any) => void
    currAnnuncement: Tannouncement
    setCurrAnnuncement: (currAnnuncement: Tannouncement) => void
    isOnEditMode: boolean
    resetForm: () => void
    updateAnnouncement: (announcement: Tannouncement) => void
    isLoading:boolean
}

export default function AnnouncementForm(props: AnnouncementFormProps) {

    useEffect(() => {
        if (props.currAnnuncement) {
            props.setTitle(props.currAnnuncement.title)
            props.setSubTitle(props.currAnnuncement.subTitle)
            props.setDate(props.currAnnuncement.date)
            props.setHours(props.currAnnuncement.hours)
            props.setImgPreview(props.currAnnuncement.img)
            props.setDesc(props.currAnnuncement.desc)
            props.setPrice(props.currAnnuncement.price)
            props.setSelectedDate(props.currAnnuncement.date)
        }
    }, [props.currAnnuncement])


    const handelSaveChanges = () => {
        let annuncement: Tannouncement = {
            id: props.currAnnuncement.id,
            title: props.title,
            subTitle: props.subTitle,
            date: props.selectedDate,
            hours: { ...props.hours },
            img: props.currAnnuncement.img,
            desc: props.desc,
            price: props.price
        }
        props.updateAnnouncement(annuncement)
        props.setCurrAnnuncement(null)
        props.resetForm()
    }
    return (
        <form className='announcement-creation-form flex-col gap1' onSubmit={props.handelSubmitAnnouncement}>
            {props.isOnEditMode && <p className='pointer' onClick={() => { props.setCurrAnnuncement(null); props.resetForm() }}>חזרה אחורה</p>}
            {props.isOnEditMode ? <h3>עריכת מודעה</h3> : <h3>טופס יצירת מודעה</h3>}
            <label className='input-label flex-col' htmlFor="title" >
                כותרת
                <input className='input-text' type='text' name='title'
                    style={props.titleInError ? { border: '1px solid red' } : {}}
                    placeholder={props.errorMsg ? props.errorMsg : ''}
                    value={props.title} onChange={(e: any) => props.setTitle(e.target.value)}
                />
            </label>

            <label className='input-label flex-col' htmlFor="subtitle">
                כותרת משנה
                <input className='input-text' type='text' name='subtitle'
                    style={props.subTitleError ? { border: '1px solid red' } : {}}
                    placeholder={props.errorMsg ? props.errorMsg : ''}
                    value={props.subTitle} onChange={(e: any) => props.setSubTitle(e.target.value)}
                />
            </label>
            <label className='flex-col'
                style={props.dateInError ? { border: '1px solid red' } : {}}>
                תאריך הפעילות :
                <DatePicker
                    selected={props.selectedDate}
                    onChange={(currDate: Date | null) => { props.setSelectedDate(currDate); props.setDate(currDate) }}
                    dateFormat={'dd/MM/yyyy'}
                    showIcon
                    locale={he}
                    placeholderText='בחר תאריך לפעילות'
                />
            </label>
            <label className='flex-col'
                style={props.hoursActivityRangeInError ? { border: '1px solid red' } : {}}>
                שעת התחלה :
                <DatePicker
                    selected={props.hours?.start || null}
                    onChange={(curtime: Date | null) => props.handelTimeChange(curtime, 'start')}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="hh:mm aaaa"
                    showIcon
                    icon={clockSvg}
                    timeCaption="זמן"
                    timeFormat="HH:mm"
                    locale={he}
                    placeholderText={'בחר שעת התחלה '}

                    timeIntervals={30}
                />
            </label>
            <label className='flex-col'
                style={props.hoursActivityRangeInError ? { border: '1px solid red' } : {}}>
                שעת סיום :
                <DatePicker
                    selected={props.hours?.end || null}
                    onChange={(curtime: Date | null) => props.handelTimeChange(curtime, 'end')}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="hh:mm aaaa"
                    showIcon
                    icon={clockSvg}
                    timeCaption="זמן"
                    timeFormat="HH:mm"
                    locale={he}
                    placeholderText={'בחר שעת סיום '}

                    timeIntervals={30}
                />
            </label>
            {props.imgPreview && (
                <div>
                    <p>תמונה שנבחרה</p>
                    <img src={props.imgPreview} alt="Preview" style={{ maxWidth: '300px' }} />
                </div>
            )}
            <div className=' flex-col'>
                {/* <span className='mb-1'>  בחירת תמונה</span> */}
                <input className='input-select-img ' id='select-img' type='file' accept="image/*" name='select-img'
                    style={props.imgInError ? { border: '1px solid red' } : {}}
                    onChange={(e: any) => props.handelImgInput(e)}
                />
                <label className='custom-input-select-img btn tac' htmlFor='select-img'
                    style={(props.errorMsg && !props.imgPreview) ? { color: 'red' } : {}}
                >{(props.errorMsg && !props.imgPreview) ? props.errorMsg : 'לחץ לבחירת תמונה'}</label>

            </div>

            <label className='input-label flex-col' htmlFor="desc">
                תיאור הפעילות
                <textarea className='input-text' name='desc'
                    placeholder={!props.desc?props.errorMsg:'התיאור שלך...'}
                    style={props.descError ? { border: '1px solid red',color:'red' } : {}}
                    value={props.desc} onChange={(e: any) => props.setDesc(e.target.value)}
                />
            </label>
            <label className='input-label flex-col' htmlFor="price">
                מחיר הפעילות
                <input className='input-text' type='number' name='price'
                    style={props.priceInError ? { border: '1px solid red' } : {}}
                    value={props.price} onChange={(e: any) => props.setPrice(e.target.value)}
                />
            </label>
            {props.isOnEditMode ?
                <button type='button' onClick={handelSaveChanges} className='btn'>שמירת שינויים </button>

                :
                <button className='btn flex-jc-ac'>{props.isLoading?<Spinner/>:'הוסף מודעה'}</button>

            }
        </form>
    )
}