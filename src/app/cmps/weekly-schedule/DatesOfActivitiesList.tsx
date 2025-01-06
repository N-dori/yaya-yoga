import DatesBackForwordSvg from '@/app/assets/svgs/DatesBackForwordSvg'
import { Tactivity } from '@/app/types/types'
import React from 'react'
import DaysOfActivitiesPreview from '../dashboard/create-periodic-agenda/DaysOfActivitiesPreview'

type DatesOfActivitiesProps = {
    activities: Tactivity[],
    setCurrDate: (date: Date) => void,
    currDate: Date,
    hebrewDays:string[],
    hebrewMonths:string[],
}
export default function DatesOfActivitiesList(props: DatesOfActivitiesProps) {

    const daysOfActivitiesPreviewProps={
        ...props
    }


    return (


            <ul className='days-container flex-jc-ac gap1'>
                {props.activities ?
                    props.activities.map((activityDay: Tactivity, i: number) =>
                        <DaysOfActivitiesPreview {...props}  activityDay={activityDay} key={activityDay?.id || i}
                 />)


                    : <div> Loading...</div>}
            </ul>

           
      )
}