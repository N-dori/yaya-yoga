import { Tmembership } from '@/app/types/types'
import React from 'react'

type MyMembershipPreviewProps = {
    membership:Tmembership
    i:number
}

export default function MyMembershipPreview({membership ,i }: MyMembershipPreviewProps) {
  return (
    <li className='my-membership-card flex-col gap05'>
        <p className='mi-s-1'> {`${i+1} .`} סוג המנוי : {membership.subscription.type}</p>
        <p className='mi-s-1'>   מספר כניסות שנותרו : {membership.subscription.entries+''}</p>
        <p className='mi-s-1'>  מנוי נרכש בתאריך  : {new Date(membership.dateOfPurchase).toLocaleDateString('he-IL')}</p>
        <p className='mi-s-1'>  המנוי בתוקף עד לתאריך : {new Date(membership.end).toLocaleDateString('he-IL')}</p>
    </li>
  )
}