import { Tactivity } from '@/app/types/types'
import React from 'react'
import MyActivtiesPreview from './MyActivtiesPreview'
import Spinner from '../Spinner'

type MyActivitiesProps = {
  myActivities:Tactivity[]
  periodicAgendaId:string
  userEmail:string
  setCurrActivityId:(currActivityId:string)=>void
  askUserIfToRemoveHimFromActivity:(membershipId:string ,activityName:string) => void
}

export default function MyActivitiesList({myActivities,periodicAgendaId,userEmail, setCurrActivityId,askUserIfToRemoveHimFromActivity}: MyActivitiesProps) {
  return (
     <ul className='my-activities-warpper clean'>
      {myActivities?
      myActivities.map(activity=>

        <MyActivtiesPreview key={activity.id} 
        activity={activity} 
        userEmail={userEmail} 
        periodicAgendaId={periodicAgendaId}
        setCurrActivityId={setCurrActivityId}
        askUserIfToRemoveHimFromActivity={askUserIfToRemoveHimFromActivity}/>
      )
    :
    <span><Spinner/></span>}
    </ul>
  )
}