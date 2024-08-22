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
        if (activities) {
            const todayIndex = activities.findIndex(activityDay => {
                if (activityDay) {
                    if (activityDay.date) {
                        if (!isNaN(new Date(activityDay.date).getTime())) {// Check if the date is valid
                            return (stripTime(activityDay.date).getTime() === stripTime(currDate).getTime()) 
                                          
                        }
                    }

                }
            })
            console.log('today index :',todayIndex);
            if(todayIndex || todayIndex === 0){
                sortedThreeDays = activities.slice(todayIndex, todayIndex+PAGE)
                setStartIndex(todayIndex)
                setEndIndex(todayIndex+PAGE)
                setThreeDays(sortedThreeDays)

            }else{
                sortedThreeDays = activities.slice(startIndex, endIndex)
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
    };
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