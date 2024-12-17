import { Tannouncement, TselectedHoursRange, Tworkshop } from '@/app/types/types'
import React from 'react'
import AnnouncementForm from './AnnouncementForm'

type EditAnnouncementFromProps = {
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
    resetForm:()=>void
    updateAnnouncement:(annuncement:Tannouncement)=>void
    
    workshops:Tworkshop[]
    isLoading:boolean

    setImgLink:(imgLink:string) => void
    imgLink:string

}

export default function EditAnnouncementFrom(props: EditAnnouncementFromProps) {
    const AnnouncementFormProps = {
        ...props ,
        isOnEditMode:true
    }
  return (
    <AnnouncementForm {...AnnouncementFormProps} />
  )
}