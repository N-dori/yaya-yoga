import { Tpractitioner } from '@/app/types/types'
import React from 'react'
import PractitionersPreview from './PractitionersPreview'

type PractitionersListProps =
  {
    practitioners: Tpractitioner[]
 
  }

export default function PractitionersList({ practitioners}: PractitionersListProps) {
  return (
    <section className='practitioners-list-container flex-ac gc1'>
      {
        practitioners.map(practitioner =>
          <PractitionersPreview practitioner={practitioner}  />
                         )
      }

    </section>
  )
}