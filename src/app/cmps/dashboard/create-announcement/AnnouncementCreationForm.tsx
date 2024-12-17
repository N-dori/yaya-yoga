'use client'
import { Tannouncement, TselectedHoursRange, Tworkshop } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import MyAnnouncementIndex from './MyAnnouncementIndex'
import AnnouncementForm from './AnnouncementForm'
import Spinner from '../../Spinner'


type AnnouncementCreationFormProps = {
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
    setCurrAnnuncement: (annuncement: Tannouncement) => void
    currAnnuncement: Tannouncement
    resetForm: () => void
    updateAnnouncement: (annuncement: Tannouncement) => void
    handelPublishAnnuncement: () => void
    isLoading: boolean
    removeAnnuncement:(id:string) => void
    workshops:Tworkshop[]

    setImgLink:(imgLink:string) => void
    imgLink:string
    
}

export default function AnnouncementCreationForm(props: AnnouncementCreationFormProps) {


    const AnnouncementFormProps = {
        ...props,
        isOnEditMode: false
    }


    return (
        <section className='announcement-creation-form-container flex-col gap1'>
            {!props.announcements?.length ?
                <ol className='instructions'>
                    <h3>הוראות לפרסום לוח מודעות </h3>
                    <li>בדומה ליצירת תקופת פעילות גם כאן נצור בכל פעם "מודעה" אחת </li>
                    <li>נמלא כותרת - תת כותרת - שעות פעילות(רשות) - תמונה -תיאור הפעילות </li>
                    <li>נאשר ונוסיף את המודעה שיצרנו</li>
                    <li>יש אפשרות לערוך מודעה בלחיצה על , המודעה תחת המודעות שלי</li>
                    <li>כשסיימנו להוסיף מודעות נלחץ על "פרסם מודעות" לפרסום המודעות בדף הכניסה  </li>
                </ol>
                :
                <section className='my-announcement-preview flex-col'>
                    <h3>המודעות שלי</h3>
                    {props.announcements &&
                        <MyAnnouncementIndex announcements={props.announcements} 
                        removeAnnuncement={props.removeAnnuncement}
                        setCurrAnnuncement={props.setCurrAnnuncement}
                        />
                    }
                    <button onClick={props.handelPublishAnnuncement} className='publish-billbord-btn btn flex-jc-ac'>
                        {props.isLoading ? <Spinner /> : 'פרסם לוח מודעות'}</button>
                </section>
            }
            <AnnouncementForm {...AnnouncementFormProps} />

        </section>
    )
}