import { Tactivity } from '@/app/types/types'
import React from 'react'
import MyActivtiesPreview from './MyActivtiesPreview'

type MyActivitiesProps = {
  myActivities:Tactivity[]
  periodicAgendaId:string
  userEmail:string
}

export default function MyActivitiesList({myActivities,periodicAgendaId,userEmail}: MyActivitiesProps) {
  return (
     <ul className='my-activities-warpper clean'>
      {myActivities.map(activity=>

        <MyActivtiesPreview key={activity.id} activity={activity} userEmail={userEmail} periodicAgendaId={periodicAgendaId}/>
      )}
    </ul>
  )
}