'use client'
import { Tannouncement, TselectedHoursRange } from '@/app/types/types'
import React, { useState } from 'react'
import AnnouncementCreationForm from './AnnouncementCreationForm'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { useDispatch } from 'react-redux'
import { getUrl, makeId, scrollUp } from '@/app/utils/util'
import EditAnnouncementFrom from './EditAnnouncementFrom'

type Props = {}

export default function AnnouncementCreationIndex({ }: Props) {
    const [announcements, setAnnouncements] = useState<Tannouncement[]>([])
    const [currAnnuncement, setCurrAnnuncement] = useState<Tannouncement>()

    const [title, setTitle] = useState('')
    const [titleInError, setTitleInError] = useState(false)
    const [subTitle, setSubTitle] = useState('')
    const [subTitleError, setSubTitleInError] = useState(false)
    const [date, setDate] = useState(null)
    const [dateInError, setDateInError] = useState(false)
    const [hours, setHours] = useState<TselectedHoursRange>(null)
    const [hoursActivityRangeInError, setHoursActivityRangeInError] = useState(false)
    const [desc, setDesc] = useState('')
    const [descError, setDescInError] = useState(false)
    const [img, setImg] = useState('')
    const [imgLink, setImgLink] = useState('')
    const [imgInError, setImgInError] = useState(false)
    const [price, setPrice] = useState(0)
    const [priceInError, setPriceInError] = useState(false)
    const [imgPreview, setImgPreview] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [selectedDate, setSelectedDate] = useState(null)
    const dispatch = useDispatch()


    const getUserMsg = (txt: string, isSucsses: boolean) => {
        dispatch(callUserMsg({ msg: txt, isSucsses }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }



    const handelOnError = (msg: string, field: string) => {

        commandForError[field]()
        setErrorMsg(msg)
        resetErrors()
        setTimeout(() => {
            setErrorMsg('')

        }, 3500);
        return

    }

    const commandForError = {
        "title": () => setTitleInError(true),
        "subtitle": () => setSubTitleInError(true),
        "select-img": () => setImgInError(true),
        "date": () => setDateInError(true),
        "hours": () => setHoursActivityRangeInError(true),
        "desc": () => setDescInError(true),
        "price": () => setPriceInError(true),
    }

    const resetErrors = () => {
        setTimeout(() => {
            setTitleInError(false)
            setSubTitleInError(false)
            setImgInError(false)
            setDateInError(false)
            setHoursActivityRangeInError(false)
            setDescInError(false)
        }, 4000)

    }

    const handelSubmitAnnouncement = async (e: any) => {
        e.preventDefault()
        try {
            if (!title || !subTitle || !desc || !img) {

                if (!title) { handelOnError('בבקשה להוסיף כותרת', 'title'); return }
                if (!subTitle) { handelOnError('בבקשה למלא כותרת משנה', 'subtitle'); return }
                if (!imgPreview) { handelOnError('יש להוסיף תמונה', 'select-img'); return }
                if (!desc) { handelOnError('יש להוסיף תיאור לפעילות', 'desc'); return }
                // if (!dateInError) handelOnError('יש לבחור תאריך לפעילות ', 'date')
                // if (!hoursActivityRangeInError) handelOnError('יש לבחור שעת להתחלה-סיום ', 'hours')
            }

            const formData = new FormData();
            formData.append('image', img);
            console.log('formData : ', formData);
            const url = getUrl('s3/uploadImage/')
            const res = await fetch(url, {
                method: 'POST',
                body: formData
            },
            )
            if (res.ok) {
                const data: Tannouncement = {
                    id: makeId(),
                    title, subTitle, img: imgLink, date, hours, desc, price,
                }
                console.log('data : ', data);
                addAnnouncement(data)
                resetForm()
                scrollUp()
                // creactNewAnnuncement(data)
                console.log('woow it worked now save it to in to array of announcements');

            } else {
                throw new Error('faild to upload image to s3')
            }



        } catch (error) {
            console.log('had a problem to submit announcement');

        }

    }

    const addAnnouncement = (data: Tannouncement) => {
        setAnnouncements([...announcements, data])
        let txt = 'מודעה הוספה בהצלחה!'
        getUserMsg(txt, true)

    }
    const resetForm = () => {
        setTitle('')
        setSubTitle('')
        setHours(null)
        setDate(null)
        setSelectedDate(null)
        setImg('')
        setImgPreview('')
        setPrice(0)
        setDesc('')
    }
    const creacteBillboard = async () => {
        setIsLoading(true)
        const url = getUrl('announcement/createBillboard/')
        const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ announcements })
        },
        )
        if (res.ok) {
            console.log('newly created announcement : ', await res.json());
            let txt = 'לוח מודעות פורסם בהצלחה'
            getUserMsg(txt, true)
            setIsLoading(false)
        } else {
            let txt = 'הייתה בעיה לפרסם לוח מודעות נסה מאוחר יותר'
            getUserMsg(txt, false)
            setIsLoading(false)

        }
    }

    const handelImgInput = (ev: any) => {
        const file = ev.target.files[0]
        let imgName = file.name // טלי.png
        let imgLink = `https://yayayoga.s3.eu-north-1.amazonaws.com/Annuncements-images/${imgName}`
        console.log('file', file);

        // Validate the file (e.g., type or size)
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5 MB limit
            alert('File size exceeds 5 MB.');
            return;
        }
        setImg(file)
        setImgLink(imgLink)
        const reader = new FileReader();
        reader.onload = () => {
            setImgPreview(reader.result as string); // Base64 preview
        };
        reader.readAsDataURL(file);
    }

    const handelTimeChange = (activityTime: Date, startEnd: string) => {
        if (!date) {
            let txt = 'יש לבחור תאריך לפני שעה'
            setErrorMsg(txt)
        }

        let activityDateAndTime = new Date(date)
        let selectedHoursRange: TselectedHoursRange = { start: activityDateAndTime, end: activityDateAndTime }
        if (startEnd === 'start') {
            let hours = activityTime.toLocaleTimeString('he-IL').split(':')[0]
            let minutes = activityTime.toLocaleTimeString('he-IL').split(':')[1]
            activityDateAndTime.setHours(+hours, +minutes, 0, 0);
            setDate(activityDateAndTime)
            selectedHoursRange.start = activityTime
        }
        else {
            selectedHoursRange.end = activityTime
        }
        setHours({ ...selectedHoursRange })
    }
    const updateAnnouncement = (announcement: Tannouncement) => {
        const index = announcements.findIndex(currAnnouncement => currAnnouncement.id === announcement.id)
        announcements.splice(index, 1, announcement)
        setAnnouncements([...announcements])
    }
    const handelPublishAnnuncement = async () => {
        const isConfirmed = confirm('האם אתה בטוח שברצונך לפרסם לוח מודעות חדש?')
        if (isConfirmed) {
            await creacteBillboard()

        }

    }

    const AnnouncementCreationFormProps = {
        announcements, setAnnouncements,
        title, setTitle,
        titleInError, setTitleInError,
        subTitle, setSubTitle,
        subTitleError, setSubTitleInError,
        date, setDate,
        dateInError, setDateInError,
        hours, setHours,
        hoursActivityRangeInError, setHoursActivityRangeInError,
        desc, setDesc,
        descError, setDescInError,
        img, setImg,
        imgLink, setImgLink,
        imgInError, setImgInError,
        price, setPrice,
        priceInError, setPriceInError,
        imgPreview, setImgPreview,
        errorMsg, setErrorMsg,

        selectedDate, setSelectedDate,
        isLoading,
        handelSubmitAnnouncement,
        handelTimeChange,
        handelImgInput,
        updateAnnouncement,
        currAnnuncement, setCurrAnnuncement,
        resetForm,
        handelPublishAnnuncement

    }
    return (
        <main className='announcement-creation-page-container'>

            {!currAnnuncement ?

                <AnnouncementCreationForm {...AnnouncementCreationFormProps} />
                :
                <EditAnnouncementFrom {...AnnouncementCreationFormProps} />
            }
        </main>
    )
}