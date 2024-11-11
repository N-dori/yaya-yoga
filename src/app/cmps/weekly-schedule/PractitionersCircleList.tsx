import { Tpractitioner } from '@/app/types/types'
import React from 'react'
import PractitionersCirclePreview from './PractitionersCirclePreview'

type PractitionersListProps =
  {
    practitioners: Tpractitioner[]
 
  }

export default function PractitionersCircleList({ practitioners}: PractitionersListProps) {
  return (
    <section className='practitioners-list-container flex-ac gc1'>
      {
        practitioners.map((practitioner,i) =>
           <PractitionersCirclePreview key={i} practitioner={practitioner}  />
                         )
      }

    </section>
  )
}