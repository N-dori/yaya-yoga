import { clockSvg } from '@/app/assets/svgs/ClockSvg'
import { Tannouncement, TselectedHoursRange, Tworkshop } from '@/app/types/types'
import { getDateType, makeId, scrollUp, uploadBillboardImage } from '@/app/utils/util'
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
    setImgLink:(imgLink:string) => void
    imgLink:string

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
    isLoading: boolean
    workshops:Tworkshop[]
}

export default function AnnouncementForm(props: AnnouncementFormProps) {
    const [workshopsTitles, setWorkshopsTitles] = useState<string[]>()
    useEffect(() => {
        if (props.currAnnuncement) {
            props.setTitle(props.currAnnuncement.title)
            props.setSubTitle(props.currAnnuncement.subTitle)
            props.setDate(props.currAnnuncement.date)
            props.setHours({start:getDateType(props.currAnnuncement.hours.start),end:getDateType(props.currAnnuncement.hours.end)})
            props.setImgPreview(props.currAnnuncement.img)
            props.setDesc(props.currAnnuncement.desc)
            props.setPrice(props.currAnnuncement.price)
            props.setSelectedDate(props.currAnnuncement.date)
        }
        getWorkshopsTitles()
    }, [props.currAnnuncement,props?.workshops])

    const getWorkshopsTitles = () => {
       
       let titles:string[]=  props?.workshops?.map(workshop=>workshop.title ) 
       const titlesNoDuplicates = Array.from(new Set(titles))             
        setWorkshopsTitles(titlesNoDuplicates) 
    }

    const handelSaveChanges = async () => {
       
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
        scrollUp()
    }
    return (
        <form className='announcement-creation-form flex-col gap1' onSubmit={props.handelSubmitAnnouncement}>


            {props.isOnEditMode ? 
            <section className='edit-mode-headline'>
                <h3 className='tac'>עריכת מודעה</h3> 
                <svg onClick={() => { props.setCurrAnnuncement(null); props.resetForm() }}
                className='backSvg pointer'
                xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368">
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>

            </section>
            
            : 
            <h3>טופס יצירת מודעה</h3>}

        
            <label htmlFor={'title'} className='input-label flex-col ' >
            כותרת:
                        <input className='input-text' id={'title '}
                         style={props.titleInError ? { border: '1px solid red' } : {}}
                         placeholder={props.errorMsg ? props.errorMsg : ''}
                            type={'text'}
                            list='options'
                            value={props.title}
                            onChange={(ev: any) => props.setTitle(ev.target.value)}
                        />

                        <datalist id="options" className='input-text'>
                            {workshopsTitles?.map((title, index) => (
                                <option key={index} value={title} />
                            ))}
                        </datalist>
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

        {!props.isOnEditMode&&
            <div className=' flex-col'>
                <input className='input-select-img' id='select-img' type='file' accept="image/*" name='select-img'
                    style={props.imgInError ? { border: '1px solid red' } : {}}
                    onChange={(e: any) => props.handelImgInput(e)} />

                <label className='custom-input-select-img btn tac' htmlFor='select-img'
                    style={(props.errorMsg && !props.imgPreview) ? { color: 'red' } : {}}
                >{(props.errorMsg && !props.imgPreview) ? props.errorMsg : 'לחץ לבחירת תמונה'}</label>

            </div>}

            <label className='input-label flex-col' htmlFor="desc">
                תיאור הפעילות
                <small>להפרדה לפסקאות הוסף /</small>
                <textarea className='input-text' name='desc'
                    placeholder={!props.desc ? props.errorMsg : 'התיאור שלך...'}
                    style={props.descError ? { border: '1px solid red', color: 'red' } : {}}
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
                <button className='btn flex-jc-ac' onClick={props.handelSubmitAnnouncement}>{props.isLoading ? <Spinner /> : 'הוסף מודעה'}</button>
            }
        </form>
    )
}