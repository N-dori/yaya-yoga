import { Tpractitioner } from '@/app/types/types'
import { getRandomColor } from '@/app/utils/util'
import React from 'react'

type PractitionersPreviewProps =
 {
    practitioner: Tpractitioner
    
 }

export default function PractitionersCirclePreview({practitioner}: PractitionersPreviewProps) {
  return (
    <>
    <div className='practitioner-circle flex-jc-ac' 
          style={{backgroundColor:getRandomColor()}}>
            
            {practitioner.name[0].toLocaleUpperCase()}
            
    </div>
   
    </>
  )
}