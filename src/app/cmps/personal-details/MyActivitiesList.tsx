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
  isLoading:boolean
  currActivityId:string
}

export default function MyActivitiesList({myActivities,periodicAgendaId,userEmail,isLoading,currActivityId, setCurrActivityId,askUserIfToRemoveHimFromActivity}: MyActivitiesProps) {
  return (
     <ul className='my-activities-warpper flex-col gap05 clean'>
      {myActivities?

      myActivities.map(activity=>

        <MyActivtiesPreview key={activity.id} 
        activity={activity} 
        userEmail={userEmail} 
        periodicAgendaId={periodicAgendaId}
        setCurrActivityId={setCurrActivityId}
        isLoading={isLoading}
        currActivityId={currActivityId}
        askUserIfToRemoveHimFromActivity={askUserIfToRemoveHimFromActivity}/>
      )
      
      
      :
      <p> אינך רשומ/ה עדיין... </p>
}
    </ul>
  )
}