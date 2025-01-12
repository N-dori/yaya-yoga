import DatesBackForwordSvg from '@/app/assets/svgs/DatesBackForwordSvg'
import { Tactivity } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import { stripTime } from '@/app/utils/util'
import DatesOfActivitiesList from './DatesOfActivitiesList'

type DatesOfActivitiesProps = {
    activities: Tactivity[],
    setCurrDate: (date: Date) => void,
    currDate: Date,
    isOnCancelMode: boolean,
    setIsOnCancelMode: (b: boolean) => void
}

export default function DatesOfActivitiesIndex({ activities, setCurrDate, currDate, }: DatesOfActivitiesProps) {
    const hebrewMonths = [
        "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
        "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
      ]
    
      const hebrewDays = [
        "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת",
      ]
    const PAGE = 3
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(PAGE)
    const [threeDays, setThreeDays] = useState<Tactivity[] | undefined[]>()
    const [sevenDays, setSevenDays] = useState<Tactivity[] | undefined[]>()
    // in some cases , there more than one activity on a specific date
    // we want to keep a quine list of dates 
    const [uniqueDates, setUniqueDates] = useState<Tactivity[]>([])

    useEffect(() => {
        if (activities?.length) {
            getDates()
            // console.log('datesIndex : ',activities);
            
        }

    }, [activities.length, currDate])


    const getUniqueDates = (activities: Tactivity[]) => {
        let uniqueDates: Tactivity[] = activities.filter((activity, index, activities) =>
            index === activities.findIndex((currActivity) => {
                if (currActivity.date && activity.date) {

                    return new Date(currActivity?.date).getTime() === new Date(activity.date).getTime()
                }
            })
        );
        setUniqueDates([...uniqueDates])
        return uniqueDates
    }
    const findDateIndex = (date: Date, activities: Tactivity[]) => {        
        const dateIndex = activities.findIndex(activityDay => {
            if (activityDay) {
                if (activityDay.date) {
                    if (!isNaN(new Date(activityDay.date).getTime())) {// Check if the date is valid
                        return (stripTime(activityDay.date).getTime() === stripTime(date).getTime())

                    }
                }

            }
        })
        return dateIndex
    }
    const sortDates = (activities: Tactivity[]) => {
        let sortRes: Tactivity[] = []

        if (activities) {
            sortRes = activities.sort((a: Tactivity, b: Tactivity) => {
                if (!a.date || !b.date) return 0;
                if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1
                if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1
                return 0
            });
        }

        if (sortRes) {
            return sortRes
        }
    }

    const getDates = () => {
        let sortRes = sortDates(activities)
        let sortedThreeDays: Tactivity[]
        let uniqueDates = getUniqueDates(sortRes)
        setSevenDays(uniqueDates)
        let todayIndex = findDateIndex(currDate, uniqueDates)
        console.log('todayIndex',todayIndex);
        
        if(todayIndex === -1 ){
            todayIndex= 0
        }

        let startIndex: number = 0
        let endIndex: number = 0

        if (todayIndex % 2 === 0) {
            startIndex += todayIndex
            endIndex += (todayIndex + PAGE)
        } else {
            startIndex += (todayIndex - 1)
            endIndex += (todayIndex - 1) + PAGE
        }
        if (endIndex > uniqueDates.length) {
            startIndex = uniqueDates.length - PAGE
            endIndex = uniqueDates.length

        }

        sortedThreeDays = uniqueDates.slice(startIndex, endIndex)
        setStartIndex(startIndex)
        setEndIndex(endIndex)
        setThreeDays(sortedThreeDays)
    }
   

    const datesForwordSvgProps = {
        PAGE,
        startIndex,
        endIndex,
        setStartIndex,
        setEndIndex,
        isRotate: false,
        totalLength: uniqueDates.length,
        setCurrDate, currDate,
    }
    const datesBackwordSvgProps = {
        PAGE,
        startIndex,
        endIndex,
        setStartIndex,
        setEndIndex,
        isRotate: true,
        totalLength: uniqueDates.length,
        setCurrDate, currDate,
    }
 const threeDatesOfActivitiesListProps = {
    hebrewDays,hebrewMonths,  setCurrDate,currDate,activities:threeDays
 }
 const sevenDatesOfActivitiesListProps = {
    hebrewDays,hebrewMonths, setCurrDate,currDate,activities:sevenDays
 }

    return (
        <section className='days-activities-container flex-jc-ac'>
            <DatesBackForwordSvg  {...datesBackwordSvgProps} />
                <div className='three-days w100'>
                <DatesOfActivitiesList {...threeDatesOfActivitiesListProps}/>
                </div>
                <div className='seven-days w100'>
                <DatesOfActivitiesList {...sevenDatesOfActivitiesListProps}/>
                <section className='explicit-date pb-1'>יום {hebrewDays[currDate.getDay()]}, {currDate.getDate()} {hebrewMonths[currDate.getMonth()]}</section>
                </div>

            <DatesBackForwordSvg {...datesForwordSvgProps} />
        </section>)
}