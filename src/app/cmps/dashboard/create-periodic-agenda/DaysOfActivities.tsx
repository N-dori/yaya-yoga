import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivitiesPreview from './DaysOfActivitiesPreview'
import DaysBackForwordSvg from '@/app/assets/svgs/DaysBackForwordSvg'
import { stripTime } from '@/app/util'

type DaysOfActivitiesProps = {
    periodicAgenda: TperiodicAgenda | undefined
    setCurrDate: (date: Date) => void
    currDate: Date

}

export default function DaysOfActivities({ setCurrDate, periodicAgenda, currDate }: DaysOfActivitiesProps) {

    const PAGE = 3
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(PAGE)
    const [threeDays, setThreeDays] = useState<Tactivity[] | undefined[]>()

    useEffect(() => {
        sortDays()
        if (periodicAgenda) {
            if (periodicAgenda.activities) {
                sortDays()
            }
        }
    }, [startIndex, endIndex, periodicAgenda])

    const getPage = (activities: Tactivity[]) => {
        let sortedThreeDays
        //we dont want to see mulipule time the same day => removing duplicates because there could be same date with to different lessonss, for the display of the days of the week 
        if (activities) {
            // a way to get new arry with unique resultes : if it is the same date it will return the index but becasue we loop throgth the array two times we if the same date repeats than it wil not be the same index , this way we get only the first Occurnce of a date 
            let uniqueActivities = activities.filter((activity, index, activities) =>
                index === activities.findIndex((currActivity) => {
                    if(currActivity.date && activity.date)
                   return  currActivity?.date.getTime() === activity.date.getTime()})
            );
            const todayIndex = findDateIndex(currDate, activities)
            console.log('today index :',todayIndex);
            if(todayIndex !== -1){
                sortedThreeDays = uniqueActivities.slice(todayIndex, todayIndex+PAGE)
                setStartIndex(todayIndex)
                setEndIndex(todayIndex+PAGE)
                setThreeDays(sortedThreeDays)

            }
            if(todayIndex === -1){
                // -1 because is it probably saturday or a day which is not part of the period so setting current date to be the first date in the array
                if(activities){
                    if(activities[0]){
                        if(activities[0].date){
                            setCurrDate(activities[0].date)
                        }
                    }
                }
        
                console.log('startIndex :',startIndex);
                console.log('endIndex :',endIndex);
                sortedThreeDays = uniqueActivities.slice(startIndex, endIndex)

                console.log('sortedThreeDays :',sortedThreeDays);
                setThreeDays(sortedThreeDays)

            }
            
        }
    }

    const sortDays = () => {
        let sortRes
        if (periodicAgenda) {
            if (periodicAgenda.activities) {
                sortRes = periodicAgenda.activities.sort((a: Tactivity, b: Tactivity) => {
                    if (!a.date || !b.date) return 0;
                    // console.log('new Date(a.date).getTime(', new Date(a.date).getDate());
                    if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1
                    if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1
                    return 0
                });


            }
        }
        if (sortRes) {
            // console.log('sortRes', sortRes);
            getPage(sortRes)
        }
    }

    const findDateIndex = (date:Date,activities:Tactivity[]) => {
      const   dateIndex = activities.findIndex(activityDay => {
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
        totalLength: periodicAgenda?.activities?.length

    }
    const DaysBackSvgProps = {
        PAGE,
        startIndex,
        setStartIndex,
        setEndIndex,
        endIndex,
        isRotate: false,
        totalLength: periodicAgenda?.activities?.length


    }

    return (
        <section className='days-activities-container flex-jc-ac'>
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