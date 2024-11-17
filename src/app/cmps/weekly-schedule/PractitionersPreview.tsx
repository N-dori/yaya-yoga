
import { Tpractitioner } from '@/app/types/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

type PractitionersPreviewProps = {
    practitioner:Tpractitioner
    askUserIfToRemoveHimFromActivity: ( membershipId:string) => void
    checkActivityTime: () => boolean 
}
export default function PractitionersPreview({practitioner,askUserIfToRemoveHimFromActivity,checkActivityTime}: PractitionersPreviewProps) {
    const {data:session}=useSession()
    const [isShown1, setisShown1] = useState(false)

useEffect(() => {
setTimeout(() => {
    handelOpacity()
}, 200);
}, [])
const handelOpacity = () =>{
    setisShown1(true)
}
const handelCanceltion = () => {
    console.log(' need to refund me now!' ,practitioner);
    askUserIfToRemoveHimFromActivity(practitioner.membershipId)
}
    return (
        <li style={isShown1?{opacity:'.9'}:{}} className='practitioner-name  flex-sb'>
       
          {session?.user?.name === practitioner.name?checkActivityTime()?
            <span className='cancelation-btn pointer' onClick={handelCanceltion}>X</span>
            :'':''
          }
       <span> </span>
          <span>   {practitioner.name}   </span>
       
        </li>

  )
}