"use client"

import React, { useEffect, useState } from 'react'
import PeriodicAgendaPreviewDisplay from './PeriodicAgendaPreviewDisplay'
import { Tactivity, TperiodicAgenda, TuserMsgProps, Tworkshop } from '@/app/types/types'
import {getDateType, getUrl, makeId, stripTime } from '@/app/utils/util'
import PeriodicAgendaForm from './PeriodicAgendaForm'
import { useRouter } from 'next/navigation'
import { callUserMsg, hideUserMsg, } from '@/app/store/features/msgSlice'
import { useDispatch } from 'react-redux'
import EditPeriodOrCreateNew from './EditPeriodOrCreateNew'
import { createNewWorkShop } from '@/app/actions/workshopActions'
import { getPeriodicAgenda } from '@/app/actions/periodicAgendaActions'

export default function PeriodicAgendaCreation() {
    // this state contains all the info regarding the period-a quoter  
    const [periodicAgenda, setPeriodicAgenda] = useState<TperiodicAgenda>()

    const [isEditCurrPeriodicAgenda, setIsEditCurrPeriodicAgenda] = useState<boolean>(false)

    //first 4 states related to Dates of period
    const [startPeriodicAgendaDate, setStartPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [endPeriodicAgendaDate, setEndPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [periodicAgendaDates, setPeriodicAgendaDates] = useState<{ start: string, end: string }>({ start: '', end: '' })
    const [isPeriodicAgendaDates, setIsPeriodicAgendaDates] = useState<boolean>(false)
    // activities Receptions section
    const [allDaysOfPeriod, setAllDaysOfPeriod] = useState<Date[]>()
    const [copyOfAllDaysOfPeriod, setCopyOfAllDaysOfPeriod] = useState<Date[]>([])
    const [periodLength, setPeriodLength] = useState<number>()
    const [datesCounter, setDatesCounter] = useState<number>(0)
    const [isActivityRepeating, setIsActivityRepeating] = useState<boolean>(false)
    const [repetitionNumber, setRepetitionNumber] = useState<number>(-1)

    const [isWorkShop, setIsWorkShop] = useState<boolean>(false)
    
    const [imgPreview, setImgPreview] = useState<string>('')
    const [activity, setActivity] = useState<Tactivity>({ date: null, hoursRange: { start: null, end: null }, name: '', classOrWorkshop: 'שיעור', teacher: 'יאיר שורץ', location: 'בית פעם רחוב הדקלים 92, פרדס חנה-כרכור', practitioners: [], isCanceled: false, workshop:undefined})
    const [workshop, setWorkshop] = useState<Tworkshop>({id:'', activityId: '', title: '', subTitle: '', img:'', imgUrl: '', desc: '', activityStartTime:activity.hoursRange.start, activityEndTime:activity.hoursRange.end, date:activity.date, lastDateForRegistration:null, price:'', activityLocation:activity.location })
    
    const [isPreviewDisplayShown, setIsPreviewDisplayShown] = useState<boolean>(false)
    const [isMsgShown, setIsMsgShown] = useState<boolean>(false)
    const [userMsg, setUserMsg] = useState<TuserMsgProps>()

    const [error, setError] = useState<string>('')

    const [isWorkInProgress, setIsWorkInProgress] = useState<boolean>(true)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {

        if (startPeriodicAgendaDate && endPeriodicAgendaDate) {
            getAllDaysOfPeriod(startPeriodicAgendaDate, endPeriodicAgendaDate)
        }
    }, [startPeriodicAgendaDate, endPeriodicAgendaDate])




    useEffect(() => {
        if (periodicAgendaDates.start && periodicAgendaDates.end) {
            if (!isPreviewDisplayShown) {
                addPeriodicAgendaDates()
                setIsPeriodicAgendaDates(true)
            }

        }
    }, [periodicAgendaDates.start, periodicAgendaDates.end])


    const getAllDaysOfPeriod = (startPeriodicAgendaDate: Date, endPeriodicAgendaDate: Date) => {
        let dates = [];
        let currentDate = new Date(startPeriodicAgendaDate);

        // Ensure endDate is at least one day after startDate
        endPeriodicAgendaDate = new Date(endPeriodicAgendaDate);
        endPeriodicAgendaDate.setDate(endPeriodicAgendaDate.getDate() + 1);

        while (currentDate < endPeriodicAgendaDate) {
            dates.push(new Date(currentDate)); // Add currentDate to the array
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
        setAllDaysOfPeriod(dates)
        setCopyOfAllDaysOfPeriod(dates)
        setPeriodLength(dates.length)

    }

    const handelWorkShopChange=(field: string, value: string|Date|null)=>{
        setWorkshop(prevSate => ({
            ...prevSate,
            [field]: value
        }))
    }

    const handelDateChange = (currDate: Date | null | undefined) => {
        setActivity(prevState => ({
            ...prevState,
            date: currDate
        }))
        // setActivityDate(currDate);
    };

    const handelActivityChange = (field: string, value: string) => {
        setActivity(prevSate => ({
            ...prevSate,
            [field]: value
        }))
    }

    const updateTime = (currDate: Date | null | undefined,timeKey: "start" | "end") => {
        if (!currDate) return;

        const newTime = new Date(currDate);
        if (isNaN(newTime.getTime())) return;

        const { start, end } = activity.hoursRange;

        const isValid = 
            timeKey === "start" 
                ? !end || chackTimeValid(newTime.getTime(), new Date(end).getTime())
                : !start || chackTimeValid(new Date(start).getTime(), newTime.getTime());

        if (isValid) {
            setActivity((prev) => ({
                ...prev,
                hoursRange: { 
                    ...prev.hoursRange, 
                    [timeKey]: currDate 
                },
            }));
            setWorkshop((prev) => ({
                ...prev,
              [timeKey==='start'?'activityStartTime':'activityEndTime']:currDate
                ,
            }));
        } else {
            setError("זמן ההתחלה חייב להיות לפני זמן הסיום");
            setTimeout(() => setError(""), 7500);
        }
    };

    const handelTimeChange = (currDate: Date | null | undefined,startEnd: "start" | "end") => {
        updateTime(currDate, startEnd);
    }

    const chackTimeValid = (startTime: number, endTime: number) => {
        if (startTime && endTime) {
            return startTime < endTime ? true : false
        }

    }
    const addPeriodicAgendaDates = () => {
        let newPeriodicAgenda = {
            date: periodicAgendaDates,
            activities: []
        }
        setPeriodicAgenda({ ...newPeriodicAgenda })
    }

    const addActivity = () => {
        let updatedPeriodicAgenda: TperiodicAgenda = { ...periodicAgenda }
        if(activity.classOrWorkshop==='סדנא'){
            if(!workshop.title||!workshop.subTitle||!workshop.imgUrl ||!workshop.desc){
                setError('יש למלא את כל השדות הסדנא שם תאריך ושעות פעילות')
                getUserMsg({ msg: 'הוספת פעילות נכשלה', isSuccess: false })
                setTimeout(() => { setError('') }, 5500);
                return
            }
        }else {
            if (!activity.date || !activity.hoursRange.start || !activity.hoursRange.end || !activity.name ) {
    
                setError('יש למלא את כל השדות שם תאריך ושעות פעילות')
                getUserMsg({ msg: 'הוספת פעילות נכשלה', isSuccess: false })
                setTimeout(() => { setError('') }, 5500);
                return
            }

        }
        //TODO: get number of repetitions options are n>0  n<0
        // if number of repetitions smaller than 0 add this activity for all days of period
        // if number of repetitions is 0 no repetitions 
        // if n>0 add this DAY activity n times
        if (isActivityRepeating) {
            const day = activity.date.getDay()
            const allOccurrences = allDaysOfPeriod?.filter(date => date.getDay() === day) //all of sundays foe example
            const allOccurrences1 = copyOfAllDaysOfPeriod?.filter(date => date.getDay() === day)
            if (repetitionNumber < 0) {// in this case find the day of week and find all occurences and push them to activity 
                if (allOccurrences?.length) {//this state keep an array of all the dates of the period and later updateDateCounter function  will splice it until noting is left , to let user know in if all the days we wanted were added-displayed at the top of the page
                    updatePeriodicAgenda(allOccurrences, updatedPeriodicAgenda, null)

                } else {// when there is nothing left in the allDaysOfPeriod we start using the copyOfAllDaysOfPeriod
                    updatePeriodicAgenda(allOccurrences1, updatedPeriodicAgenda, null)
                    return
                }
                updateDateCounter(null, allOccurrences)
                return
            }
            if (repetitionNumber > 0) {
                // looping through all occurrences to understand if user selected the first sunday or secound sunday and so on -(for exp) 
                const indexOfStartDate = allOccurrences1.findIndex(date => stripTime(date).getTime() === stripTime(activity.date).getTime())

                if (indexOfStartDate) {
                    if (indexOfStartDate > 0) {//if it is bigger than 0 it means that our day is not the first one in period, might be the secound 
                        const arrayOfTheSameDayOfWeekStartingFromSpecificDate: Date[] = []
                        //here I find the index of selected dated , and than looping throgh allOccurences(sundays (for exp) of all the time period) and than taking days from the selected date util we reach to the end
                        allOccurrences1?.forEach(currDate => {
                            const index = allOccurrences1.findIndex(date => stripTime(date).getTime() === stripTime(currDate).getTime())
                            index >= indexOfStartDate &&
                                arrayOfTheSameDayOfWeekStartingFromSpecificDate.push(currDate)
                        }
                        )
                        let nOfOccurrences = arrayOfTheSameDayOfWeekStartingFromSpecificDate.slice(0, repetitionNumber)
                        updatePeriodicAgenda(nOfOccurrences, updatedPeriodicAgenda, null)
                        return
                    }
                }
                let nOccurrences = allOccurrences?.slice(0, repetitionNumber)
                if (nOccurrences?.length) {//when not all of the dates of period where pushed to periodic Agenda
                    updatePeriodicAgenda(nOccurrences, updatedPeriodicAgenda, null)

                } else {//when all of the dates of the period got pushed into periodic Agenda
                    const nOccurrences1 = allOccurrences1?.slice(0, repetitionNumber)
                    updatePeriodicAgenda(nOccurrences1, updatedPeriodicAgenda, null)
                    return
                }
                updateDateCounter(null, nOccurrences)
                return
            }
        }
        updatePeriodicAgenda(null, updatedPeriodicAgenda, activity.date)
        updateDateCounter(activity.date, null)

    }
    const updatePeriodicAgenda = (dates: Date[] | null, updatedPeriodicAgenda: TperiodicAgenda, singleDate: Date | null) => {
        if (singleDate) {
            const activityId = makeId()
            const newActivity: Tactivity = workshop.title?{...activity,id:activityId,name:workshop.title,workshop:{...workshop,id:makeId(),activityId,date:activity.date,}}:undefined
            updatedPeriodicAgenda.activities?.push(newActivity?newActivity:{ ...activity ,id:activityId})
            
        } else {
            dates?.forEach(date => {
                const activityId = makeId()
                const newActivity: Tactivity = 
                workshop.title?
                {...activity,id:activityId,date,name:workshop.title,workshop:{...workshop,id:makeId(),activityId,date:activity.date,}}
                :{...activity ,date,id:activityId}
                updatedPeriodicAgenda.activities?.push({ ...newActivity })
            })
        }
        setPeriodicAgenda({ ...updatedPeriodicAgenda })

        resetDateTime()
        resetWorkShopState()
        console.log('calling user messege', periodicAgenda);
        getUserMsg({ msg: singleDate ? `פעילות נוספה בהצלחה ` : `${dates?.length} פעיליות נוספו בהצלחה `, isSuccess: true })

    }


    const findWorkshopsAndUploadTheirImagesToS3 = async () => {
        const workshopFound = periodicAgenda.activities.some(activity => activity.classOrWorkshop === 'סדנא')
        if (!workshopFound) {
            return false
        }
        let workshops: Tworkshop[] = []

        periodicAgenda.activities.forEach(activity => {
            if (activity.workshop) {
                activity.classOrWorkshop === 'סדנא' ? workshops.push({ ...activity.workshop })
                    : ""

            }
        })
        console.log(' workshops : ', workshops);
        if (workshops.length) {
            const promises = workshops.map(workshop => {
                return uploadImagesTos3(workshop.img)

            })

            const uploadedImgs = Promise.all(promises)
            console.log(' logging upload imgs : ', uploadedImgs);
        }

        return workshopFound
    }

    const uploadImagesTos3 = async (img: string) => {
        const formData = new FormData();
        formData.append('image', img);
        console.log('formData : ', formData);
        const url = getUrl('s3/uploadWorkshopImages/')
        const res = await fetch(url, {
            method: 'POST',
            body: formData
        },)
        if (res.ok) {
            return res.json()
        }
    }

    const updateDateCounter = (date: Date | null, dates: Date[] | null | undefined) => {
        if (date) {
            setDatesCounter(datesCounter + 1)
            const index = allDaysOfPeriod?.findIndex(currDate => stripTime(currDate).getTime() === stripTime(date).getTime())
            if (index || index === 0) {
                if (index !== undefined && index >= 0) {
                    if (allDaysOfPeriod) {
                        const updatedDays = [...allDaysOfPeriod];
                        updatedDays.splice(index, 1);
                        setAllDaysOfPeriod([...updatedDays]);
                    }
                }
            }
        }
        if (dates) {
            setDatesCounter(datesCounter + dates.length)
            const updatedDays = allDaysOfPeriod?.filter(currDate =>
                !dates.some(d => stripTime(d).getTime() === stripTime(currDate).getTime())
            );
            setAllDaysOfPeriod(updatedDays || []);

        }
    }

    const removeSaturdays = () => {
        if (allDaysOfPeriod) {
            let numberOfSaturdays = 0
            allDaysOfPeriod.forEach(date => stripTime(date).getDay() === 6 && numberOfSaturdays++)
            let withOutSaturdays: Date[] = allDaysOfPeriod.filter(currDate => stripTime(currDate).getDay() !== 6)
            setDatesCounter(datesCounter + numberOfSaturdays)
            setAllDaysOfPeriod([...withOutSaturdays])
            getUserMsg({ msg: `${numberOfSaturdays} שבתות הוסרו בהצלחה  `, isSuccess: true })

        }
    }

   
    const resetDateTime = () => {
        setActivity(prev=>({
            ...prev,
            date:null,
            hoursRange:{...prev.hoursRange,start:null,end:null}
        }))
      
    }
    const resetWorkShopState = () => {
        setWorkshop(prev=>({
            ...prev,
            desc:'',
            title:'',
            subTitle:''
        }))
        setImgPreview('')
    }

    const deleteImgPropFromWorkshops = () => {
        const updatedActivities = periodicAgenda.activities.map(activity => {
            if (activity.classOrWorkshop === 'שיעור') {
                return activity
            }
            if (activity.classOrWorkshop === 'סדנא') {
                if (activity.workshop) {
                    delete activity.workshop.img// do not upload the image itself
                    return activity
                } else {
                    return activity
                }
            }
        })
        console.log('updatedActivities', updatedActivities);

        periodicAgenda.activities = updatedActivities
        setPeriodicAgenda({ ...periodicAgenda })
    }

    const createNewWorkshops = async (workshops: Tworkshop[]) => {
        if (workshops.length) {
            const promises = workshops.map(workshop => {
                return createNewWorkShop(workshop)
            })
            const res = Promise.all(promises)
        }

    }

    const getWorkshopsAndPostToDataBase = async () => {
        let workshops: Tworkshop[] = []
        periodicAgenda.activities.forEach(activity => {
            if (activity.classOrWorkshop === 'סדנא') {
                if (activity.workshop) {
                    workshops.push(activity.workshop)
                }
            }
        })

        createNewWorkshops(workshops)
    }

    const modifyWorkshopPropAtActivities = () => {
        periodicAgenda.activities.forEach(activity => {
            if (activity.classOrWorkshop === 'סדנא') {
                if (activity.workshop) {
                    const workshopId = activity.workshop.id
                    activity.workshopId = workshopId
                    delete activity.workshop

                }

            }
        })
        setPeriodicAgenda({ ...periodicAgenda })
    }

    const createNewPeriodicAgenda = async () => {
        try {
            const isOk = confirm(' רק בודק, בטוח שברצונך לפרסם לוז תקופתי?')
            if (isOk) {

                const workshopFound = await findWorkshopsAndUploadTheirImagesToS3()
                if (workshopFound) {
                    // delete img key from all the activities with the key img
                    deleteImgPropFromWorkshops() // deleting img key from activty.workshop because files cant pushed to mongo
                    // find all workshops and creact new at mongo
                    await getWorkshopsAndPostToDataBase()
                    //delete the workshop key from all of the activities and
                    // leave just the id under workshoId to connect them if needed
                    modifyWorkshopPropAtActivities()

                }
                const url = getUrl('periodicAgenda/createPeriodicAgenda/')

                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ periodicAgenda })
                })

                if (res.ok) {
                    const { newPeriodicAgenda } = await res.json()
                    // callUserMsg({ sucsses: true, msg: 'לוח זמנים פורסם בהצלחה' })
                    getUserMsg({ msg: 'לוח זמנים פורסם בהצלחה', isSuccess: true })

                    setTimeout(() => {
                        router.replace('/dashboard')
                    }, 1000);
                    console.log('created a new Periodic Agenda', newPeriodicAgenda)

                } else {
                    throw new Error('faild to create a new periodic Agenda')
                }

            }
        } catch (err) {
            console.log(err);
        }
    }

    const getUserMsg = (userMsg: TuserMsgProps) => {
        console.log('userMsg', userMsg);

        window.scroll(0, 0)
        dispatch(callUserMsg({ msg: userMsg.msg, isSuccess: userMsg.isSuccess }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }

    const handelEditMode = async () => {
        setIsEditCurrPeriodicAgenda(true)
        const res = await getPeriodicAgenda()
        if (res) {
            const currPeriodicAgenda: TperiodicAgenda = res.periodicAgenda

            setPeriodicAgenda({ ...currPeriodicAgenda })
            setStartPeriodicAgendaDate(getDateType(currPeriodicAgenda.date.start))
            setEndPeriodicAgendaDate(getDateType(currPeriodicAgenda.date.end))
            setIsPeriodicAgendaDates(true)
        }

    }

    const EditPeriodOrCreateNewProps = {
        setStartPeriodicAgendaDate,
        setEndPeriodicAgendaDate,
        startPeriodicAgendaDate,
        endPeriodicAgendaDate,
        setPeriodicAgendaDates,
        periodicAgendaDates,
        handelEditMode
    }
    const PreviewDisplayProps = {
        isEditCurrPeriodicAgenda,
        setIsPreviewDisplayShown,
        periodicAgenda,
        isPreview: true,
        startPeriodicAgendaDate,
        endPeriodicAgendaDate,
        isWorkInProgress,
        setPeriodicAgenda,
        isPreviewDisplayShown,
        getUserMsg

    }
    const PeriodicAgendaFromProps = {
        periodicAgenda,
        isEditCurrPeriodicAgenda,

        isMsgShown,
        userMsg,
        setIsMsgShown,
        error,
        handelTimeChange,

        imgPreview, setImgPreview,
        setIsWorkShop, isWorkShop,
        isActivityRepeating,
        repetitionNumber,
        handelDateChange,
        setIsActivityRepeating,
        setRepetitionNumber,

        setIsPreviewDisplayShown,
        createNewPeriodicAgenda,
        addActivity,
        removeSaturdays,

        periodicAgendaDates,
        startPeriodicAgendaDate,
        endPeriodicAgendaDate,
        datesCounter,
        periodLength,
        allDaysOfPeriod,
        activity,workshop,
        handelActivityChange,
        handelWorkShopChange,
        getUserMsg
    }

    return (
        !isPeriodicAgendaDates ?
            <EditPeriodOrCreateNew {...EditPeriodOrCreateNewProps} />


            :
            isPreviewDisplayShown ?
                <PeriodicAgendaPreviewDisplay {...PreviewDisplayProps} />
                :
                <PeriodicAgendaForm {...PeriodicAgendaFromProps} />
    )
}