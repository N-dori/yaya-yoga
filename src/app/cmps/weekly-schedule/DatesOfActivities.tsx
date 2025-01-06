import DatesBackForwordSvg from '@/app/assets/svgs/DatesBackForwordSvg'
import { Tactivity } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivitiesPreview from '../dashboard/create-periodic-agenda/DaysOfActivitiesPreview'
import { stripTime } from '@/app/utils/util'

type DatesOfActivitiesProps = {
    activities: Tactivity[],
    setCurrDate: (date: Date) => void,
    currDate: Date,
    isOnCancelMode: boolean,
    setIsOnCancelMode: (b: boolean) => void
}
export default function DatesOfActivities({ activities, setCurrDate, currDate, }: DatesOfActivitiesProps) {
    const PAGE = 3
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(PAGE)
    const [threeDays, setThreeDays] = useState<Tactivity[] | undefined[]>()
    // in some cases , there more than one activity on a spcific date
    // we want to keep a quniue list of dates 
    const [uniqueDates, setUniqueDates] = useState<Tactivity[]>([])

    useEffect(() => {
        if (activities?.length) {
            getThreeDays()
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
    const getThreeDays = () => {
        let sortRes = sortDates(activities)
        let sortedThreeDays: Tactivity[]
        let uniqueDates = getUniqueDates(sortRes)
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


    return (
        <section className='days-activities-container flex-jc-ac'>
            <DatesBackForwordSvg  {...datesBackwordSvgProps} />
            <ul className='days-container flex-jc-ac gap1'>
                {threeDays ?
                    threeDays.map((activityDay: Tactivity, i: number) =>
                        <DaysOfActivitiesPreview key={activityDay?.id || i} activityDay={activityDay} setCurrDate={setCurrDate} currDate={currDate} />)


                    : <div> Loading...</div>}
            </ul>

            <DatesBackForwordSvg {...datesForwordSvgProps} />
        </section>)
}