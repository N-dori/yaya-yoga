"use client"

import React, { useEffect, useState } from 'react'
import PeriodicAgendaPreviewDisplay from './PeriodicAgendaPreviewDisplay'
import PeriodDates from './PeriodDates'
import { Tactivity, TperiodicAgenda, TuserMsgProps, Tworkshop } from '@/app/types/types'
import { createNewWorkShop, getDateType, getPreiodicAgenda, getUrl, makeId, stripTime } from '@/app/utils/util'
import PeriodicAgendaForm from './PeriodicAgendaForm'
import { useRouter } from 'next/navigation'
import { callUserMsg, hideUserMsg, } from '@/app/store/features/msgSlice'
import { useDispatch } from 'react-redux'

export default function PeriodicAgendaCreation() {
    // this state contains all the info regarding the period-a quoter  
    const [periodicAgenda, setPeriodicAgenda] = useState<TperiodicAgenda>()

    const [isEditCurrPeriodicAgenda, setIsEditCurrPeriodicAgenda ] = useState<boolean>(false)
    
    //first 4 states realted to Dates of period
    const [startPeriodicAgendaDate, setStartPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [endPeriodicAgendaDate, setEndPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [periodicAgendaDates, setPeriodicAgendaDates] = useState<{ start: string, end: string }>({ start: '', end: '' })
    const [isPeriodicAgendaDates, setIsPeriodicAgendaDates] = useState<boolean>(false)
    // avtivities Repeations section
    const [allDaysOfPeriod, setAllDaysOfPeriod] = useState<Date[]>()
    const [copyOfAllDaysOfPeriod, setCopyOfAllDaysOfPeriod] = useState<Date[]>([])
    const [periodLength, setPeriodLength] = useState<number>()
    const [datesCounter, setDatesCounter] = useState<number>(0)
    const [isActivityRepeating, setIsActivityRepeating] = useState<boolean>(false)
    const [repeationNumber, setRrepeationNumber] = useState<number>(-1)

    const [isWorkShop, setIsWorkShop] = useState<boolean>(false)
    const [workshopTitle, setWorkshopTitle] = useState<string>('')
    const [workshopSubTitle, setWorkshopSubTitle] = useState<string>('')
    const [workshopDesc, setWorkshopDesc] = useState<string>('')
    const [lastDateForRegistration, setLastDateForRegistration] = useState<Date>(null)
    const [imgPreview, setImgPreview] = useState<string>('')
    const [imgLink, setImgLink] = useState<string>('')
    const [img, setImg] = useState<string>('')
    const [price, setPrice] = useState<string|number>('')


    const [activityDate, setActivityDate] = useState<Date | null | undefined>(null)

    const [activityStartTime, setActivityStartTime] = useState<Date | null | undefined>(null)
    const [activityEndTime, setActivityEndTime] = useState<Date | null | undefined>(null)
    const [activityName, setActivityName] = useState<string>('אשטנגה')
    const [activityType, setActivityType] = useState<string>('שיעור')
    const [activityTeacher, setActivityTeacher] = useState<string>('יאיר שורץ')
    const [activityLocation, setActivityLocation] = useState<string>('בית פעם רחוב הדקלים 92, פרדס חנה-כרכור')

    const [isPreviewDisplayShown, setIsPreviewDisplayShown] = useState<boolean>(false)
    const [isMsgShown, setIsMsgShown] = useState<boolean>(false)
    const [userMsg, setUserMsg] = useState<TuserMsgProps>()

    const [error, setError] = useState<string>('')

    const [isWorkInProgress, setIsWorkInProgress] = useState<boolean>(true)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('startPeriodicAgendaDate && endPeriodicAgendaDate out ');
        
        if (startPeriodicAgendaDate && endPeriodicAgendaDate) {
            console.log('startPeriodicAgendaDate && endPeriodicAgendaDate in ');
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
        console.log('all Days Of Period length', dates.length);

        setAllDaysOfPeriod(dates)
        setCopyOfAllDaysOfPeriod(dates)
        setPeriodLength(dates.length)

    }


    const handelDateChange = (currDate: Date | null | undefined) => {
        setActivityDate(currDate);
    };

    const handelTimeChange = (currDate: Date | null | undefined, startEnd: string) => {
        console.log('selected time is  : ', new Date(currDate ? currDate : '').getHours());
        if (currDate) {
            const time = new Date(currDate);
            if (!isNaN(time.getTime())) {
                if (startEnd === 'start') {
                    if (activityEndTime && time) {
                        const isValid = chackTimeValid(new Date(time).getTime(), new Date(activityEndTime).getTime())
                        if (isValid) {
                            setActivityStartTime(currDate)
                        } else {
                            setActivityStartTime(null)
                            setError('זמן ההתחלה חייב להיות לפני זמן  הסיום')
                            setTimeout(() => { setError('') }, 7500);

                            return
                        }
                    } else {
                        setActivityStartTime(currDate)
                    }
                }
                if (startEnd === 'end') {
                    if (activityStartTime && time) {
                        const isValid = chackTimeValid(new Date(activityStartTime).getTime(), new Date(time).getTime())
                        if (isValid) {
                            setActivityEndTime(currDate)
                        } else {
                            setActivityEndTime(null)
                            setError('זמן ההתחלה חייב להיות לפני זמן הסיום')
                            setTimeout(() => { setError('') }, 7500);
                            return
                        }
                    } else {
                        setActivityEndTime(currDate)
                    }
                }
            }
        }
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

        if (!activityDate || !activityStartTime || !activityEndTime || !activityName) {
            setError('יש למלא תאריך ושעות פעילות')
            getUserMsg({ msg: 'הוספת פעילות נכשלה', isSucsses: false })
            setTimeout(() => { setError('') }, 5500);
            return
        }
        //TODO: get number of repeations options are n>0  n<0
        // if number of repeations smaller than 0 add this activity for all days of period
        // ifnumber of repeations is 0 no repeation 
        // if n>0 add this DAY activity n times
        if (isActivityRepeating) {
            const day = activityDate.getDay()
            const allOccurences = allDaysOfPeriod?.filter(date => date.getDay() === day) //all of sundays foe example
            const allOccurences1 = copyOfAllDaysOfPeriod?.filter(date => date.getDay() === day)
            if (repeationNumber < 0) {// in this case find the day of week and find all occurences and push them to activity 
                if (allOccurences?.length) {//this state keep an array of all the dates of the period and later updateDateCounter function  will splice it until noting is left , to let user know in if all the days we wanted were added-displayed at the top of the page
                    updatePeriodicAgenda(allOccurences, updatedPeriodicAgenda, null)

                } else {// when there is nothing left in the allDaysOfPeriod we start using the copyOfAllDaysOfPeriod
                    updatePeriodicAgenda(allOccurences1, updatedPeriodicAgenda, null)
                    return
                }
                console.log('allOccurences', allOccurences);
                updateDateCounter(null, allOccurences)
                return
            }
            if (repeationNumber > 0) {
                // looping throgh all Occurences to understand if user selected the first sunday or secound sunday and so on -(for exp) 
                const indexOfStartDate = allOccurences1.findIndex(date => stripTime(date).getTime() === stripTime(activityDate).getTime())

                if (indexOfStartDate) {
                    if (indexOfStartDate > 0) {//if it is bigger than 0 it means that our day is not the first one in period, might be the secound 
                        const arrayOfTheSameDayOfWeekStartingFromAspecificDate: Date[] = []
                        //here I find the index of selected dated , and than looping throgh allOccurences(sundays (for exp) of all the time period) and than taking days from the selected date util we reach to the end
                        allOccurences1?.forEach(currDate => {
                            const index = allOccurences1.findIndex(date => stripTime(date).getTime() === stripTime(currDate).getTime())
                            index >= indexOfStartDate &&
                                arrayOfTheSameDayOfWeekStartingFromAspecificDate.push(currDate)
                        }
                        )
                        console.log('arrayOfTheSameDayOfWeekStartingFromAspecificDate', arrayOfTheSameDayOfWeekStartingFromAspecificDate);
                        let nOfOccurences = arrayOfTheSameDayOfWeekStartingFromAspecificDate.slice(0, repeationNumber)
                        updatePeriodicAgenda(nOfOccurences, updatedPeriodicAgenda, null)
                        return
                    }
                }
                let nOccurences = allOccurences?.slice(0, repeationNumber)
                if (nOccurences?.length) {//whene not all of the dates of period where pushed to periodic Agenda
                    updatePeriodicAgenda(nOccurences, updatedPeriodicAgenda, null)

                } else {//whene all of the dates of the period got pushed into priodic Agenda
                    const nOccurences1 = allOccurences1?.slice(0, repeationNumber)
                    updatePeriodicAgenda(nOccurences1, updatedPeriodicAgenda, null)
                    return
                }
                updateDateCounter(null, nOccurences)
                return
            }
        }
        updatePeriodicAgenda(null, updatedPeriodicAgenda, activityDate)
        updateDateCounter(activityDate, null)

    }
    const updatePeriodicAgenda = (dates: Date[] | null, updatedPeriodicAgenda: TperiodicAgenda, singelDate: Date | null) => {
        if (singelDate) {
            const newActivity: Tactivity = createActivity(activityDate)
            updatedPeriodicAgenda.activities?.push({ ...newActivity })

        } else {
            dates?.forEach(date => {
                const newActivity: Tactivity = createActivity(date)
                updatedPeriodicAgenda.activities?.push({ ...newActivity })
            })
        }
        setPeriodicAgenda({ ...updatedPeriodicAgenda })

        resetDateTime()
        resetWorkShopState()
        console.log('calling user messege', periodicAgenda);
        getUserMsg({ msg: singelDate ? `פעילות נוספה בהצלחה ` : `${dates?.length} פעיליות נוספו בהצלחה `, isSucsses: true })

    }


    const findWorkshopsAndUploadTheirImagesToS3 = async () => {
        // if(isEditCurrPeriodicAgenda)
        const workshopFound = periodicAgenda.activities.some(activity => activity.classOrWorkshop === 'סדנא')
        if (!workshopFound) {
            return false
        }
        let workshops: Tworkshop[] = []

        periodicAgenda.activities.forEach(activity => {
            if(activity.workshop){
                activity.classOrWorkshop === 'סדנא' ? workshops.push({ ...activity.workshop })
                    : ""
                
            }
        })
        console.log(' workshops : ', workshops);
        if(workshops.length){
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
            getUserMsg({ msg: `${numberOfSaturdays} שבתות הוסרו בהצלחה  `, isSucsses: true })

        }
    }

    const createActivity = (date: any) => {
        return {
            id: makeId(),
            date: date,
            name: activityType === 'שיעור' ? activityName : workshopTitle,
            hoursRange: {
                start: activityStartTime,
                end: activityEndTime
            },
            classOrWorkshop: activityType,
            workshop: workshopTitle ? { id: makeId(), title: workshopTitle, subTitle: workshopSubTitle, img, imgUrl: imgLink, desc: workshopDesc, activityStartTime, activityEndTime, date , lastDateForRegistration,price ,activityLocation} : undefined,
            teacher: activityTeacher,
            location: activityLocation,
            isCanceled: false,
            reasonOfCancelation: 'שיעור מבוטל',
            practitioners: []
        }
    }


    const resetDateTime = () => {
        setActivityDate(null)
        setActivityStartTime(null)
        setActivityEndTime(null)
    }
    const resetWorkShopState = () => {
        setWorkshopDesc('')
        setWorkshopSubTitle('')
        setWorkshopTitle('')
        setImgPreview('')
    } 

    const deleteImgPropFromWorkshops = () => {
        const updatedActivities = periodicAgenda.activities.map(activity => {
            if (activity.classOrWorkshop === 'שיעור') {
                return activity
            }
            if (activity.classOrWorkshop === 'סדנא') {
                if(activity.workshop){
                    delete activity.workshop.img// do not upload the image itself
                    return activity
                }else{
                    return activity
                }
            }
        })
        console.log('updatedActivities', updatedActivities);

        periodicAgenda.activities = updatedActivities
        setPeriodicAgenda({ ...periodicAgenda })
    }
    
    const createNewWorkshops = async (workshops: Tworkshop[]) => {
        if(workshops.length){
            const promises = workshops.map(workshop => {
                return createNewWorkShop(workshop)
            })
            const res = Promise.all(promises)
            console.log('workshops', res);

        }

    }

    const getWorkshopsAndPostToDataBase =async () => {
     let  workshops :Tworkshop[]= []  
      periodicAgenda.activities.forEach(activity =>
        {
            if(activity.classOrWorkshop ==='סדנא'){
                if(activity.workshop){
                    workshops.push(activity.workshop) 
                }
        }})
        
        createNewWorkshops(workshops)
    }

     const modifyWorkshopPropAtActivities = () => {
        periodicAgenda.activities.forEach(activity => {
            if(activity.classOrWorkshop ==='סדנא'){
                if(activity.workshop){
                    const workshopId =  activity.workshop.id
                    activity.workshopId=workshopId
                    delete activity.workshop

                }
                
        }
        })
        setPeriodicAgenda({...periodicAgenda})
     }

    const createNewPeriodicAgenda = async () => {
        try {
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
                getUserMsg({ msg: 'לוח זמנים פורסם בהצלחה', isSucsses: true })

                setTimeout(() => {
                    router.replace('/dashboard')
                }, 1000);
                console.log('created a new Periodic Agenda', newPeriodicAgenda)

            } else {
                throw new Error('faild to create a new periodic Agenda')
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getUserMsg = (userMsg: TuserMsgProps) => {
        console.log('userMsg', userMsg);

        window.scroll(0, 0)
        dispatch(callUserMsg({ msg: userMsg.msg, isSucsses: userMsg.isSucsses }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }

    const handelEditMode = async () => {
        setIsEditCurrPeriodicAgenda(true)
        const res = await getPreiodicAgenda()
        if(res){
            const currPeriodicAgenda :TperiodicAgenda = res.periodicAgenda

            console.log('currPeriodicAgenda',currPeriodicAgenda);
            setPeriodicAgenda({...currPeriodicAgenda})
            setStartPeriodicAgendaDate(getDateType(currPeriodicAgenda.date.start))
            setEndPeriodicAgendaDate(getDateType(currPeriodicAgenda.date.end))
            setIsPeriodicAgendaDates(true)
        }
        
    }

    const PeriodDatesProps = {
        setStartPeriodicAgendaDate,
        setEndPeriodicAgendaDate,
        startPeriodicAgendaDate,
        endPeriodicAgendaDate,
        setPeriodicAgendaDates,
        periodicAgendaDates
    }
    const PreviewDisplayProps = {
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
        activityEndTime,
        activityStartTime,
        handelTimeChange,

        activityDate,
        price, setPrice,
        imgPreview, setImgPreview,
        imgLink, setImgLink,
        img, setImg,
        setIsWorkShop, isWorkShop,
        workshopTitle, setWorkshopTitle,
        workshopSubTitle, setWorkshopSubTitle,
        workshopDesc, setWorkshopDesc,
        lastDateForRegistration, setLastDateForRegistration,
        isActivityRepeating,
        repeationNumber,
        handelDateChange,
        setIsActivityRepeating,
        setRrepeationNumber,
        activityName,
        setActivityName,
        activityType,
        setActivityType,
        activityTeacher,
        setActivityTeacher,
        activityLocation,
        setActivityLocation,

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

        getUserMsg
    }

    return (
        !isPeriodicAgendaDates ?
            <>
            <PeriodDates {...PeriodDatesProps} />
            <section className='flex-col flex-jc-ac gap1' >
            <span className='slash mt-1 mb-1'>/</span>
            <button type='button' className='btn' onClick={handelEditMode} >לעריכה של לוז נוכחי</button>

            </section>
            </>
            :
            isPreviewDisplayShown ?
                <PeriodicAgendaPreviewDisplay {...PreviewDisplayProps} />
                :
                <PeriodicAgendaForm {...PeriodicAgendaFromProps} />
    )
}