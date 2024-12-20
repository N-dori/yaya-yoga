'use client'
import { Tannouncement, Tbillboard, TselectedHoursRange, Tworkshop } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import AnnouncementCreationForm from './AnnouncementCreationForm'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { useDispatch } from 'react-redux'
import { clearBillboard, deleteAnnouncemnt, getUrl, getWorkshops, makeId, scrollUp, uploadBillboardImage } from '@/app/utils/util'
import EditAnnouncementFrom from './EditAnnouncementFrom'

type AnnouncementCreationIndexProps = {
    billboard: Tbillboard
}

export default function AnnouncementCreationIndex({ billboard }: AnnouncementCreationIndexProps) {
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
    const [isfirstTimeCmpMounts, setIsfirstTimeCmpMounts] = useState(true)

    const [selectedDate, setSelectedDate] = useState(null)
    const [workshops, setWorkshops] = useState<Tworkshop[]>(null)
    const dispatch = useDispatch()


    useEffect(() => {
        if (isfirstTimeCmpMounts) {
            loadBillboard()
            loadWorkshops()
        }
    }, [])
    const loadWorkshops = async () => {
        const workshops = await getWorkshops()
        if (workshops) {
            console.log('getting wor..', workshops);

            setWorkshops(workshops)
        }
    }
    const loadBillboard = () => {
        if (billboard) {
            setAnnouncements([...billboard.announcements])
            setIsfirstTimeCmpMounts(false)
        }
    }

    const linkAnnouncementToWorkshop = (data:Tannouncement) => {
        

        const workshopFound = workshops?.find(workshop => workshop.title.trim() === data.title.trim())
        console.log('workshopFound', workshopFound);
        if (workshopFound) {
            data.workshopId = workshopFound.id
        }
        console.log('data', data);
        return data
    }

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
            setIsLoading(true)
            const formData = new FormData();
            formData.append('image', img);
            console.log('formData : ', formData);
           const res =  await uploadBillboardImage(formData)
            
            if (res) {

                const data: Tannouncement = {
                    id: makeId(),
                    title, subTitle, img: imgLink, date, hours, desc, price, workshopId:undefined
                }
                console.log('data : ', data);
                addAnnouncement(data)
                resetForm()
                scrollUp()

                setIsLoading(false)
                console.log('woow it worked now save it to in to array of announcements');

            } else {
                throw new Error('faild to upload image to s3')
            }



        } catch (error) {
            console.log('had a problem to submit announcement');

        }

    }

    const removeImageFromS3Bucket = async (fileName: string) => {
        try {
            const url = getUrl('s3/removeImage');
            const res = await fetch(url, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileName })
            });

            if (res.ok) {
                const data = await res.json(); // Parse the response JSON
                console.log("Image removed successfully:", data);
            } else {
                const errorDetails = await res.json(); // Parse error details from response
                console.error("Failed to remove image:", errorDetails);
                throw new Error(errorDetails.message || "Failed to remove image from S3");
            }
        } catch (error) {
            console.error("An error occurred while removing the image:", error);
            throw error; // Rethrow the error for higher-level handling
        }
    };

    const addAnnouncement = (data: Tannouncement) => {
        //if title of Announcement matchs === title of workshop 
        // add to announcement workshopId for it can link to details page
     const updatedData=  linkAnnouncementToWorkshop(data)

        setAnnouncements([...announcements, updatedData])
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
        let imgLink = `https://yayayoga.s3.eu-north-1.amazonaws.com/Announcements-images/${imgName}`
        console.log('file', file);

        // Validate the file (e.g., type or size)
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5 MB limit
            alert('ישנה אפרות להעלות קביצים במגבלה של עד 5 מגה');
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
      const updatedAnnouncement =  linkAnnouncementToWorkshop(announcement)
        const index = announcements.findIndex(currAnnouncement => currAnnouncement.id === announcement.id)
        announcements.splice(index, 1, updatedAnnouncement)
        setAnnouncements([...announcements])
    }

    const handelPublishAnnuncement = async () => {
        const isConfirmed = confirm('האם אתה בטוח שברצונך לפרסם לוח מודעות חדש?')
        if (isConfirmed) {
            await creacteBillboard()

        }

    }

    const removeAnnuncement = async (id: string) => {
        const announcement = announcements.find(announcement => announcement.id === id)

        const getFileName = (url: string) => {
            let name = '';
            let extension = '';
            // Find the last dot (.) for the extension
            const lastDotIndex = url.lastIndexOf('.');
            if (lastDotIndex !== -1) {
                extension = url.slice(lastDotIndex + 1);
            }
            // Find the last slash (/) for the file name
            const lastSlashIndex = url.lastIndexOf('/');
            if (lastSlashIndex !== -1) {
                name = url.slice(lastSlashIndex + 1, lastDotIndex);
            } else {
                // If there's no slash, assume the entire string before the dot is the name
                name = url.slice(0, lastDotIndex);
            }

            console.log('Extension is:', extension);
            const fileName = `${name}.${extension}`;
            return fileName;

        }

        const fileName = getFileName(announcement.img)

        console.log('fileName : ', fileName);
        const isConfirmed = confirm('האם אתה בטוח שברצונך להסיר מודעה?')
        if (isConfirmed) {
            removeImageFromS3Bucket(fileName)

            if (announcements.length === 1) {
                const res = await clearBillboard(billboard._id)
                console.log('res : ', res);

            }

             await deleteAnnouncemnt(announcement.workshopId)
            
            removeClientSideAnnuncement(id)

        }
    }
    const removeClientSideAnnuncement = (id: string) => {

        const announcement = announcements.find(announcement => announcement.id === id)
        const index = announcements.findIndex(announcement => announcement.id === id)
        announcements.splice(index, 1)
        setAnnouncements([...announcements])
        let txt = `מודעה "${announcement.title}" הוסרה בהצלחה!`
        getUserMsg(txt, true)

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

        workshops,

        selectedDate, setSelectedDate,
        isLoading,
        handelSubmitAnnouncement,
        handelTimeChange,
        handelImgInput,
        updateAnnouncement,
        currAnnuncement, setCurrAnnuncement,
        resetForm,
        handelPublishAnnuncement,
        removeAnnuncement,

    }
    return (

        !currAnnuncement ?

            <AnnouncementCreationForm {...AnnouncementCreationFormProps} />
            :
            <EditAnnouncementFrom {...AnnouncementCreationFormProps} />

    )
}