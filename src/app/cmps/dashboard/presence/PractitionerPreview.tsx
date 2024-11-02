import { Tactivity, Tpractitioner } from '@/app/types/types'
import React from 'react'

type PractitionerPreviewProps = {
    practitioner: Tpractitioner

}

export default function PractitionerPreview({  practitioner }: PractitionerPreviewProps) {



    return (
        <>
            <p className='practitioner-name gc1 flex-jc-ac '>{practitioner.name}</p>

            <button className='has-arrived-btn flex-jc-ac gtc2'>לא הגיע </button>


        </>)
}