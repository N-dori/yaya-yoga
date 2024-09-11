import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivitiesPreview from './DaysOfActivitiesPreview'
import DaysBackForwordSvg from '@/app/assets/svgs/DaysBackForwordSvg'
import { stripTime } from '@/app/util'

type DaysOfActivitiesProps = {
    activities: Tactivity[] | undefined
    setCurrDate: (date: Date) => void
    currDate: Date
    isOnSearchMode: boolean
    isOnCancelMode: boolean
    setIsOnCancelMode: (b: boolean) => void

}

export default function DaysOfActivities({ setIsOnCancelMode, isOnCancelMode, isOnSearchMode, setCurrDate, activities, currDate }: DaysOfActivitiesProps) {

    const PAGE = 3
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(PAGE)
    const [threeDays, setThreeDays] = useState<Tactivity[] | undefined[]>()
    // in some cases , there more than one activity on a spcific date
    // we want to keep a quniue list of dates 
    const [uniqueActivities, setUniqueActivities] = useState<Tactivity[]>([])

    const [isDisplayedFirstTime, setIsDisplayedFirstTime] = useState<boolean>(true)

    useEffect(() => {
        sortDays()

        if (activities) {
            sortDays()
            setIsDisplayedFirstTime(!isDisplayedFirstTime)
        }

    }, [])
    useEffect(() => {

    }, [currDate, isOnCancelMode])


    useEffect(() => {
        if (!isDisplayedFirstTime) {

            getPage()
        }
    }, [startIndex, endIndex, activities,isOnSearchMode])

    const getPage = () => {
        console.log('getPage functuion some', isOnCancelMode);
        if (isOnCancelMode) {
            const index = uniqueActivities.findIndex(activity => new Date(activity ? activity.date ? activity.date : "" : '').getTime() === new Date(currDate).getTime())
            console.log('rerender on cancel mode index :', index);
            const threeDays = index + PAGE >= uniqueActivities.length ?
                [...uniqueActivities.slice(uniqueActivities.length - PAGE)] :
                [...uniqueActivities.slice(index, index + PAGE)]

            setThreeDays(threeDays)
            setCurrDate(currDate)
            return
        }
        if (startIndex + PAGE >= uniqueActivities.length) {
            const threeDays = [...uniqueActivities.slice(uniqueActivities.length - PAGE)]
            if (threeDays) {
                if (threeDays[0]) {
                    if (threeDays[0].date) {

                        setThreeDays(threeDays)
                        setCurrDate(threeDays[0].date as Date)
                    }
                }
            }
            return
        }
        const threeDays = [...uniqueActivities.slice(startIndex, endIndex)]
        console.log('getting a page', threeDays);
        if (threeDays) {
            if (threeDays[0]) {
                if (threeDays[0].date) {
                    setThreeDays(threeDays)
                    setCurrDate(threeDays[0].date)
                }
            }
        }
    }

    const sortDays = () => {
        let sortRes

        if (activities) {
            sortRes = activities.sort((a: Tactivity, b: Tactivity) => {
                if (!a.date || !b.date) return 0;
                // console.log('new Date(a.date).getTime(', new Date(a.date).getDate());
                if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1
                if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1
                return 0
            });


        }

        if (sortRes) {
            // console.log('sortRes', sortRes);
            getFirstPage(sortRes)
        }
    }
    const getFirstPage = (activities: Tactivity[]) => {
        let sortedThreeDays
        //we dont want to see mulipule time thes same day in activity arrays => removing duplicates because there could be same date with to different lessonss, for the display of the days of the week 
        if (activities) {
            // a way to get new arry with unique resultes : if it is the same date it will return the index but becasue we loop throgth the array two times we if the same date repeats than it wil not be the same index , this way we get only the first Occurnce of a date 
            let uniqueActivities = activities.filter((activity, index, activities) =>
                index === activities.findIndex((currActivity) => {
                    if (currActivity.date && activity.date) {

                        return new Date(currActivity?.date).getTime() === new Date(activity.date).getTime()
                    }

                })
            );
            setUniqueActivities([...uniqueActivities])
            const todayIndex = findDateIndex(currDate, activities)
            console.log('today index :', todayIndex);
            if (todayIndex !== -1) {
                sortedThreeDays = uniqueActivities.slice(todayIndex, todayIndex + PAGE)
                setStartIndex(todayIndex)
                setEndIndex(todayIndex + PAGE)
                setThreeDays(sortedThreeDays)

            }
            if (todayIndex === -1) {
                // -1 because is it probably saturday or a day which is not part of the period so setting current date to be the first date in the array
                if (activities) {
                    if (activities[0]) {
                        if (activities[0].date) {
                            setCurrDate(activities[0].date)
                        }
                    }
                }

                console.log('startIndex :', startIndex);
                console.log('endIndex :', endIndex);
                sortedThreeDays = uniqueActivities.slice(startIndex, endIndex)

                console.log('sortedThreeDays :', sortedThreeDays);
                setThreeDays(sortedThreeDays)
            }
        }
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
    const DaysForwordSvgProps = {
        PAGE,
        startIndex,
        setStartIndex,
        setEndIndex,
        endIndex,
        isRotate: true,
        totalLength: uniqueActivities?.length,
        setIsOnCancelMode

    }
    const DaysBackSvgProps = {
        PAGE,
        startIndex,
        setStartIndex,
        setEndIndex,
        endIndex,
        isRotate: false,
        totalLength: uniqueActivities?.length,
        setIsOnCancelMode


    }

    return (
        !isOnSearchMode && <section className='days-activities-container flex-jc-ac'>
            <DaysBackForwordSvg  {...DaysForwordSvgProps} />
            <ul className='days-container flex-jc-ac gap1'>
                {threeDays ?
                    threeDays.map((activityDay, i) =>
                        <DaysOfActivitiesPreview key={activityDay?.id || i} activityDay={activityDay} setCurrDate={setCurrDate} currDate={currDate} />)
                    : <div> Loading...</div>}
            </ul>
            <DaysBackForwordSvg {...DaysBackSvgProps} />
        </section>
    )
}