import { Tpractitioner } from '@/app/types/types'
import React, { useEffect, useState } from 'react'

type PractitionersPreviewProps = {
    practitioner:Tpractitioner
 
}

export default function PractitionersPreview({practitioner}: PractitionersPreviewProps) {
    const [isShown1, setisShown1] = useState(false)
useEffect(() => {
setTimeout(() => {
    handelOpacity()
}, 200);
}, [])
const handelOpacity = () =>{
    setisShown1(true)
}

    return (
    <li style={isShown1?{opacity:'.9'}:{}} className='practitioner-name'>{practitioner.name}</li>
  )
}