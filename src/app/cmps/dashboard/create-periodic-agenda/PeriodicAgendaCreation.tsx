"use client"

import React, { useEffect, useState } from 'react'
import PeriodicAgendaPreviewDisplay from './PeriodicAgendaPreviewDisplay'
import PeriodDates from './PeriodDates'
import { Tactivity, TperiodicAgenda, TuserMsgProps } from '@/app/types/types'
import { getUrl, makeId, stripTime } from '@/app/util'
import PeriodicAgendaForm from './PeriodicAgendaForm'
import { useRouter } from 'next/navigation'


export default function PeriodicAgendaCreation() {
    // this state contains all the info regarding the period-a quoter  
    const [periodicAgenda, setPeriodicAgenda] = useState<TperiodicAgenda>()
    //first 4 states realted to Dates of period
    const [startPeriodicAgendaDate, setStartPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [endPeriodicAgendaDate, setEndPeriodicAgendaDate] = useState<Date | null | undefined>(null)
    const [periodicAgendaDates, setPeriodicAgendaDates] = useState<{ start: string, end: string }>({ start: '', end: '' })
    const [isPeriodicAgendaDates, setIsPeriodicAgendaDates] = useState<boolean>(false)

    const [allDaysOfPeriod, setAllDaysOfPeriod] = useState<Date[]>()
    const [copyOfAllDaysOfPeriod, setCopyOfAllDaysOfPeriod] = useState<Date[]>([])
    const [periodLength, setPeriodLength] = useState<number>()
    const [datesCounter, setDatesCounter] = useState<number>(0)
    // avtivities Repeations section
    const [isActivityRepeating, setIsActivityRepeating] = useState<boolean>(false)
    const [repeationNumber, setRrepeationNumber] = useState<number>(-1)


    const [activityDate, setActivityDate] = useState<Date | null | undefined>(null)

    const [activityStartTime, setActivityStartTime] = useState<Date | null | undefined>(null)
    const [activityEndTime, setActivityEndTime] = useState<Date | null | undefined>(null)
    const [activityName, setActivityName] = useState<string>('אשטנגה')
    const [activityType, setActivityType] = useState<string>('שיעור')
    const [activityTeacher, setActivityTeacher] = useState<string>('יאיר שוורץ')
    const [activityLocation, setActivityLocation] = useState<string>('בית פעם רחוב הדקלים 92, פרדס חנה-כרכור')

    const [isPreviewDisplayShown, setIsPreviewDisplayShown] = useState<boolean>(false)
    const [isMsgShown, setIsMsgShown] = useState<boolean>(false)
    const [userMsg, setUserMsg] = useState<TuserMsgProps>()

    const [error, setError] = useState<string>('')
    
    const [isWorkInProgress, setIsWorkInProgress] = useState<boolean>(true)
   const router = useRouter()

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
        console.log('all Days Of Period length', dates.length);

        setAllDaysOfPeriod(dates)
        setCopyOfAllDaysOfPeriod(dates)
        setPeriodLength(dates.length)

    }

    const chackDateInPeriod = (dateToChack: Date) => {
        if (allDaysOfPeriod) {
            console.log('chacking if Date is part of Period', allDaysOfPeriod);

            const index = allDaysOfPeriod.findIndex(date => stripTime(date).getTime() === stripTime(dateToChack).getTime());
            if (index !== -1) {
                return true
            } else {
                return false
            }
        }

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
                        console.log('hi');
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
        if (!activityDate || !activityStartTime || !activityEndTime) {
            setError('יש למלא תאריך ושעות פעילות')
            callUserMsg({ sucsses: false, msg: 'הוספת פעילות נכשלה' })
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
        callUserMsg({ sucsses: true, msg: singelDate ? `פעילות נוספה בהצלחה ` : `${dates?.length} פעיליות נוספו בהצלחה ` })
        console.log('periodicAgenda', periodicAgenda);

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
            callUserMsg({ sucsses: true, msg: `שבתות הוסרו בהצלחה ${numberOfSaturdays}` })

        }
    }
    const createActivity = (date: any) => {
        return {
            id: makeId(),
            date: date,
            name: activityName,
            hoursRange: {
                start: activityStartTime,
                end: activityEndTime
            },
            classOrWorkshop: activityType,
            teacher: activityTeacher,
            location: activityLocation,
            isCanceled:false,
            reasonOfCancelation:'שיעור מבוטל',
            practitioners: []
        }
    }
    const callUserMsg = (userMsg: TuserMsgProps) => {
        window.scroll(0, 0)
        setIsMsgShown(true)
        setUserMsg(userMsg)
    }
    const resetDateTime = () => {
        setActivityDate(null)
        setActivityStartTime(null)
        setActivityEndTime(null)
    }

    const createNewPeriodicAgenda = async () => {
        try {
            const url = getUrl('periodicAgenda/createPeriodicAgenda/')

            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ periodicAgenda })
            })
            
            if (res.ok) {
                const { newPeriodicAgenda } = await res.json()
                callUserMsg({ sucsses: true, msg: 'לוח זמנים פורסם בהצלחה' })
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
        isPreviewDisplayShown  ,
        callUserMsg      

    }
    const PeriodicAgendaFromProps = {
        isMsgShown,
        userMsg,
        setIsMsgShown,
        error,
        activityEndTime,
        activityStartTime,
        handelTimeChange,

        activityDate,

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
    }

    return (
        !isPeriodicAgendaDates ?
            <PeriodDates {...PeriodDatesProps} />
            :
            isPreviewDisplayShown ?
                <PeriodicAgendaPreviewDisplay {...PreviewDisplayProps} />
                :
                <PeriodicAgendaForm {...PeriodicAgendaFromProps} />


    )
}