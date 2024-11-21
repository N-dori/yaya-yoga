import { Tactivity, Tpractitioner } from '@/app/types/types'
import React from 'react'
import ActivityPractitionersPreview from './ActivityPractitionersPreview'

type ActivityPractitionersListProps = {
    practitioners:Tpractitioner[]
    periodicAgendaId:string
    activity:Tactivity
    removePractitionerFromClientSideActivities : (email:string,activityId:string) => void

}

export default function ActivityPractitionersList({removePractitionerFromClientSideActivities,practitioners,activity,periodicAgendaId}: ActivityPractitionersListProps) {
  return (
    practitioners.map(practitioner=>
        <ActivityPractitionersPreview key={practitioner.email} 
        practitioner={practitioner} 
        activity={activity} 
        periodicAgendaId={periodicAgendaId}
        removePractitionerFromClientSideActivities={removePractitionerFromClientSideActivities}/>
    )  )
}