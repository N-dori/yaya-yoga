import { Tactivity, TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useRef, useState } from 'react'
import DaysOfActivitiesPreview from './DaysOfActivitiesPreview'
import BackSvg from '@/app/assets/svgs/BackSvg'
import DaysBackForwordSvg from '@/app/assets/svgs/DaysBackForwordSvg'

type DaysOfActivitiesProps = {
    periodicAgenda: TperiodicAgenda | undefined

}

export default function DaysOfActivities({ periodicAgenda }: DaysOfActivitiesProps) {
   
    const PAGE=3
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(PAGE)
    const [threeDays , setThreeDays] = useState<Tactivity[] | undefined[]>()
    const [sortedActivities , setSortedActivities] = useState<Tactivity[] | undefined[]>()
    
    useEffect(() => {
        sortDays()
    
    }, [startIndex,endIndex])

    const getPage = (activities:Tactivity[])=> {
        let sortedThreeDays 
        if(activities){

        sortedThreeDays=activities.slice(startIndex,endIndex)
        setThreeDays(sortedThreeDays)
        }
    }
  
    const sortDays = () => {
    const sortRes =    periodicAgenda?.activities.sort((a: Tactivity, b: Tactivity) => {
        if (!a.date || !b.date) return 0;
            console.log('new Date(a.date).getTime(',new Date(a.date).getDate());
                if( new Date(a.date).getTime()> new Date(b.date).getTime()) return 1 
                if( new Date(a.date).getTime()< new Date(b.date).getTime()) return -1 
                return 0
        });
        console.log('sortRes',sortRes);
        if(sortRes)getPage(sortRes)
        setSortedActivities(sortRes)
    };
 const DaysForwordSvgProps={
    PAGE,
    startIndex,
    setStartIndex,
    setEndIndex,
    endIndex,
    isRotate:true,
    totalLength:periodicAgenda?.activities?.length
    
 }
 const DaysBackSvgProps={
    PAGE,
    startIndex,
    setStartIndex,
    setEndIndex,
    endIndex,
    isRotate:false,
    totalLength:periodicAgenda?.activities?.length

    
 }
    return (
        <section className='days-activities-container flex-jc-ac'>
            <DaysBackForwordSvg  {...DaysForwordSvgProps} />
            <ul className='days-container flex-jc-ac gap1'>
                {threeDays?
                   threeDays.map((activityDay,i) =>
            <DaysOfActivitiesPreview key={i} activityDay={activityDay} />) : <div> Loading...</div>}
            </ul>
            <DaysBackForwordSvg {...DaysBackSvgProps} />
        </section>
    )
}