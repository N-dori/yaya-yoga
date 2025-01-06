import DatesBackForwordSvg from '@/app/assets/svgs/DatesBackForwordSvg'
import { Tactivity } from '@/app/types/types'
import React from 'react'
import DaysOfActivitiesPreview from '../dashboard/create-periodic-agenda/DaysOfActivitiesPreview'

type DatesOfActivitiesProps = {
    activities: Tactivity[],
    setCurrDate: (date: Date) => void,
    currDate: Date,
}
export default function DatesOfActivitiesList({ activities, setCurrDate, currDate, }: DatesOfActivitiesProps) {

    


    return (


            <ul className='days-container flex-jc-ac gap1'>
                {activities ?
                    activities.map((activityDay: Tactivity, i: number) =>
                        <DaysOfActivitiesPreview key={activityDay?.id || i} activityDay={activityDay} setCurrDate={setCurrDate} currDate={currDate} />)


                    : <div> Loading...</div>}
            </ul>

           
      )
}