import { Tactivity } from '@/app/types/types'
import React from 'react'
import MyActivtiesPreview from './MyActivtiesPreview'

type MyActivitiesProps = {
  myActivities:Tactivity[]
}

export default function MyActivitiesList({myActivities}: MyActivitiesProps) {
  return (
     <ul className='my-activities-warpper clean'>
      {myActivities.map(activity=>

        <MyActivtiesPreview key={activity.id} activity={activity}/>
      )}
    </ul>
  )
}