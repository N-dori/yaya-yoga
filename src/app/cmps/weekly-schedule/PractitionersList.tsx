import { Tpractitioner } from '@/app/types/types'
import React from 'react'
import PractitionersPreview from './PractitionersPreview'

type PractitionersListProps = {
    practitioners: Tpractitioner[]

}

export default function PractitionersList({practitioners}: PractitionersListProps) {
  return (
    <section className='practitioners-list-container'>
        <ol  className='clean'>
       {
        practitioners.map( practitioner =>
        <PractitionersPreview practitioner={practitioner} />)
       }

        </ol>
        </section>
  )
}