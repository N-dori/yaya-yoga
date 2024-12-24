import React, { useState } from 'react'
import MyActivitiesList from './MyActivitiesList'
import { Tactivity } from '@/app/types/types'

type MyActivitiesIndexProps = {
    myActivities:Tactivity[]
    periodicAgendaId:string
    userEmail:string
    setCurrActivityId:(currActivityId:string)=>void
    askUserIfToRemoveHimFromActivity:(membershipId:string ,activityName:string) => void
    isLoading:boolean
    currActivityId:string
}
export default function MyActivitiesIndex({myActivities,periodicAgendaId,userEmail,isLoading,currActivityId, setCurrActivityId,askUserIfToRemoveHimFromActivity}: MyActivitiesIndexProps) {
    let MyActivitiesListProps = {
        myActivities,
        periodicAgendaId,
        userEmail,
        setCurrActivityId,
        askUserIfToRemoveHimFromActivity,
        isLoading,
        currActivityId
    }

    const [isShown, setisShown] = useState(false)

  return (
    <section className='my-activities-container card'
     style={isShown?{}:{height:'475px'}}>
    <h3 className='tac title'> השיעורים שלי</h3>
       
        <MyActivitiesList {...MyActivitiesListProps}  />
      {(myActivities?.length >=4) &&
    <section className='display-all-activities-btn pointer flex-sb' onClick={() => setisShown(!isShown)}>
  
    <section className=' tac'>לכל השיעורים שלי</section>
    <svg className={'practitioners-arrow'}  style={isShown ? { transform: `rotate(90deg)` } : {}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>

    </section>}
</section>
  )
}