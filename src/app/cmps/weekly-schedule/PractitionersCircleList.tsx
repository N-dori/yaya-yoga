import { Tpractitioner } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import PractitionersCirclePreview from './PractitionersCirclePreview'

type PractitionersListProps =
  {
    practitioners: Tpractitioner[]
 
  }

export default function PractitionersCircleList({ practitioners}: PractitionersListProps) {
  const [NPractitioners, setNPractitioners] = useState<Tpractitioner[]>(null)
  useEffect(() => {
    getNPractitioners()
  }, [practitioners.length])

  const getNPractitioners = () => {
    let res = practitioners.slice(0,7)
    setNPractitioners([...res])
  }
  return (
    <section className='practitioners-circle-list-container flex-ac gc1'>
      {
        NPractitioners?.map((practitioner,i) =>
           <PractitionersCirclePreview key={i} practitioner={practitioner}  />
                         )
                        }
             { practitioners.length > 7  && <span className='dots'>...</span>}

    </section>
  )
}