import { Tpractitioner } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import PractitionersPreview from './PractitionersPreview'

type PractitionersListProps = {
    practitioners: Tpractitioner[]
    askUserIfToRemoveHimFromActivity: (membershipId:string) => void
    checkActivityTime: () => boolean
}

export default function PractitionersList({askUserIfToRemoveHimFromActivity,checkActivityTime,practitioners}: PractitionersListProps) {
  
    const [isShown2, setisShown2] = useState(false)
    useEffect(() => {
    setTimeout(() => {
        handelHegith()
    }, 200);
    }, [])
    const handelHegith = () =>{
        setisShown2(true)
    }

    return (
    
    <section className='practitioners-list-container full'>
        <ol  className='practitioners-list-warper flex-col clean ' style={isShown2?{height:'auto'}:{}}>
       {
        practitioners.map( (practitioner,i) =>
        <PractitionersPreview 
        key={i} 
        practitioner={practitioner} 
        askUserIfToRemoveHimFromActivity={askUserIfToRemoveHimFromActivity}
        checkActivityTime={checkActivityTime} />)
       }

        </ol>
        </section>
  )
}